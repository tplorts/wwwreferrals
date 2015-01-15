#!/bin/bash

if [ -z "$1" ]
then
    echo "Hey! Gimme a directory name."
    exit 1
fi

PROJECT_ROOT=$1

if [ -d "$PROJECT_ROOT" ]
then
    echo "Whoa! $PROJECT_ROOT is already there."
    exit 1
fi

if [ -z "$2" ]
then
    PROJECT_NAME=$PROJECT_ROOT
    echo "FYI: the project will also be named $PROJECT_NAME."
else
    PROJECT_NAME=$2
fi

echo "Create database"
sudo su postgres -c "createdb $PROJECT_NAME"
CREATEDB_CODE=$?
if [ $CREATEDB_CODE -ne 0 ]
then
    exit 1
fi

echo "Create folder"
mkdir $PROJECT_ROOT
cd $PROJECT_ROOT

echo "Create python virtual environment"
pyvenv-3.4 venv
source venv/bin/activate

echo "Install the 'django toolbelt' from pip"
pip install django-toolbelt

echo "Create a new project"
django-admin.py startproject $PROJECT_NAME .

echo "Create some Heroku configuration files"
echo "web: gunicorn $PROJECT_NAME.wsgi --log-file -" > Procfile
pip freeze > requirements.txt
echo "python-3.4.2" > runtime.txt

echo "Read and remove the secret key from project settings"
SECRET_KEY=`python -c "import $PROJECT_NAME.settings; print($PROJECT_NAME.settings.SECRET_KEY)"`
mv $PROJECT_NAME/settings.py temp-settings.py
grep -v "SECRET_KEY" temp-settings.py > $PROJECT_NAME/settings.py
rm temp-settings.py

echo "Add new variables to virtual environment and reactivate"
deactivate
echo "export DJANGO_SECRET_KEY=\"$SECRET_KEY\"" >> venv/bin/activate
echo "export DATABASE_URL=\"postgres://postgres:cafea@localhost:5432/$PROJECT_NAME\"" >> venv/bin/activate
source venv/bin/activate

echo "Append Heroku bits to project settings"
cat ../.default-heroku-settings.py >> $PROJECT_NAME/settings.py

echo "Create a new git repository"
cp ../.default-gitignore .gitignore
git init
git add .
git commit -m 'Salve, firstus commitus est.'

echo "Create Heroku app"
heroku apps:create
echo "Set some Heroku configuration variables"
heroku config:set DISABLE_COLLECTSTATIC=1
heroku config:set DJANGO_SECRET_KEY=$SECRET_KEY

echo "Initial database migration"
python manage.py migrate


echo "Righto! I think it all worked."

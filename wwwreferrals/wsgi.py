"""
WSGI config for wwwreferrals project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/howto/deployment/wsgi/
"""

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "wwwreferrals.settings")

from django.core.wsgi import get_wsgi_application

from wwwreferrals import settings
if settings.isProduction:
    application = get_wsgi_application()
else:
    from dj_static import Cling
    application = Cling(get_wsgi_application())

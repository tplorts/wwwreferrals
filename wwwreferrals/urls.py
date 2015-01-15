from django.conf.urls import patterns, include, url
from referral_manager import urls as referral_urls

urlpatterns = patterns('',
    url(r'^', include(referral_urls)),
)

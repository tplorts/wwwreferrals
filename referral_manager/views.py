from django.shortcuts import get_object_or_404
from django.views.generic.base import RedirectView

from referral_manager.models import ReferralLink


class ReferralHitView(RedirectView):

    permanent = False
    query_string = True
    url = '/landing/'

    def get_redirect_url(self, *args, **kwargs):
        link = get_object_or_404(ReferralLink, title=kwargs['title'])
        link.registerHit()
        link.save()
        return '{}?link={}'.format(
            super(ReferralHitView, self).get_redirect_url(*args, **kwargs),
            link.title
        )

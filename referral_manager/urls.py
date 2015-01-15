from django.conf.urls import url, include, patterns
from django.views.generic import TemplateView

from rest_framework import routers, serializers, viewsets

from referral_manager.models import ReferralLink
from referral_manager.views import ReferralHitView



class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferralLink
        fields = ('id', 'title', 'hits')


class LinkViewSet(viewsets.ModelViewSet):
    queryset = ReferralLink.objects.all()
    serializer_class = LinkSerializer


router = routers.DefaultRouter()
router.register(r'links', LinkViewSet)


urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name='link-list.html'), name='link-list'),
    url(r'^landing/', TemplateView.as_view(template_name='landing.html')),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^(?P<title>\w+)/$', ReferralHitView.as_view(), name='referral-hit'),
)

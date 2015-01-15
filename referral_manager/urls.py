from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets
from referral_manager.models import ReferralLink


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferralLink
        fields = ('id', 'title', 'hits')


class LinkViewSet(viewsets.ModelViewSet):
    queryset = ReferralLink.objects.all()
    serializer_class = LinkSerializer


router = routers.DefaultRouter()
router.register(r'links', LinkViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

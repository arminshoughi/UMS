from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.master.views import MasterModelViewSet

router = DefaultRouter()
router.register('', MasterModelViewSet, basename='master')

urlpatterns = [
    path(r'master', include(router.urls)),
]

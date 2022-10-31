from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.student.views import StudentModelViewSet

router = DefaultRouter()
router.register('', StudentModelViewSet, basename='student')

urlpatterns = [
    path(r'student/', include(router.urls)),
]

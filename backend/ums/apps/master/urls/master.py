from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.master.views import MasterModelViewSet, StudentGradeViewSet

router = DefaultRouter()
router.register('student-grade', StudentGradeViewSet, basename='student-grades')
router.register('', MasterModelViewSet, basename='master')

urlpatterns = [
    path(r'', include(router.urls)),
]

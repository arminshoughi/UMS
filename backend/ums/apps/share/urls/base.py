from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .. import views

router = DefaultRouter()
router.register(r'collages', views.CollageViewSet, basename='collages')
router.register(r'majors', views.MajorViewSet, basename='majors')
router.register(r'semesters', views.SemesterViewSet, basename='semesters')
router.register(r'courses', views.CourseViewSet, basename='courses')

urlpatterns = [
    path('', include(router.urls))
]

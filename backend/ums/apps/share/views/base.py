from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet

from .. import services, serializers


class CollageViewSet(ModelViewSet):
    queryset = services.CollageService.all()
    permission_classes = [IsAdminUser]
    serializer_class = serializers.CollageModelSerializer


class MajorViewSet(ModelViewSet):
    queryset = services.MajorService.all()
    permission_classes = [IsAdminUser]
    serializer_class = serializers.MajorModelSerializer


class SemesterViewSet(ModelViewSet):
    queryset = services.SemesterService.all()
    permission_classes = [IsAdminUser]
    serializer_class = serializers.SemesterModelSerializer


class CourseViewSet(ModelViewSet):
    queryset = services.CourseService.all()
    permission_classes = [IsAdminUser]
    serializer_class = serializers.CourseModelSerializer

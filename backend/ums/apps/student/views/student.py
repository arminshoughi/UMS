from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet

from apps.student.serializers import StudentModelCreateSerializer
from apps.student.services import StudentService


class StudentModelViewSet(ModelViewSet):
    queryset = StudentService.all()
    serializer_class = StudentModelCreateSerializer
    permission_classes = [IsAdminUser]

from rest_framework import mixins
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from apps.master.serializers import MasterModelCreateSerializer, StudentGradeListCreateSerializer
from apps.master.services import MasterService
from apps.student.services import StudentSemesterCourseModelService


class MasterModelViewSet(ModelViewSet):
    queryset = MasterService.all()
    serializer_class = MasterModelCreateSerializer
    permission_classes = [IsAdminUser]


class StudentGradeViewSet(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, GenericViewSet
):
    queryset = StudentSemesterCourseModelService.all()
    serializer_class = StudentGradeListCreateSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        return self.queryset.filter(course__master=self.request.user)

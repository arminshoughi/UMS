from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from apps.student.serializers import StudentModelCreateSerializer, StudentTakeSemesterSerializer, \
    StudentTakeCourseSerializer, StudentSemesterModel, StudentSemesterCourseModel, IdSerializer
from apps.student.services import StudentService


class StudentModelViewSet(ModelViewSet):
    queryset = StudentService.all()
    serializer_class = StudentModelCreateSerializer
    permission_classes = [IsAdminUser]

    @action(
        detail=False, methods=['GET'], permission_classes=[IsAdminUser], url_name='get_semesters',
        url_path='get_semesters', serializer_class=StudentTakeSemesterSerializer
    )
    def get_semesters(self, request, *args, **kwargs):
        if not hasattr(self.request.user, 'studentmodel'):
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(
            data=self.serializer_class(
                StudentSemesterModel.objects.filter(student=self.request.user.studentmodel), many=True
            ).data,
            status=status.HTTP_201_CREATED
        )

    @action(
        detail=False, methods=['POST'], permission_classes=[IsAdminUser], url_name='take_semester',
        url_path='take_semester', serializer_class=StudentTakeSemesterSerializer
    )
    def take_semester(self, request, *args, **kwargs):
        if not hasattr(self.request.user,'studentmodel'):
            return Response(data={'خظا': 'دسترسی دانشجویی فعال نمی باشد'}, status=status.HTTP_400_BAD_REQUEST)
        student_term = self.serializer_class(data=self.request.data)
        student_term.is_valid(raise_exception=True)
        if self.request.user.studentmodel != StudentService.get(id=student_term.validated_data['student_id']):
            return Response(data={'خظا': 'دسترسی غیر مجاز'}, status=status.HTTP_400_BAD_REQUEST)
        student_term.save()
        return Response(data=student_term.data, status=status.HTTP_201_CREATED)

    @action(
        detail=False, methods=['GET'], permission_classes=[IsAdminUser], url_name='get_courses',
        url_path='get_courses', serializer_class=StudentTakeCourseSerializer
    )
    def get_courses(self, request, *args, **kwargs):
        if not hasattr(self.request.user,'studentmodel'):
            return Response(data={'خظا': 'دسترسی دانشجویی فعال نمی باشد'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(
            data=self.serializer_class(
                StudentSemesterCourseModel.objects.filter(
                    student_semester__student=self.request.user.studentmodel), many=True
            ).data,
            status=status.HTTP_201_CREATED
        )

    @action(
        detail=False, methods=['POST'], permission_classes=[IsAdminUser], url_name='take_course',
        url_path='take_course', serializer_class=StudentTakeCourseSerializer
    )
    def take_course(self, request, *args, **kwargs):
        if not hasattr(self.request.user,'studentmodel'):
            return Response(data={'خظا': 'دسترسی دانشجویی فعال نمی باشد'}, status=status.HTTP_400_BAD_REQUEST)
        student_term_course = self.serializer_class(data=self.request.data)
        student_term_course.is_valid(raise_exception=True)
        if self.request.user.studentmodel != StudentSemesterModel.objects.get(
                id=student_term_course.validated_data['student_semester_id']).student:
            return Response(data={'خظا': 'دسترسی غیر مجاز'}, status=status.HTTP_400_BAD_REQUEST)
        student_term_course.save()
        return Response(data=student_term_course.data, status=status.HTTP_201_CREATED)

    @action(
        detail=False, methods=['POST'], permission_classes=[IsAdminUser], url_name='remove_course',
        url_path='remove_course', serializer_class=IdSerializer
    )
    def remove_course(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        obj = get_object_or_404(StudentSemesterCourseModel, id=serializer.validated_data['id'])
        if not hasattr(self.request.user,'studentmodel'):
            return Response(data={'خظا': 'دسترسی دانشجویی فعال نمی باشد'}, status=status.HTTP_400_BAD_REQUEST)
        if self.request.user.studentmodel != obj.student_semester.student:
            return Response(data={'خظا': 'دسترسی غیر مجاز'}, status=status.HTTP_400_BAD_REQUEST)
        obj.delete()
        return Response(status=status.HTTP_200_OK)

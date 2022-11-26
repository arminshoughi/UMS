from rest_framework import serializers
from utils.serializers import DynamicFieldsModelSerializer

from .. import models
from ..services import MasterService
from ...share import services
from ...share.models import CourseModel
from ...student.models import StudentSemesterCourseModel, StudentSemesterModel, StudentModel


class CourseSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = CourseModel
        service = services.CourseService
        fields = [
            'id', 'name', 'details', 'unit', 'documents', 'schedules', 'midterm_exam_date', 'final_exam_date', 'price'
        ]


class StudentSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = StudentModel
        fields = ['id', 'first_name', 'last_name']


class StudentSemesterSerializer(DynamicFieldsModelSerializer):
    student = StudentSerializer(read_only=True)
    course = CourseSerializer(read_only=True)

    class Meta:
        model = StudentSemesterModel
        fields = ['id', 'student', 'course']


class MasterModelBaseSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = models.MasterModel
        service = MasterService
        fields = ['first_name', 'last_name']


class MasterModelSerializer(MasterModelBaseSerializer):
    class Meta(MasterModelBaseSerializer.Meta):
        fields = [
            'first_name', 'last_name', 'collage', 'major', 'national_code', 'sex', 'birthday', 'typ'
        ]


class MasterModelCreateSerializer(MasterModelBaseSerializer):
    class Meta(MasterModelBaseSerializer.Meta):
        fields = [
            'username', 'password', 'first_name', 'last_name', 'collage', 'major', 'national_code', 'sex', 'birthday',
        ]


class StudentGradeListCreateSerializer(serializers.ModelSerializer):
    student_semester = StudentSemesterSerializer(read_only=True)
    course = CourseSerializer(read_only=True)

    class Meta:
        model = StudentSemesterCourseModel
        fields = ['id', 'student_semester', 'course', 'midterm_exam_grade', 'final_exam_grade']

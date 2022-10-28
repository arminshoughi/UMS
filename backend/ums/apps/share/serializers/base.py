from rest_framework import serializers

from utils.serializers import DynamicFieldsModelSerializer
from .. import models, services
from ...master.serializers import MasterModelBaseSerializer


class CollageModelSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = models.CollageModel
        service = services.CollageService
        exclude = ['created_at', 'updated_at', 'deleted_at', 'is_deleted']


class MajorModelBaseSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = models.MajorModel
        service = services.MajorService
        fields = ['name', 'degree']


class MajorModelSerializer(MajorModelBaseSerializer):
    collage = CollageModelSerializer(read_only=True)
    collage_id = serializers.IntegerField(write_only=True)

    class Meta(MajorModelBaseSerializer.Meta):
        fields = ['collage', 'collage_id', 'degree', 'name']


class SemesterModelBaseSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = models.SemesterModel
        service = services.SemesterService
        fields = ['name', 'start_date', 'end_date']


class SemesterModelSerializer(SemesterModelBaseSerializer):
    major = MajorModelBaseSerializer(read_only=True)
    major_id = serializers.IntegerField(write_only=True)

    class Meta(SemesterModelBaseSerializer.Meta):
        fields = ['name', 'major', 'major_id', 'start_date', 'end_date']


class CourseDocumentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseDocumentModel
        fields = ['document']


class CourseWeaklyScheduleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseWeaklyScheduleModel
        fields = ['day', 'time']


class CourseModelSerializer(DynamicFieldsModelSerializer):
    major = MajorModelBaseSerializer(read_only=True)
    major_id = serializers.IntegerField(write_only=True)

    semester = SemesterModelBaseSerializer(read_only=True)
    semester_id = serializers.IntegerField(write_only=True)

    master_id = serializers.IntegerField(write_only=True)
    master = MasterModelBaseSerializer(read_only=True)

    documents = CourseDocumentModelSerializer(many=True, required=False)
    schedules = CourseWeaklyScheduleModelSerializer(many=True, required=True)

    class Meta:
        model = models.CourseModel
        service = services.CourseService
        fields = [
            'major', 'major_id', 'semester', 'semester_id', 'name', 'details', 'unit', 'master_id', 'master',
            'documents', 'schedules', 'midterm_exam_date', 'final_exam_date', 'price'
        ]

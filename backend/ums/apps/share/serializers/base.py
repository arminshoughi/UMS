from rest_framework import serializers

from .. import models


class CollageModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CollageModel
        exclude = ['created_at', 'updated_at', 'deleted_at', 'is_deleted']


class MajorModelBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MajorModel
        fields = ['name', 'degree']


class MajorModelSerializer(MajorModelBaseSerializer):
    collage = CollageModelSerializer(read_only=True)
    collage_id = serializers.IntegerField(write_only=True)

    class Meta(MajorModelBaseSerializer.Meta):
        fields = ['collage', 'collage_id', 'degree', 'name']


class SemesterModelBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SemesterModel
        fields = ['name', 'start_date', 'end_date']


class SemesterModelSerializer(SemesterModelBaseSerializer):
    major = MajorModelBaseSerializer(read_only=True)
    major_id = serializers.IntegerField(write_only=True)

    class Meta(SemesterModelBaseSerializer.Meta):
        fields = ['name', 'major', 'major_id', 'start_date', 'end_date']


class CourseModelSerializer(serializers.ModelSerializer):
    major = MajorModelBaseSerializer(read_only=True)
    major_id = serializers.IntegerField(write_only=True)

    semester = SemesterModelBaseSerializer(read_only=True)
    semester_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = models.CourseModel
        fields = ['major', 'major_id', 'semester', 'semester_id', 'name', 'details', 'unit']

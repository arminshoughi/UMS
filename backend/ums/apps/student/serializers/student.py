from rest_framework import serializers

from apps.share.models import CourseModel, SemesterModel
from apps.student.models import StudentModel, StudentSemesterModel, StudentSemesterCourseModel
from apps.student.services import StudentService
from utils.serializers import DynamicFieldsModelSerializer


class StudentModelBaseSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = StudentModel
        service = StudentService
        fields = '__all__'


class StudentModelSerializer(StudentModelBaseSerializer):
    class Meta(StudentModelBaseSerializer.Meta):
        fields = [
            'first_name', 'last_name', 'collage', 'major', 'national_code', 'sex', 'birthday', 'typ'
        ]


class StudentModelCreateSerializer(StudentModelBaseSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta(StudentModelBaseSerializer.Meta):
        fields = [
            'id', 'username', 'password', 'first_name', 'last_name', 'collage', 'major', 'national_code', 'sex',
            'birthday',
        ]


class StudentTakeSemesterSerializer(serializers.Serializer):
    student_id = serializers.IntegerField()
    semester_id = serializers.IntegerField()

    def validate_student_id(self, value):
        student = StudentModel.objects.filter(id=value)
        if not student.exists():
            raise serializers.ValidationError('دانشجوی مورد نظر یافت نشد.')
        return value

    def validate_semester_id(self, value):
        semester = SemesterModel.objects.filter(id=value)
        if not semester.exists():
            raise serializers.ValidationError('ترم مورد نظر یافت نشد.')
        return value

    def validate(self, attrs):
        if StudentSemesterModel.objects.filter(
                student_id=attrs['student_id'], semester_id=attrs['semester_id']
        ).exists():
            raise serializers.ValidationError('دانشجو قبلا در این ترم ثبت نام شده است.')
        return attrs

    def save(self, **kwargs):
        student = StudentModel.objects.get(id=self.validated_data['student_id'])
        semester = SemesterModel.objects.get(id=self.validated_data['semester_id'])
        obj = StudentSemesterModel.objects.create(
            student=student, semester=semester
        )
        obj.save()
        return obj

    def to_representation(self, instance):
        rep = super(StudentTakeSemesterSerializer, self).to_representation(instance)
        if self.instance:
            rep.update({'id': instance.id})
        return rep


class StudentTakeCourseSerializer(serializers.Serializer):
    student_semester_id = serializers.IntegerField()
    course_id = serializers.IntegerField()

    def validate_student_semester_id(self, value):
        student_semester = StudentSemesterModel.objects.filter(id=value)
        if not student_semester.exists():
            raise serializers.ValidationError('دانشجو در ترم مورد نظر ثبت نام نشده است.')
        return value

    def validate_course_id(self, value):
        course = CourseModel.objects.filter(id=value)
        if not course.exists():
            raise serializers.ValidationError('درس مورد نظر یافت نشد.')
        return value

    def validate(self, attrs):
        if StudentSemesterCourseModel.objects.filter(
                course_id=attrs['course_id'], student_semester_id=attrs['student_semester_id']
        ).exists():
            raise serializers.ValidationError('این درس قبلا توسط این دانشجو دراین ترم برداشته شده است.')

        return attrs

    def save(self, **kwargs):
        student_semester = StudentSemesterModel.objects.get(id=self.validated_data['student_semester_id'])
        course = CourseModel.objects.get(id=self.validated_data['course_id'])
        obj = StudentSemesterCourseModel.objects.create(student_semester=student_semester, course=course)
        obj.save()
        return obj

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        if self.instance:
            rep.update({'id': instance.id})
        return rep

from apps.student.models import StudentModel
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
    class Meta(StudentModelBaseSerializer.Meta):
        fields = [
            'username', 'password', 'first_name', 'last_name', 'collage', 'major', 'national_code', 'sex', 'birthday',
        ]

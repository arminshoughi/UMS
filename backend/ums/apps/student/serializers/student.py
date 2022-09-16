from apps.student.models import StudentModel
from apps.student.services import StudentService
from utils.serializers import DynamicFieldsModelSerializer


class StudentModelBaseSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = StudentModel
        service = StudentService
        fields = '__all__'

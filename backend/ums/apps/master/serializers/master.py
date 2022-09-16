from utils.serializers import DynamicFieldsModelSerializer

from .. import models
from ..services import MasterService


class MasterModelBaseSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = models.MasterModel
        service = MasterService
        fields = '__all__'

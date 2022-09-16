from rest_framework import serializers
from utils.serializers import DynamicFieldsModelSerializer

from .. import models
from ..services import MasterService


class MasterModelBaseSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = models.MasterModel
        service = MasterService
        fields = ['first_name', 'last_name']


class MasterModelSerializer(MasterModelBaseSerializer):
    class Meta(MasterModelBaseSerializer.Meta):
        fields = [
            'first_name', 'last_name', 'collage', 'major', 'national_code', 'sex', 'birthday',
        ]


class MasterModelCreateSerializer(MasterModelBaseSerializer):
    class Meta(MasterModelBaseSerializer.Meta):
        fields = [
            'username', 'password', 'first_name', 'last_name', 'collage', 'major', 'national_code', 'sex', 'birthday',
        ]

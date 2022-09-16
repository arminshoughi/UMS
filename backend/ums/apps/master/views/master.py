from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet

from apps.master.serializers import MasterModelSerializer
from apps.master.services import MasterService


class MasterModelViewSet(ModelViewSet):
    queryset = MasterService.all()
    serializer_class = MasterModelSerializer
    permission_classes = [IsAdminUser]

from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet

from apps.master.serializers import MasterModelCreateSerializer
from apps.master.services import MasterService


class MasterModelViewSet(ModelViewSet):
    queryset = MasterService.all()
    serializer_class = MasterModelCreateSerializer
    permission_classes = [IsAdminUser]

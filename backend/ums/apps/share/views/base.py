from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .. import services, serializers
from ...master.serializers import MasterModelSerializer
from ...student.serializers import StudentModelSerializer


class CollageViewSet(ModelViewSet):
    queryset = services.CollageService.all()
    permission_classes = [IsAdminUser]
    serializer_class = serializers.CollageModelSerializer


class MajorViewSet(ModelViewSet):
    queryset = services.MajorService.all()
    permission_classes = [IsAdminUser]
    serializer_class = serializers.MajorModelSerializer


class SemesterViewSet(ModelViewSet):
    queryset = services.SemesterService.all()
    permission_classes = [IsAdminUser]
    serializer_class = serializers.SemesterModelSerializer


class CourseViewSet(ModelViewSet):
    queryset = services.CourseService.all()
    permission_classes = [IsAdminUser]
    serializer_class = serializers.CourseModelSerializer


@api_view(['GET'])
@permission_classes([IsAdminUser])
def current_user(request):
    user = request.user
    if hasattr(user, 'mastermodel'):
        return Response(data=MasterModelSerializer(user.mastermodel).data)
    return Response(data=StudentModelSerializer(user.studentmodel).data)

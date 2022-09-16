from apps.share.models import CollageModel, MajorModel, SemesterModel, CourseModel
from utils.service import BaseService


class CollageService(BaseService):
    model = CollageModel


class MajorService(BaseService):
    model = MajorModel


class SemesterService(BaseService):
    model = SemesterModel


class CourseService(BaseService):
    model = CourseModel

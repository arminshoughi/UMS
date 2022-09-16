from django.db import transaction

from apps.share.models import CollageModel, MajorModel, SemesterModel, CourseModel, CourseDocumentModel, \
    CourseWeaklyScheduleModel
from utils.service import BaseService


class CollageService(BaseService):
    model = CollageModel


class MajorService(BaseService):
    model = MajorModel


class SemesterService(BaseService):
    model = SemesterModel


class CourseService(BaseService):
    model = CourseModel

    @transaction.atomic
    def create(self, **kwargs):
        documents = kwargs.pop('documents')
        schedules = kwargs.pop('schedules')
        course = super().create(**kwargs)
        for document in documents:
            CourseDocumentModel.objects.create(course=course, **document)
        for schedule in schedules:
            CourseWeaklyScheduleModel.objects.create(course=course, **schedule)
        return course

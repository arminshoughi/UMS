from utils.service import BaseService

from ..models import StudentModel, StudentSemesterCourseModel


class StudentSemesterCourseModelService(BaseService):
    model = StudentSemesterCourseModel


class StudentService(BaseService):
    model = StudentModel

    @classmethod
    def create(cls, **kwargs):
        kwargs['is_superuser'] = True
        student = super().create(**kwargs)
        student.set_password(kwargs['password'])
        student.save()
        return student

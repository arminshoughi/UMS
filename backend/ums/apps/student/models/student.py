from django.db import models

from utils.models import BaseModel

from apps.share import consts as shared_consts
from apps.share import models as shared_models


class StudentModel(shared_models.UserModel):
    collage = models.ForeignKey(
        verbose_name='collage', to=shared_models.CollageModel, on_delete=models.PROTECT, null=False, blank=False,
        related_name='students'
    )
    major = models.ForeignKey(
        verbose_name='major', to=shared_models.MajorModel, on_delete=models.PROTECT, null=False, blank=False,
        related_name='students'
    )
    typ = shared_consts.STUDENT_USER_TYPE


class StudentSemesterModel(BaseModel):
    student = models.ForeignKey(
        verbose_name='student', to=StudentModel, on_delete=models.PROTECT, null=False, blank=False,
        related_name='semesters'
    )
    semester = models.ForeignKey(
        verbose_name='semester', to=shared_models.SemesterModel, on_delete=models.PROTECT, null=False, blank=False,
        related_name='semesters'
    )


class StudentSemesterCourseModel(BaseModel):
    student_semester = models.ForeignKey(
        verbose_name='student-semester', to=StudentSemesterModel, on_delete=models.PROTECT, null=False, blank=False,
        related_name='courses'
    )
    course = models.ForeignKey(
        verbose_name='course', to=shared_models.CourseModel, on_delete=models.PROTECT, null=False, blank=False,
        related_name='courses'
    )
    midterm_exam_grade = models.FloatField(verbose_name='midterm exam grade', null=True, blank=True)
    final_exam_grade = models.FloatField(verbose_name='final exam grade', null=True, blank=True)

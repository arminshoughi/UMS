from django.db import models

from utils.models import BaseModel

from .. import consts, validators


class CollageModel(BaseModel):
    name = models.CharField(verbose_name='Collage name', max_length=512)

    class Meta:
        verbose_name = 'collage'
        verbose_name_plural = 'collages'


class MajorModel(BaseModel):
    collage = models.ForeignKey(verbose_name='Collage', to=CollageModel, related_name='major', on_delete=models.PROTECT)
    degree = models.CharField(
        verbose_name='Degree', choices=consts.DEGREE_CHOICES, default=consts.BACHELOR_DEGREE, max_length=9
    )
    name = models.CharField(verbose_name='Major name', max_length=512)

    class Meta:
        verbose_name = 'major'
        verbose_name_plural = 'majors'


class SemesterModel(BaseModel):
    major = models.ForeignKey(verbose_name='Major', to=MajorModel, related_name='semester', on_delete=models.PROTECT)

    class Meta:
        verbose_name = 'semester'
        verbose_name_plural = 'semesters'


class CourseModel(BaseModel):
    major = models.ForeignKey(verbose_name='Collage', to=MajorModel, related_name='course', on_delete=models.PROTECT)
    semester = models.ForeignKey(
        verbose_name='Semester', to=SemesterModel, related_name='course', on_delete=models.PROTECT
    )
    name = models.CharField(verbose_name='Course name', max_length=256, null=True, blank=True)
    details = models.TextField(verbose_name='Course details')
    unit = models.CharField(verbose_name='Course units', validators=[validators.CourseUnitValidator()], max_length=1)

    class Meta:
        verbose_name = 'course'
        verbose_name_plural = 'courses'

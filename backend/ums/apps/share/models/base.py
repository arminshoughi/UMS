from django.db import models

from utils.models import BaseModel

from .. import consts, validators


class CollageModel(BaseModel):
    name = models.CharField(verbose_name='Collage name', max_length=512)

    class Meta:
        verbose_name = 'collage'
        verbose_name_plural = 'collages'

    def __str__(self):
        return self.name


class MajorModel(BaseModel):
    collage = models.ForeignKey(verbose_name='Collage', to=CollageModel, related_name='major', on_delete=models.PROTECT)
    degree = models.CharField(
        verbose_name='Degree', choices=consts.DEGREE_CHOICES, default=consts.BACHELOR_DEGREE, max_length=9
    )
    name = models.CharField(verbose_name='Major name', max_length=512)

    class Meta:
        verbose_name = 'major'
        verbose_name_plural = 'majors'

    def __str__(self):
        return f'{self.name} - {self.degree}'


class SemesterModel(BaseModel):
    major = models.ForeignKey(verbose_name='Major', to=MajorModel, related_name='semester', on_delete=models.PROTECT)
    name = models.CharField(verbose_name='Major name', max_length=512)
    start_date = models.DateField(verbose_name='start date', null=False, blank=False)
    end_date = models.DateField(verbose_name='end date', null=False, blank=False)

    class Meta:
        verbose_name = 'semester'
        verbose_name_plural = 'semesters'

    def __str__(self):
        return f'{self.name} - {self.start_date} - {self.end_date}'


class CourseModel(BaseModel):
    major = models.ForeignKey(verbose_name='major', to=MajorModel, related_name='course', on_delete=models.PROTECT)
    semester = models.ForeignKey(
        verbose_name='Semester', to=SemesterModel, related_name='course', on_delete=models.PROTECT
    )
    master = models.ForeignKey(
        verbose_name='master', to='master.MasterModel', related_name='courses', on_delete=models.PROTECT
    )
    name = models.CharField(verbose_name='Course name', max_length=256, null=True, blank=True)
    details = models.TextField(verbose_name='Course details')
    unit = models.CharField(verbose_name='Course unit', validators=[validators.CourseUnitValidator()], max_length=1)
    midterm_exam_date = models.DateField(verbose_name='midterm exam date', null=False, blank=False)
    final_exam_date = models.DateField(verbose_name='midterm exam date', null=False, blank=False)

    class Meta:
        verbose_name = 'course'
        verbose_name_plural = 'courses'

    def __str__(self):
        return f'{self.major.name} - {self.name} - {self.unit}'


class CourseWeaklyScheduleModel(BaseModel):
    course = models.ForeignKey(
        verbose_name='course', to=CourseModel, on_delete=models.CASCADE, null=False, blank=False,
        related_name='schedules'
    )
    day = models.CharField(
        verbose_name='class day', choices=consts.CLASS_DATE_CHOICES, null=False, blank=False, max_length=10
    )
    time = models.CharField(
        verbose_name='class time', choices=consts.CLASS_TIME_CHOICES, null=False, blank=False, max_length=13
    )


class CourseDocumentModel(BaseModel):
    course = models.ForeignKey(
        verbose_name='course', to=CourseModel, on_delete=models.CASCADE, null=False, blank=False,
        related_name='documents'
    )
    document = models.FileField(upload_to='courses', null=False, blank=False)

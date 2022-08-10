from django.db import models

from . import Term, Degree, Professor, Student


class Subject(models.Model):
    degree = models.ForeignKey(verbose_name='مقطع', to=Degree, on_delete=models.CASCADE)
    title = models.CharField(verbose_name='عنوان')
    unit = models.IntegerField(null=False, blank=False)


class Course(models.Model):
    subject = models.ForeignKey(verbose_name='موضوع', to=Subject, on_delete=models.CASCADE)
    term = models.ForeignKey(verbose_name='ترم', to=Term, on_delete=models.CASCADE)
    professor = models.ForeignKey(verbose_name='استاد', to=Professor, on_delete=models.PROTECT)


class StudentCourse(models.Model):
    student = models.ForeignKey(verbose_name='دانشجو', to=Student, on_delete=models.CASCADE)
    course = models.ForeignKey(verbose_name='درس', to=Course, on_delete=models.PROTECT)
    mid_term_grade = models.FloatField(verbose_name='نمره میان ترم', null=True, blank=True)
    final_grade = models.FloatField(verbose_name='نمره پایان ترم', null=True, blank=True)

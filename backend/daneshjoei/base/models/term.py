from django.db import models

from . import Collage, Student, Professor, Course


class Term(models.Model):
    collage = models.ForeignKey(verbose_name='دانشکده', to=Collage, related_name='collage', on_delete=models.PROTECT)
    students = models.ManyToManyField(verbose_name='دانشجویان', to=Student, related_name='students')
    professors = models.ManyToManyField(verbose_name='استاتیذ', to=Professor, related_name='professors')
    courses = models.ManyToManyField(verbose_name='دروس', to=Course, related_name='courses')
    start_date = models.DateTimeField(blank=False, null=False)
    end_date = models.DateTimeField(blank=False, null=False)

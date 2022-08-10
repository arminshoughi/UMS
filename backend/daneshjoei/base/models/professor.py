from django.db import models

from . import Degree, Person, Course


class Professor(models.Model):
    degree = models.ForeignKey(verbose_name='مقطع', to=Degree, related_name='professor', on_delete=models.PROTECT)
    person = models.ForeignKey(verbose_name='اطلاعات فردی', to=Person, on_delete=models.CASCADE)
    courses = models.ManyToManyField(verbose_name='دروس', to=Course)

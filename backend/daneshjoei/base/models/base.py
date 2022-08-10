from django.contrib.auth import get_user_model
from django.db import models

from .. import consts


class Collage(models.Model):
    pass


class Degree(models.Model):
    collage = models.ForeignKey(verbose_name='دانشکده', to=Collage, related_name='degrees', on_delete=models.PROTECT)
    degree = models.CharField(choices=consts.DEGREE_CHOICES)


class Person(models.Model):
    user = models.OneToOneField(to=get_user_model(), on_delete=models.CASCADE)

from django.db import models

from utils.models import BaseModel

from .. import consts


class CollageModel(BaseModel):
    name = models.CharField(verbose_name='نام دانشکده', max_length=512)


class MajorModel(BaseModel):
    collage = models.ForeignKey(verbose_name='دانشکده', to=CollageModel, related_name='major', on_delete=models.PROTECT)
    degree = models.CharField(choices=consts.DEGREE_CHOICES, default=consts.BACHELOR_DEGREE, max_length=9)
    name = models.CharField(verbose_name='نام رشته', max_length=512)

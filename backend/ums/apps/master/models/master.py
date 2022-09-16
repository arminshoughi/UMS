from django.db import models
from django.contrib.auth import get_user_model

from apps.share import consts as shared_consts
from apps.share import models as shared_models

UserModel = get_user_model()


class MasterModel(UserModel):
    collage = models.ForeignKey(
        verbose_name='collage', to=shared_models.CollageModel, on_delete=models.PROTECT, null=False, blank=False,
        related_name='masters'
    )
    major = models.ForeignKey(
        verbose_name='major', to=shared_models.MajorModel, on_delete=models.PROTECT, null=False, blank=False,
        related_name='masters'
    )
    typ = shared_consts.MASTER_USER_TYPE

    class Meta:
        verbose_name = 'Master'
        verbose_name_plural = 'Masters'

from django.contrib import admin

from utils.admin import BaseModelAdmin

from .. import models


@admin.register(models.MasterModel)
class MasterModelAdmin(BaseModelAdmin):
    pass

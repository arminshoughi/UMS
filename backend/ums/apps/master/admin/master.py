from django.contrib import admin

from utils.admin import BaseModelAdmin

from apps.share import models as share_models
from .. import models


class MasterDefaultMobileAdminInline(admin.TabularInline):
    model = share_models.UserMobileModel
    fields = ('mobile', 'is_default')


class MasterDefaultPhoneAdminInline(admin.TabularInline):
    model = share_models.UserPhoneModel
    fields = ('phone', 'is_default')


class MasterDefaultAddressAdminInline(admin.TabularInline):
    model = share_models.UserAddressModel
    fields = ('address', 'is_default')


class MasterDefaultEmailAdminInline(admin.TabularInline):
    model = share_models.UserEmailModel
    fields = ('email', 'is_default')


@admin.register(models.MasterModel)
class MasterModelAdmin(BaseModelAdmin):
    search_fields = ('first_name', 'last_name', 'username')
    list_display = ('username', 'display_name', 'collage', 'major', 'default_mobile', 'default_emails')
    list_filter = ('collage', 'major')
    inlines = [
        MasterDefaultMobileAdminInline,
        MasterDefaultPhoneAdminInline,
        MasterDefaultEmailAdminInline,
        MasterDefaultAddressAdminInline
    ]

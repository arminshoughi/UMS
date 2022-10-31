from django.contrib import admin

from utils.admin import BaseModelAdmin

from apps.share import models as share_models
from .. import models


class StudentDefaultMobileAdminInline(admin.TabularInline):
    model = share_models.UserMobileModel
    fields = ('mobile', 'is_default')


class StudentDefaultPhoneAdminInline(admin.TabularInline):
    model = share_models.UserPhoneModel
    fields = ('phone', 'is_default')


class StudentDefaultAddressAdminInline(admin.TabularInline):
    model = share_models.UserAddressModel
    fields = ('address', 'is_default')


class StudentDefaultEmailAdminInline(admin.TabularInline):
    model = share_models.UserEmailModel
    fields = ('email', 'is_default')


@admin.register(models.StudentModel)
class StudentModelAdmin(BaseModelAdmin):
    list_per_page = 20
    search_fields = ('first_name', 'last_name', 'username')
    list_display = ('username', 'display_name', 'collage', 'major', 'default_mobile', 'default_emails')
    list_filter = ('collage', 'major')
    inlines = [
        StudentDefaultMobileAdminInline,
        StudentDefaultPhoneAdminInline,
        StudentDefaultEmailAdminInline,
        StudentDefaultAddressAdminInline
    ]

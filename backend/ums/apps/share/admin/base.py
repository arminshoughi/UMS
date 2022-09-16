from django.contrib import admin

from utils.admin import BaseModelAdmin

from .. import models


@admin.register(models.CollageModel)
class CollageModelAdmin(BaseModelAdmin):
    search_fields = ['name']
    list_display = ['name', 'created_at']


@admin.register(models.MajorModel)
class MajorModelAdmin(BaseModelAdmin):
    list_display = ['collage', 'name', 'degree']
    search_fields = ['name']
    list_filter = ['collage', 'degree']


@admin.register(models.SemesterModel)
class SemesterModelAdmin(BaseModelAdmin):
    list_display = ['major', 'start_date', 'end_date']
    search_fields = ['major__name']


@admin.register(models.CourseModel)
class CourseModelAdmin(BaseModelAdmin):
    list_display = ['name', 'major', 'semester', 'unit', 'details']
    search_fields = ['name']
    list_filter = ['major', 'unit', 'semester']

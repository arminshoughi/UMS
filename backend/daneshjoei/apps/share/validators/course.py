import re
from django.utils.deconstruct import deconstructible
from django.core import validators


@deconstructible
class CourseUnitValidator(validators.RegexValidator):
    regex = r'^[1-6]+$'
    message = 'تعداد واحد درسی می‌تواند بین ۱ تا ۶ باشد.'
    flags = re.ASCII

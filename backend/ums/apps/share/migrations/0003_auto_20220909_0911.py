# Generated by Django 3.2.15 on 2022-09-09 09:11

import apps.share.validators.user
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('share', '0002_alter_usermodel_sex'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermodel',
            name='birthday',
            field=models.DateField(blank=True, null=True, verbose_name='تاریخ تولد'),
        ),
        migrations.AlterField(
            model_name='usermodel',
            name='national_code',
            field=models.CharField(blank=True, max_length=10, null=True, validators=[apps.share.validators.user.NationalCodeValidator()], verbose_name='کد ملی'),
        ),
    ]
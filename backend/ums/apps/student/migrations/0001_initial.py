# Generated by Django 3.2.15 on 2022-09-16 14:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('share', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentModel',
            fields=[
                ('usermodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='share.usermodel')),
                ('collage', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='students', to='share.collagemodel', verbose_name='collage')),
                ('major', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='students', to='share.majormodel', verbose_name='major')),
            ],
            options={
                'abstract': False,
            },
            bases=('share.usermodel',),
        ),
        migrations.CreateModel(
            name='StudentSemesterModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('semester', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='semesters', to='share.semestermodel', verbose_name='semester')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='semesters', to='student.studentmodel', verbose_name='student')),
            ],
            options={
                'ordering': ('-created_at',),
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='StudentSemesterCourseModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('midterm_exam_grade', models.FloatField(blank=True, null=True, verbose_name='midterm exam grade')),
                ('final_exam_grade', models.FloatField(blank=True, null=True, verbose_name='final exam grade')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='courses', to='share.coursemodel', verbose_name='course')),
                ('student_semester', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='courses', to='student.studentsemestermodel', verbose_name='student-semester')),
            ],
            options={
                'ordering': ('-created_at',),
                'abstract': False,
            },
        ),
    ]
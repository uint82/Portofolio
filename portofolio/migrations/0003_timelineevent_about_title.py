# Generated by Django 5.0.4 on 2025-03-19 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portofolio', '0002_blogpost_workexperience'),
    ]

    operations = [
        migrations.CreateModel(
            name='TimelineEvent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('is_present', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['-year'],
            },
        ),
        migrations.AddField(
            model_name='about',
            name='title',
            field=models.CharField(default='Fullstack Developer', max_length=200),
        ),
    ]

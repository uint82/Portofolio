# Generated by Django 5.0.4 on 2025-03-20 05:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portofolio', '0004_alter_timelineevent_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='skill',
            name='custom_icon',
            field=models.ImageField(blank=True, null=True, upload_to='skills/'),
        ),
    ]

# Generated by Django 4.1.7 on 2023-11-16 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_recrutamentos'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recrutamentos',
            name='origemRecrutamento',
        ),
        migrations.AddField(
            model_name='recrutamentos',
            name='origem',
            field=models.CharField(default='', max_length=250, verbose_name='origem'),
            preserve_default=False,
        ),
    ]

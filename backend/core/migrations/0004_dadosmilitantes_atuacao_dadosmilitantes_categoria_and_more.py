# Generated by Django 4.1.7 on 2023-11-14 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_assistentes'),
    ]

    operations = [
        migrations.AddField(
            model_name='dadosmilitantes',
            name='atuacao',
            field=models.EmailField(default='', max_length=250, verbose_name='atuacao'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='dadosmilitantes',
            name='categoria',
            field=models.EmailField(default='', max_length=250, verbose_name='categoria'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='dadosmilitantes',
            name='email',
            field=models.EmailField(default='', max_length=250, verbose_name='email'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='dadosmilitantes',
            name='salario',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=14, verbose_name='salario'),
        ),
        migrations.AddField(
            model_name='dadosmilitantes',
            name='sindicalizado',
            field=models.BooleanField(default=False, verbose_name='sindicalizado'),
        ),
        migrations.AddField(
            model_name='dadosmilitantes',
            name='tipo_trabalho',
            field=models.CharField(default='', max_length=250, verbose_name='tipo de trabalho'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='dadosmilitantes',
            name='vinculo_trabalhista',
            field=models.CharField(default='', max_length=250, verbose_name='vinculo trabalhista'),
            preserve_default=False,
        ),
    ]

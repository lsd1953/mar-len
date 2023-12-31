# Generated by Django 4.1.7 on 2023-11-17 00:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_recrutamentos_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='RecrutamentosAcoes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo', models.CharField(max_length=250, verbose_name='tipo')),
                ('descricao', models.CharField(max_length=250, verbose_name='descricao')),
                ('data', models.DateField(verbose_name='data')),
                ('recrutamento', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='acoes', to='core.recrutamentos', verbose_name='recrutando')),
            ],
            options={
                'verbose_name': 'recrutamento ação',
                'verbose_name_plural': 'recrutamentos ações',
            },
        ),
    ]

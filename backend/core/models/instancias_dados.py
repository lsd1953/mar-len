from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class InstanciasDados(models.Model):
    """Os dados de uma Instancia.
    """


    banco_nome = models.CharField(
        _('banco nome'), max_length=250,
        null=True,
        blank=True,
    )

    banco_agencia = models.CharField(
        _('banco agencia'),
        max_length=250,
        null=True,
        blank=True,
    )

    banco_agencia_digito = models.CharField(
        _('banco agencia digito'),
        max_length=250,
        null=True,
        blank=True,
    )

    banco_conta = models.CharField(
        _('banco conta'), max_length=250,
        null=True,
        blank=True,
    )

    banco_conta_digito = models.CharField(
        _('banco conta digito'), max_length=250,
        null=True,
        blank=True,
    )

    banco_codigo_pix = models.CharField(
        _('banco codigo pix'), max_length=250,
        null=True,
        blank=True,
    )

    banco_nome_dono_conta= models.CharField(
        _('banco nome dono conta'), max_length=250,
        null=True,
        blank=True,
    )

    banco_cpf_dono_conta= models.CharField(
        _('banco cpf dono conta'), max_length=250,
        null=True,
        blank=True,
    )

    
    instancia = models.ForeignKey(
        'core.Instancias',
        verbose_name=_('instancia'),
        on_delete=models.CASCADE,
        related_name='dados'
    )

    class Meta:
        verbose_name = _('instancia dados')
        verbose_name_plural = _('instancias dados')

    def __str__(self):
        return f'Dados da {self.instancia.nome}'


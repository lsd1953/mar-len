from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.core.signing import TimestampSigner
import string
import random


class Recrutamentos(models.Model):
    """Um recrutando.

    """

    nome = models.CharField(
        _('nome'), max_length=250
    )

    email = models.EmailField(
        _('email'), max_length=250
    )

    telefone = models.CharField(
        _('telefone'), max_length=20
    )

    data = models.DateField(_('data'))
    
    uf_mora = models.CharField(
        _('uf mora'), max_length=5
    )

    cidade_mora = models.CharField(
        _('cidade mora'), max_length=250
    )

    cidade_mora = models.CharField(
        _('cidade mora'), max_length=250
    )
    
    origem = models.CharField(
        _('origem'), max_length=250
    )

    sindicato = models.CharField(
        _('sindicato'), max_length=250
    )

    sindicalizado = models.BooleanField(
        _('sindicalizado'), default=False
    )

    atuacao = models.CharField(
        _('atuacao'), max_length=250
    )

    categoria = models.CharField(
        _('categoria'), max_length=250
    )

    tipo_trabalho = models.CharField(
        _('tipo de trabalho'), max_length=250
    )

    vinculo_trabalhista = models.CharField(
        _('vinculo trabalhista'), max_length=250
    )
    
    militante = models.ForeignKey(
        to='core.Militantes',
        verbose_name=_('militante'),
        on_delete=models.CASCADE,
        related_name='recrutamento',
        null=True
    )

    instancia_cadastro = models.ForeignKey(
        to='core.Instancias',
        verbose_name=_('instancia que cadastrou'),
        on_delete=models.CASCADE,
        related_name='recrutamentos_cadastrados',
    )

    instancia_recrutando = models.ForeignKey(
        to='core.Instancias',
        verbose_name=_('instancia recrutando'),
        on_delete=models.CASCADE,
        related_name='recrutamentos',
    )

    status_opcoes = (
        (0, _('andamento')),
        (1, _('recrutado')),
        (2, _('não recrutado')),
    )

    status = models.IntegerField(
        verbose_name=_('status'), choices=status_opcoes, default=0
    )


    class Meta:
        verbose_name = _('recrutamento')
        verbose_name_plural = _('recrutamentos')

    def __str__(self):
        return f'{self.instancia_recrutando.nome}: {self.nome}'

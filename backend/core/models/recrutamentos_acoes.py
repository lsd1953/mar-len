from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.core.signing import TimestampSigner
import string
import random


class RecrutamentosAcoes(models.Model):
    """Um recrutando.

    """

    tipo = models.CharField(
        _('tipo'), max_length=250
    )

    descricao = models.CharField(
        _('descricao'), max_length=250
    )

    data = models.DateField(_('data'))

    recrutamento = models.ForeignKey(
        to='core.Recrutamentos',
        verbose_name=_('recrutando'),
        on_delete=models.CASCADE,
        related_name='acoes',
    )

    class Meta:
        verbose_name = _('recrutamento ação')
        verbose_name_plural = _('recrutamentos ações')

    def __str__(self):
        return f'{self.recrutamento.nome}: {self.tipo}'

from django.db import models
from django.utils.translation import gettext_lazy as _

class Funcoes(models.Model):
    """As Funcoes que podem existir dentro de uma instancia.

    """

    nome = models.CharField(
        _('nome'), max_length=250
    )

    organizacao = models.ForeignKey(
        to='core.Organizacoes',
        verbose_name=_('organizacao'),
        on_delete=models.CASCADE,
        related_name='funcoes',
        null=True,
        blank=True,
    )

    cadastra = models.BooleanField(_('cadastra'), default=True)
    financeiro = models.BooleanField(_('financeiro'), default=True)

    class Meta:
        verbose_name = _('funcão')
        verbose_name_plural = _('funcões')

    def __str__(self):

        return f'{self.nome}'

from django.db import models
from django.utils.translation import gettext_lazy as _


class Assistentes(models.Model):
    """Os Assistentes de uma instancia.

    """


    militante = models.ForeignKey(
        to='core.Militantes',
        verbose_name=_('militante'),
        on_delete=models.CASCADE,
        related_name='assistencias',
    )

    instancia = models.ForeignKey(
        to='core.Instancias',
        verbose_name=_('instancia'),
        on_delete=models.CASCADE,
        related_name='assistentes',
    )

    class Meta:
        verbose_name = _('assistente')
        verbose_name_plural = _('assistentes')

    def __str__(self):

        return f'{self.militante.apelido}'

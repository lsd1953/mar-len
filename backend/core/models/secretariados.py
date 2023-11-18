from django.db import models
from django.utils.translation import gettext_lazy as _


class Secretariados(models.Model):
    """As Secretariado de uma instancia.

    """


    militante = models.ForeignKey(
        to='core.Militantes',
        verbose_name=_('militante'),
        on_delete=models.CASCADE,
        related_name='secretariados',
    )

    funcao = models.ForeignKey(
        to='core.Funcoes',
        verbose_name=_('funcao'),
        on_delete=models.CASCADE,
        related_name='militantes',
    )

    instancia = models.ForeignKey(
        to='core.Instancias',
        verbose_name=_('instancia'),
        on_delete=models.CASCADE,
        related_name='secretariado',
    )

    class Meta:
        verbose_name = _('secretariado')
        verbose_name_plural = _('secretariados')

    def __str__(self):

        return f'{self.funcao.nome}'

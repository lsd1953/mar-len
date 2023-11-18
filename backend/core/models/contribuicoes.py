from django.db import models
from django.utils.translation import gettext_lazy as _

class Contribuicoes(models.Model):
    """As contribuicoes dos militantes.

    """

    descricao = models.CharField(
        _('descrição'), max_length=250, null=True, blank=True
    )

    tipo = models.CharField(
        _('tipo'), max_length=100
    )

    valor = models.DecimalField(
        _('valor'), max_digits=14, decimal_places=2, default=0.0
    )

    data = models.DateField(_('data'))

    referencias = (
        (0, _('Outro')),
        (1, _('Janeiro')),
        (2, _('Fevereiro')),
        (3, _('Março')),
        (4, _('Abril')),
        (5, _('Maio')),
        (6, _('Junho')),
        (7, _('Julho')),
        (8, _('Agosto')),
        (9, _('Setembro')),
        (10, _('Outubro')),
        (11, _('Novembro')),
        (12, _('Dezembro')),
        (13, _('Decimo-Terceiro')),
    )

    referencia = models.IntegerField(
        verbose_name=_('referencia'), choices=referencias, default=0
    )

   
    militante = models.ForeignKey(
        to='core.Militantes',
        verbose_name=_('militante'),
        on_delete=models.CASCADE,
        related_name='contribuicoes',
    )

    instancia = models.ForeignKey(
        to='core.Instancias',
        verbose_name=_('instancia'),
        on_delete=models.CASCADE,
        related_name='contribuicoes',
    )

    class Meta:
        verbose_name = _('contribuicao')
        verbose_name_plural = _('Contribuições')
        ordering = ['-data', '-referencia']

    def __str__(self):

        return f'{self.nome}'

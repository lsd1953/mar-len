from django.db import models
from django.utils.translation import gettext_lazy as _

class DadosMilitantes(models.Model):
    """Os dados dos militantes.

    """

    nome = models.CharField(
        _('nome'), max_length=250
    )

    email = models.EmailField(
        _('email'), max_length=250
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

    salario = models.DecimalField(
        _('salario'), max_digits=14, decimal_places=2, default=0.0
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
        related_name='dados',
    )

    class Meta:
        verbose_name = _('dados do militante')
        verbose_name_plural = _('dados dos militantes')

    def __str__(self):

        return f'{self.nome}'

from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _


class Atividades(models.Model):
    """Os dados de uma Atividade.
    """


    nome = models.CharField(
        _('nome'), max_length=250
    )

    descricao = models.TextField(
        _('descricao'),
        null=True,
        blank=True,
    )

    endereco = models.CharField(
        _('endereco'),
        max_length=250,
        null=True,
        blank=True,
    )

    link = models.CharField(
        _('link'),
        max_length=250,
        null=True,
        blank=True,
    )


    inicio = models.DateTimeField('Inicio')
    fim = models.DateTimeField('fim')

    tipos = (
        (0, _('presencial')),
        (1, _('online')),
        (2, _('mista')),
    )

    tipo = models.IntegerField(
        verbose_name=_('tipo'), choices=tipos, default=0
    )
   

    instancia = models.ForeignKey(
        'core.Instancias',
        verbose_name=_('instancia'),
        on_delete=models.CASCADE,
        related_name='atividades'
    )

    class Meta:
        verbose_name = _('Atividade')
        verbose_name_plural = _('Atividade')

    def __str__(self):
        return f'{self.nome}'


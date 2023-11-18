from django.conf import settings
from django.db import models
from django.utils.translation import gettext_lazy as _



class AtividadesConfirmacoes(models.Model):
    """Confirmação de uma atividade.
    """

    tipos = (
        (0, _('presente')),
        (1, _('ausente')),
    )

    tipo = models.IntegerField(
        verbose_name=_('tipo'), choices=tipos
    )

    atividade = models.ForeignKey(
        'core.Atividades',
        verbose_name=_('atividade'),
        on_delete=models.CASCADE,
        related_name='confirmacoes'
    )

    militante = models.ForeignKey(
        to='core.Militantes',
        verbose_name=_('militante'),
        on_delete=models.CASCADE,
        related_name='atividades',
    )

    class Meta:
        verbose_name = _('Confirmação de Atividade')
        verbose_name_plural = _('Confirmações de Atividade')

    def __str__(self):
        return f'Dados da {self.atividade.nome} - {self.militante.nome} - {self.tipo.get_display()}'


from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings

class Administradores(models.Model):
    """As Secretariado de uma instancia.

    """


    usuario = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        verbose_name=_('usuario'),
        on_delete=models.CASCADE,
        related_name='administrador',
        null=True
    )

    organizacao = models.ForeignKey(
        to='core.Organizacoes',
        verbose_name=_('organizacao'),
        on_delete=models.CASCADE,
        related_name='administradores',
    )

    class Meta:
        verbose_name = _('administrador')
        verbose_name_plural = _('administradores')

    def __str__(self):

        return f'{self.organizacao.sigla} - {self.usuario.username}'

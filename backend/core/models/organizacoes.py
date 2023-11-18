from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.core.signing import TimestampSigner
import string
import random

from backend.core.utils.crip_model import CripModel

class Organizacoes(models.Model):
    """Uma organização.
    """

    codigo = models.CharField(
        _('codigo'), max_length=20, unique=True
    )

    constribuicao = models.DecimalField(_('constribuição'),max_digits=10, decimal_places=3, blank=True, null=True)

    nome = models.CharField(
        _('nome'), max_length=250
    )

    sigla = models.CharField(
        _('sigla'), max_length=10
    )

    def gerar_codigo_unico(self):
        while True:
            codigo_unico = TimestampSigner().sign(''.join(random.choice(string.hexdigits) for _ in range(20)))
            if not Organizacoes.objects.filter(codigo=codigo_unico).exists():
                return codigo_unico

    def save(self, *args, **kwargs):
        if not self.codigo or self.codigo == '-':
            self.codigo = self.gerar_codigo_unico()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = _('organização')
        verbose_name_plural = _('organizações')

    def __str__(self):
        return f'{self.nome}'

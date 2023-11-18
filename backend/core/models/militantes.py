from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.core.signing import TimestampSigner
import string
import random


class Militantes(models.Model):
    """Um militante.

    """

    apelido = models.CharField(
        _('apelido'), max_length=250
    )


    codigo_unico = models.CharField(
        _('codigo unico'),
        max_length=250,
        unique=True
    )

    primeiro_acesso = models.BooleanField(_('primeiro acesso'), default=True)
    ativo = models.BooleanField(_('ativo'), default=True)

    usuario = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        verbose_name=_('usuario'),
        on_delete=models.CASCADE,
        related_name='militante',
        null=True
    )

    instancias = models.ManyToManyField(to='core.Instancias',
        verbose_name=_('instancias'),
        related_name='militantes'
        )


    def gerar_codigo_unico(self):
        while True:
            codigo_unico = TimestampSigner().sign(''.join(random.choice(string.hexdigits) for _ in range(20)))
            if not Militantes.objects.filter(codigo_unico=codigo_unico).exists():
                return codigo_unico

    def save(self, *args, **kwargs):
        if not self.codigo_unico or self.codigo_unico == '-':
            self.codigo_unico = self.gerar_codigo_unico()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = _('militante')
        verbose_name_plural = _('militantes')

    def __str__(self):
        return self.apelido

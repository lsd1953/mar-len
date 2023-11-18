from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from datetime import timedelta
from django.core.signing import TimestampSigner
from django.utils.timezone import now as timezone_now
import string
import random


class Convites(models.Model):
    """Um militante.

    """

    codigo = models.CharField(
        _('codigo'),
        max_length=6,
        unique=True
    )

    instancia = models.ForeignKey(
        to='core.Instancias',
        verbose_name=_('instancia'),
        on_delete=models.CASCADE,
        related_name='convites',
    )

    criado = models.DateTimeField(_('criação'), default=timezone_now)


    def gerar_codigo(self):
        while True:
            codigo = TimestampSigner().sign(''.join(random.choice(string.hexdigits) for _ in range(6)))[0:6]
            if not Convites.objects.filter(codigo=codigo).exists():
                return codigo
            
    @property
    def valido(self):
        return timezone_now() <= self.expira

    @property
    def expira(self):
        return self.criado + timedelta(days=2)

    def save(self, *args, **kwargs):
        if not self.codigo or self.codigo == '-':
            self.codigo = self.gerar_codigo()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = _('convite')
        verbose_name_plural = _('convites')

    def __str__(self):
        if self.valido:
            status_text ='Valido'
        else:
            status_text='Expiredo'
        return f'Convite: {self.instancia.nome} | Status: {status_text}'

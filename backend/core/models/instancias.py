from django.db import models
from django.utils.translation import gettext_lazy as _
from django.template.defaultfilters import slugify
from django.urls import reverse


class Instancias(models.Model):
    """Uma instancia Organizacional. Pode ser uma Célula ou um Comitê.

    Attributes::
        [tipos]: IntegerField.
            choices:
                0 - nacional
                1 - fração
                2 - estadual
                3 - base

        [nome]: CharField.
    """

    tipos = (
        (0, _('nacional')),
        (1, _('fração')),
        (2, _('estadual')),
        (3, _('base')),
    )

    tipo = models.IntegerField(
        verbose_name=_('tipo'), choices=tipos, default=3
    )

    nome = models.CharField(
        _('nome'), max_length=250
    )

    categoria = models.CharField(
        _('categoria'), max_length=250, blank=True
    )

    superior = models.ForeignKey(
        to='core.Instancias',
        verbose_name=_('superior'),
        on_delete=models.CASCADE,
        related_name='inferiores',
        null=True,
        blank=True,
    )

    organizacao = models.ForeignKey(
        to='core.Organizacoes',
        verbose_name=_('organizacao'),
        on_delete=models.CASCADE,
        related_name='instancias',
    )

    slug = models.SlugField(_('slug'),null=False, unique=True)

    @property
    def sigla(self):
        nome_completo = self.nome.split()
        sigla = ''
        for nome in nome_completo:
            sigla += nome[0]
        return f'{self.organizacao.sigla}{sigla}'

    def get_absolute_url(self):
        return reverse("core:instancia_view", kwargs={"slug": self.slug})

    def save(self, *args, **kwargs):  # new
        if not self.slug or self.slug == '-':
            self.slug = slugify(self.nome)
        return super().save(*args, **kwargs)

    class Meta:
        verbose_name = _('instancia')
        verbose_name_plural = _('instancias')

    def __str__(self):
        return f'{self.nome} - {self.organizacao.sigla}'

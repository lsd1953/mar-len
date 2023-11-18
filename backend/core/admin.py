from django.contrib import admin

from backend.core.models import (
    Organizacoes, Instancias, Militantes, Secretariados, Funcoes,
    InstanciasDados, Administradores, Assistentes, Convites, Recrutamentos)

class OrganizacoesAdmin(admin.ModelAdmin):
    list_display = [
        'nome',
    ]

    list_per_page = 10

class InstanciasAdmin(admin.ModelAdmin):


    list_display = [
        'nome',
        'organizacao'
    ]

    list_per_page = 10

class MilitantesAdmin(admin.ModelAdmin):


    list_display = [
        'apelido',
    ]

    list_per_page = 10

class SecretariadosAdmin(admin.ModelAdmin):


    list_display = [
        'funcao', 'militante',
    ]

    list_per_page = 10

class FuncoesAdmin(admin.ModelAdmin):


    list_display = [
        'nome',
    ]

    list_per_page = 10

class AdministradoresAdmin(admin.ModelAdmin):
    list_display = [
        'usuario',
        'organizacao',
    ]

    list_per_page = 10

admin.site.register(Organizacoes, OrganizacoesAdmin)
admin.site.register(Instancias, InstanciasAdmin)
admin.site.register(Militantes, MilitantesAdmin)
admin.site.register(Funcoes, FuncoesAdmin)
admin.site.register(Secretariados, SecretariadosAdmin)
admin.site.register(InstanciasDados)
admin.site.register(Assistentes)
admin.site.register(Convites)
admin.site.register(Recrutamentos)

admin.site.register(Administradores, AdministradoresAdmin)


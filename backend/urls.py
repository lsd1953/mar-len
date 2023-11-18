from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from backend.core.views.index_view import index_view

admin.site.site_header = 'Marlen'
admin.site.site_title = 'Marlen Backend'
admin.site.index_title = 'Marlen Backend'




urlpatterns = [
    # V---- frontend controlled urls -----V
    path('', index_view, name='index'),
    path('login', index_view, name='login'),
    path('registration', index_view, name='registration'),    
    path('dashboard', index_view, name='dashboard'),
    path('usuario', index_view, name='usuario'),
    path('contribuicoes', index_view, name='contribuicoes'),
    path('convite', index_view, name='convite'),
    path('contribuicoes/<int:id>/cadastrar', index_view, name='contribuicoes_cadastrar'),
    path('instancia/<int:id>/cadastrar', index_view, name='instancia_cadastrar'),
    path('instancia/<int:id>/recrutamentos/cadastrar', index_view, name='instancia_recrutamentos_cadastrar'),
    path('instancia/<int:id>/recrutamentos', index_view, name='instancia_recrutamentos'),
    path('instancia/<int:id>/recrutamentos/detalhe/<int:idRecruta>', index_view, name='instancia_recrutamentos_detalhe'),
    path('instancia/<int:id>/recrutamentos/detalhe/<int:idRecruta>/acao', index_view, name='instancia_recrutamentos_detalhe_acao'),
    path('instancia/<int:id>/recrutamentos/detalhe/<int:idRecruta>/alterar', index_view, name='instancia_recrutamentos_detalhe_alterar'),
    path('instancia/<int:id>/militante/cadastrar', index_view, name='instancia_militante_cadastrar'),
    path('instancia/<int:id>/militante/remover', index_view, name='instancia_militante_remover'),
    path('instancia/<int:id>/militante/vincular', index_view, name='instancia_militante_vincular'),
    path('instancia/<int:id>/assistencia/vincular', index_view, name='instancia_assistencia_vincular'),
    path('instancia/<int:id>/assistencia/remover', index_view, name='instancia_assistencia_remover'),
    path('instancia/<int:id>/secretarias/cadastrar', index_view, name='instancia_secretarias_cadastrar'),
    path('instancia/<int:id>/militante/cadastrar', index_view, name='instancia_secretarias_remover'),
    path('instancia/<int:id>', index_view, name='instancia'),
    path('administracao/instancia/cadastrar', index_view, name='administracao_instancia_cadastrar'),
    path('administracao/instancia/vincular', index_view, name='administracao_instancia_vincular'),
    path('administracao/funcao/cadastrar', index_view, name='administracao_funcao_cadastrar'),
    path('administracao/funcao/vincular', index_view, name='administracao_funcao_vincular'),
    # A---- frontend controlled urls -----A
    path('api/', include('backend.core.urls', namespace='core')),  

    path('admin/', admin.site.urls),  
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
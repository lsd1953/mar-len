from django.urls import path

from backend.core.views import (
    CSRFView, RegisterView, LoginView, AdministracaoOrganizacaoListView,
    AdministracaoInstanciaListView, AdministracaoInstanciaVinculaView,
    InstanciaListView, InstanciaDetailView, MilitantesListView,
    AdministracaoFuncoesListView, AdministracaoFuncoesVinculaView,
    SecretariosListView, InstanciaMilitanteView, InstanciaMilitanteRemoveView,
    InstanciaMilitanteVinculaView, InstanciaAssistenteVinculaView, 
    InstanciaSecretarioRemoveView, InstanciaSecretarioCadastraView,
    InstanciaAssistenteRemoveView, InstanciaConviteView,
    InstanciaPermissaoView, InstanciaRecrutamentosCadastraView,
    InstanciaRecrutamentosListView, InstanciaRecrutamentoDetailView,
    InstanciaRecrutamentosAcaoView, InstanciaRecrutamentosAlteraView,
    DadosMilitantesDetailView, AssistentesListView, ContribuicoesListView
    
)

app_name = 'core'

urlpatterns = [
   
    path('csrf/', CSRFView.as_view(), name='csrf_view'),
    path('user/register/', RegisterView.as_view(), name='register_view'),
    path('user/login/', LoginView.as_view(), name='login_view'),
    
    path('administracao/organizacao/', AdministracaoOrganizacaoListView.as_view()),
    path('administracao/instancia/vincula/', AdministracaoInstanciaVinculaView.as_view()),
    path('administracao/instancia/', AdministracaoInstanciaListView.as_view()),
    path('administracao/funcao/vincula/', AdministracaoFuncoesVinculaView.as_view()),
    path('administracao/funcao/', AdministracaoFuncoesListView.as_view()),

    path('instancias/militante/remover/', InstanciaMilitanteRemoveView.as_view()),
    path('instancias/militante/vincular/', InstanciaMilitanteVinculaView.as_view()),
    path('instancias/militante/', InstanciaMilitanteView.as_view()),
    path('instancias/assistente/vincular/', InstanciaAssistenteVinculaView.as_view()),
    path('instancias/assistente/remover/', InstanciaAssistenteRemoveView.as_view()),
    path('instancias/secretario/remover/', InstanciaSecretarioRemoveView.as_view()),
    path('instancias/secretario/cadastra/', InstanciaSecretarioCadastraView.as_view()),
    path('instancias/recrutamentos/cadastra/', InstanciaRecrutamentosCadastraView.as_view()),
    path('instancias/recrutamentos/altera/', InstanciaRecrutamentosAlteraView.as_view()),
    
    path('instancias/recrutamentos/acao/', InstanciaRecrutamentosAcaoView.as_view()),
    path('instancias/recrutamentos/', InstanciaRecrutamentosListView.as_view()),
    path('instancias/recrutamento/', InstanciaRecrutamentoDetailView.as_view()),
    path('instancias/convite/<int:pk>/', InstanciaConviteView.as_view()),
    path('instancias/convite/', InstanciaConviteView.as_view()),
    path('instancias/permissao/<int:pk>/', InstanciaPermissaoView.as_view()),
    path('instancias/', InstanciaListView.as_view()),
    path('instancia/<int:pk>/', InstanciaDetailView.as_view()),
    
    path('militantes/', MilitantesListView.as_view()),
    path('secretarios/', SecretariosListView.as_view()),
    path('assistentes/', AssistentesListView.as_view()),
    path('contribuicoes/', ContribuicoesListView.as_view()),

    
    path('usuario/', DadosMilitantesDetailView.as_view()),

    
    
    
    
]


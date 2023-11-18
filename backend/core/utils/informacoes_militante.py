from backend.core.models import Militante
class InformacoesMilitante:

    def __init__(self, id):
        self.militante = Militante.objects.get(usuario=id)
        self.apelido = self.militante.apelido
        self.nome = self.militante.decrypt(self.militante.c_nome)
        self.email =  self.militante.decrypt(self.militante.c_email)
        self.telefone = self.militante.decrypt(self.militante.c_telefone)
        self.sindicato = self.militante.decrypt(self.militante.c_sindicato)
        self.pais = self.militante.decrypt(self.militante.c_pais)
        self.estado = self.militante.decrypt(self.militante.c_estado)
        self.profissao = self.militante.decrypt(self.militante.c_profissao)
        self.vinculo_trabalhista = self.militante.decrypt(self.militante.c_vinculo_trabalhista)
        self.onde_trabalha = self.militante.decrypt(self.militante.c_onde_trabalha)
        self.estado_onde_trabalha = self.militante.decrypt(self.militante.c_estado_onde_trabalha)
        self.pais_onde_trabalha = self.militante.decrypt(self.militante.c_pais_onde_trabalha)
        self.salario = self.militante.decrypt(self.militante.c_salario)

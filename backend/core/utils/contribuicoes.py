def contribuicoes(militante, organizacao = None):

    salario = militante.salario
    if salario == '':
        return None
    contribuicoes = []
    if organizacao :
        contribuicoes.append(
            {'id': organizacao.id,'nome': organizacao.sigla, 'valor': (salario * organizacao.constribuicao) / 100}
        )
    else:
        for instancias in militante.instancias.all():
            if len(contribuicoes) <=0:
                contribuicoes.append(
                    {'id': instancias.organizacao.id,'nome': instancias.organizacao.sigla, 'valor': (salario * instancias.organizacao.constribuicao) / 100}
                )
            else:
                inserir = True
                for contribuicao in contribuicoes:
                    if contribuicao['id'] == instancias.organizacao.id:
                        inserir = False
                if inserir:
                    contribuicoes.append(
                        {'id': instancias.organizacao.id,'nome': instancias.organizacao.sigla, 'valor': (salario * instancias.organizacao.constribuicao) / 100}
                    )
    return contribuicoes
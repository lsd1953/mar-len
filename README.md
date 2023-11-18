Mar-len
==========

**Mar-len**  é uma aplicação feita em Python 3.10 que serve para gerenciar organizações marxistas-leninistas.

## Instaladores

Em Breve

## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Python](https://www.python.org)
- [Django](https://www.djangoproject.com)
- [MKDocs](https://www.mkdocs.org)  (Documentação do Projeto)

## Contribuir

Para contribuir acesso nosso [CONTRIBUTING](https://github.com/cbti-rj-org/marlen/blob/master/CONTRIBUTING.md)


## Como executar o projeto

Para executar o projeto você precisa ter o [Python](https://www.python.org) e o [Git](https://git-scm.com) instalados na sua maquina. Você também precisará de um editor de textos, nós utilizamos o [VSCode](https://code.visualstudio.com).

- Nota:É importante a utilização de ambientes virtuais. neste projetos utilizamos o [Poetry](https://python-poetry.org) e seguiremos com ele nesse passo a passo, mas você pode utilizar o que mais te interessar.

1. Clone esse repositório.

```
git clone https://github.com/cbti-rj-org/marlen.git
```

2. Acesse a pasta do projeto.

3. Instale as dependências.

```
poetry install
```

4. Execute as migrações

```
poetry run python manage.py migrate
```

5. Execute a aplicação.

```
poetry run python manage.py runserver
```

## Automações
Estamos utilizando o **taskipy** em conjunto com o **poetry** para simplificar alguns comandos. Estes comandos funcionam quando o ambiente poetry esta ativado.

* Padronizar o projeto

```
task format
```

* Executar os testes

```
task test
```

* Ativar o servidor da documentação

```
task docs
```

## Licença

[MIT](https://github.com/cbti-rj-org/marlen/blob/master/LICENSE.md)

## Outros

Ícone feito por [Flat Icons](https://www.flaticon.com/br/autores/flat-icons) para [Flaticon](https://www.flaticon.com/br/).

[![Twitter Badge](https://img.shields.io/badge/-Twitter-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/uc_cbti_rj)](https://twitter.com/uc_cbti_rj)
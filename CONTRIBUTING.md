# Guia de Contribuição

## Antes de Contribuir

Bem vindo ao [Mar-len](https://github.com/cbti-rj-org/marlen)! Antes de enviar seus pull requests, leia todo nosso **guia de contribuição**. Se você tiver qualquer dúvida sobre esse guia, fique a vontade para faze-la no nosso [issue](https://github.com/cbti-rj-org/marlen/issues/new).

### Contribuição

Agradecemos qualquer contribuição que você queira fazer, mas é importante que você leia essa seção com atenção para que seu trabalho seja aceito quando você fizer seu pull request!

Sua contribuição será testada e analizada antes de ser aceita, por favor utilize o **isort** e o **blue** para verificar a sua contribuição antes de envia-la e assim ter certeza de que tudo correrá corretamente.

Quando você estiver enviando alguma correção de um problema listado na area de Issues do github, adicione [ISSUE_NUMERO] no título do pull request para podermos identificar.

### Contribuidor

Agradecemos que você considere contribuir para o [Mar-len](https://github.com/cbti-rj-org/marlen)! Nosso objetivo é facilitar a comunicação das organizações marxistas-leninistas. Sendo um de nossos colaboradores, você concorda e confirma que:

- Seu trabalho será distribuído sob a [MIT License](LICENSE.md) assim que seu pull request for mesclado.

- Você deve um código que siga o nosso **Estilo de Codificação**

- Você escreveu testes para o seu código.

**Melhorar Comentários** e **Melhorar os testes** também são bem-vindos.

Agradecemos qualquer contribuição, desde correções em erros de gramática até algoritmos complexos.

### Fluxo de Trabalho
 Nota: Sugerimos a utilização de uma virtualização para a contribuição desse projeto, utilizamos o [Poetry](https://python-poetry.org/).

 01 - Instale o [Python 3.10+](https://www.python.org/downloads/).

 02 - Instale os [Requerimentos](requirements.txt)

 03 - Faça um fork desse projeto para a sua conta GitHub clicando no botão Fork.

 04 - Clone essa cópia do reposítorio para a sua maquina.

 ```
 git clone https://github.com/[seuNomeDeUsuarioDoGitHub]/some.git
 ```

 05 - Acesse a pasta clonada pelo terminal.

 06 - Defina o projeto principal como um novo remote no seu projeto para você ter acesso as mudanças que forem adicionadas nele.

 ```
 git remote add upstream https://github.com/cbti-rj-org/some.git
 ```

 07 - Inicie o git flow no seu diretório do projeto. (Mais informaçoes sobre o [git-flow](https://medium.com/@lariodiniz/tutorial-git-com-git-flow-476ad906c8ae))

 08 - Crie um braço para desenvolvimento a partir do braço develop.

 09 - Faça suas alterações.

 10 - Execute todos os testes.

 11 - Faça um Push para o seu repositório de origem.

 12 - Faça um Pull Request para o projeto original.


#### Estilo de Codificação

* Escreva em Python 3.10+

* Siga as diretrizes da [PEP 8](https://www.python.org/dev/peps/pep-0008/)

* Arquivos, classes, métodos, atributos, funções e variáveis com nomes intuitivos e em português brasileiro sem utilizar acentos.

* Siga o padrão de nomeclatura Python descrito na PEP8; nome de arquivos, métodos, atributos, funções e variáveis em sneak_case e lower_case, CONSTANTES em UPPERCASE, NomeDeClasses em CamelCase, etc..

* Faça nomes descritivos para as suas variáveis, funções e classes.

* Não use siglas nos nomes, descreva o que aquela classe, metodo, atributo, funções ou variável faz.
  
* Não use nome de variáveis de uma única letra.

* Use comentários e docstrings para explicar o que você esta fazendo.

* Escreva testes de tudo que você fizer.

* O Uso de **type hints** do Python é recomentado, mas não obrigatório.

* As extenções dos arquivos de código devem ser `.py`.

* Siga os padrões de pastas existentes no projeto.

* Documente no mkdocs tudo que você criar/corrigir/modificar.

* Se você precisar de um módulo de terceiros que não esteja no arquivo __requirements.txt__, Adicione-o a esse arquivo como parte do seu envio.

* Todos os envios serão testados e analizados utilizando o pytest, o isort e o blue.

* E o mais importate, obrigado por contribuir, sinta-se a vontade para entrar em contato para tirar qualquer duvida.


Escrito por [@UCRJTI](https://github.com/cbti-rj-org), Março 2023.

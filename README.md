# ER2020-ExplicaJa-Grupo 8

<p align="center">
    <h3 align="center">Descrição Geral do Projeto e Instruções de Instalação</h3>
</p>

![Image description](https://github.com/PedroSousa97/ER2020-ExplicaJa-MariaDB-NodeJS-AngularJS/blob/main/ReadFile_Screenshot/screenshot.PNG)

<details open="open">
  <summary>Tabela de Conteúdos</summary>
  <ol>
    <li>
      <a href="#Âmbito-do-Projeto">Âmbito do Projeto</a>
    </li>
     <li>
      <a href="#Visão-Geral-do-Projeto">Visão Geral do Projeto</a>
    </li>
    <li>
      <a href="#Get-Started">Get Started</a>
      <ul>
        <li><a href="#Prerequisitos">Prerequisitos</a></li>
        <li><a href="#Instalação">Instalação</a></li>
        <li><a href="#Testar-a-Webapp">Testar a Webapp</a></li>
      </ul>
    </li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>
</details>

## Âmbito do Projeto

Este projeto tem como principal objetivo servir de modelo a um Sistema de Gestão de Explicações Online, por meio de uma empresa fictícia de nome “ExplicaJa”. Para isso, esta dita empresa “contratou-nos” para desenvolver e implementar tal sistema de gestão.

Contextualizando a empresa “ExplicaJa”, é uma empresa que tinha por objetivo, num período pré-pandémico, fornecer serviços de explicação / tutoria, de forma presencial, de disciplinas lecionadas entre o 5o ano escolar e o 12o ano escolar (desde o ensino básico ao ensino secundário). Dada as circunstâncias epidemiológicas atuais, a empresa foi forçada a se reinventar, ou seja, a redefinir a sua área de atuação de modo a respeitar as regras de distanciamento social e a assegurar a sua subsistência económica. Por conseguinte, a empresa optou por se “modernizar” e passar a fornecer os seus serviços da forma mais segura possível, ou seja, de forma online.

Posto isto, a empresa decidiu encomendar o desenho de um sistema que permitisse, de forma fácil, intuitiva e segura, gerir as suas explicações e o seu leque de docentes.

Assim, conclui-se que o objetivo, pelo menos atual, da empresa “ExplicaJa” é garantir que os seus clientes, apesar das circunstâncias adversas, continuem a poder usufruir dos seus serviços. Com a passagem dos seus serviços para o modo online, a possibilidade de angariar potenciais novos clientes (não-residentes na área de atuação da empresa) é também um objetivo, porventura secundário, da empresa em questão.

## Visão Geral do Projeto

De uma forma mais detalhada, a empresa, com este projeto, pretende obter uma aplicação de gestão do seu sistema de explicações. Esta aplicação tem de permitir, obrigatoriamente, inúmeros serviços de gestão.
De entre os serviços, detalha-se, de uma forma geral:
* Gerir as explicações.
* Gerir os explicadores (listas e atribuição, consoante disponibilidade).
* Gerir as marcações/realizações das tutorias.
* Gerir os pagamentos (por exemplo das mensalidades, anualidades).
* Gerir e organizar os diferentes planos de acesso (consoante o plano de pagamento).
* Permitir que cada aluno possa avaliar a qualidade das suas explicações.
* Permitir que o explicador tenha acesso à informação supracitada.
* Permitir que cada explicador organize o seu horário, aceda a recursos (por exemplo exercícios extra) e ao seu progresso individual enquanto explicador.
* Permitir um acompanhamento por parte dos encarregados de educação (aceder ao progresso dos respetivos alunos, por exemplo).
* Permitir, através de diversos feedbacks, avaliar os explicadores e o serviço de explicação (no final de cada ano letivo, por exemplo).
* Permitir o registo de clientes / profissionais.

## Get Started

Sendo uma full-stack web application, o nosso projeto envolveu variadas tecnologias, middlewares e packages. Esta seccção descreve os passos a seguir para conseguir clonar a nossa webapp e efetivamente compilar, executar e testar a mesma. Sendo que os pacotes instalados foram de uma ordem de quantidade razoável. 

É natural que este README tenha em falta alguns dos pacotes a serem instalados via npm ou ng, mas caso isso aconteça, será avisado através do terminal do seu editor de texto de que essas dependências estam em falta.

### Prerequisitos

A nossa webapp utiliza MariaDB como base de dados, AngularJS como UI/UX Framework e NodeJS+Express para o Back-end. Começaremos então pelos prerequisitos: 

<ul>
    <li>Para conseguir ter exatamente o mesmo ambiente de desenvolvimento aconselhamos a instalação de software <a href="https://www.heidisql.com/download.php">HeidiSQL</a>, sendo que este servirá de SQL Server e software de visualização e gestão da sua Base de Dados. Este software é de fonte segura e intuitivo, no entanto é opcional pois existem outras boas opções para o mesmo efeito;</li>
    <li>A nível de editor de texto, embora também opcional, foi utilizado o <a href="https://code.visualstudio.com/">VSCode</a>, editor atualmente mais usado a nível mundial e com extensões que permite um wrokflow muito mais eficiente para qualquer programador. Este ponto talvez seria escusado pois calculo que já o deve ter instalado, no entanto aconselhamos as seguintes extensões:
        <ul>
            <li>Angular Essentials (Version 11)</li>
            <li>Angular Language Service</li>
            <li>Angular Snippets (Version 11)</li>
        </ul>
    </li>
    <li><a href="https://nodejs.org/en/">NodeJS</a> instalado no seu ambiente é um requisito obrigatório. É com o mesmo que irá ser instalado o Angular CLI, bem como a criação do projeto inicial, e algumas ferramentas angular, como por exemplo a livraria de UI - Angular Material. Além disso o NodeJS é utilizado para a criação do nosso Back-end (Rest API), portanto será também necessário para esse efeito e para instalar os packages necessários ao seu funcionameno, nomeadamente a Express - NodeJS framework. </li>
</ul>

### Instalação

Passemos agora à descrição da instalação. Esta secção incluirá a instalação do Angular CLI, criação de uma Angular Web App genérica, e todos os restantes pacotes.

1. Clone este repositório, para posteriormente alterar a arquitetura dos ficheiros aqui incluídos na sua AngularJS webapp:
   ```sh
   git clone https://github.com/PedroSousa97/ER2020-ExplicaJa-MariaDB-NodeJS-AngularJS.git
   ```
2. Instale a Command Line do AngularJS. Este comando pode ser executado em qualquer diretoria:
   ```sh
   npm install -g @angular/cli
   ```
3. Após ter instalado o Angular CLI, Crie uma pasta com o nome que desejar e na localização que desejar igualmente;
4. Abra a nova pasta, por enquanto vazia, no seu editor de texto;
5. Abra o terminal do seu editor de texto;
6. Execute o seguinte comando para criar uma nova Angular webapp genérica:
   ```sh
   ng new Explica-Online
   ```
7. Instalação default com rounting-modules (caso pergunte por esta opção);
8. Após instalar, vai reparar que foi criada uma nova pasta com toda a arquitetura básica de uma Angular webapp;
9. No terminal do seu editor de texto execute:
   ```sh
   cd Explica-Online
   ```
10. Para instalar a UI Library Angular Material execute o comando seguinte. Opção CSS e estilo do tema - Indigo & Pink;
   ```sh
   ng add @angular/material
   ```
11. Para a responsividade do website em alguns dos componentes instale:
   ```sh
   npm install @angular/flex-layout 
   ```
12. Express Framework para facilitar a criação de NodeJS API's:
   ```sh
   npm install --save express   
   ```
13. Para ter um ambiente de desenvolvimento muito mais eficiente foi também instalado o nodemon, que permite reiniciar a API cada vez que os seus ficheiros são guardados:
   ```sh
   npm install --save-dev  nodemon  
   ```
14. Como foi referido anteriormente, usamos MariaDB como base de dados, então tem que ser também instalado o package referente à mesma:
   ```sh
   npm install mariadb
   ```
15. Como boa prática temos também um .env file que guarda variáveis que não devem ser enviadas para repositórios git. No nosso caso temos a variável que guarda a password do SQL Server, essa password foi apagada e no .env deste repositório tem uma string que indica o que deve colocar no mesmo, no seu caso a password que escolher para o seu SQL Server. Posto isto, é também necessário uma livraria para tratamneto de .env e suas variáveis:
   ```sh
   npm install dotenv --save 
   ```
16. Tentamos aproximar o máximo possível a nossa webapp a um caso prático real, sendo assim as passwords dos nossos users são hashed e salted antes de serem armazenadas na nossa base dados. Eis o package necessário para tratar do password hashing - bcrypt:
   ```sh
   npm install --save bcrypt
   ```
17. Além de password Hashing criamos também as famosas JSON WEB TOKENS quando um utilizador cria um login. Sendo um protótipo, e por falta de tempo, infelizmente não foi possível implementar as Angular Auth Guards e o JWT Interceptor, sendo assim as páginas da nossa webapp estão com routings expostos, bem como a nossa API que nunca recebe a JWT, logo efetivamente é uma API exposta. No entanto, eis o package que utilizamos para gerar as JWT:
   ```sh
   npm install --save jsonwebtoken 
   ```
18. As datas das faturas são criadas com tempo real, extremamente preciso, e não existe nenhuma magia para tal, foi Moment.js package para tal efeito, ferramenta extremamente eficiente e de fácil utilização:
   ```sh
   npm install moment --save
   ```
19. Por último, só falta copiar os ficheiros do clone do nosso projeto para dentro da sua nova Angular webapp que foi gerada, mas para tal tem que ter conhecimento de como devem ser colados, de forma a substituir na totalidade os ficheiros orignais criados peloa Angular CLI. A arquitetura final após substituição dos ficheiros deve ser a seguinte:

![Image description](https://github.com/PedroSousa97/ER2020-ExplicaJa-MariaDB-NodeJS-AngularJS/blob/main/ReadFile_Screenshot/arquitetura.png)

20. Existiram mais alguns que packages que foram instalados e não foram utilizados, pode estar em flata nesta lista, mas se for o caso será avisado para a sua instalação pelo seu terminal.
21. Importante referir que logicamente terá que importar o ficheiro .SQL guardado na diretoria Base de Dados deste repositório, para o seu SQL Server de escolha. Como referido anteriormente certifique-se que altera a password do mesmo no ficheiro .env;

### Testar a Webapp

Está agora apto a testar a nossa webapp. A nossa web app foi criada com o intuito de ser uma webapp minimalista (UI/UX trending), mas que implementasse maioria dos requisitos a que nos propusemos. A aplicação é intuitiva, e nos casos em que pode não ser tão clara foram ainda usadas tool-tips. A nossa WebApp tem 3 users genéricos (Admin, RH, e CFO), o natural processo de utlização da nossa Webapp é:
* Login com Admin (admin@mail.com - User.1234 (esta password é a genérica para todos os utlizadores);
* Criar disciplinas com Admin para que Explicadores se possam registar nas mesmas;
* Login com os RH ( rh@mail.com - User.1234);
* Gerar nova Token de registo para o novo explicador contratado se poder registar na webapp, caso contrário qualquer pessoa não contratada ou sem habilitações poderia realizar o registo;
* Registar Explicador usando a Token de Registo Gerada;
* Login com o Explicador e criação de conteúdos de disciplina, link, e disponibilidades;
* Registo de novo encarregado e posteriormente do seu educando;
* Login com o educando, inscrição em disciplina, consumo de conteúdos das disciplinas e criação de feedbacks;
* O Explicador pode agora visualizar os feedbacks criados, e com os RH pode visualizar os seus explicadores, visualizar feedbacks, visualizar avaliações de explicadores ou criar novas avaliações, e no pior dos casos eliminar explicadores com prestações pobres (despedimento);
* Ao fazer Login com o Encarregado de educação pode visualizar os dados dos seus educandos e os seus progressos, visualizar valores em dívida, mudar o método de pagamento e por último pode pagar propinas. É interessante realizar um pagamento em caso de testes para visualizar o passo seguinte;
* Após haverem pagamentos de explicações realizados por parte de encarregados, o CFO pode realizar o Login (cfo@mail.com - User.1234) e visualizar todas as faturas criadas até à data.

<b>Nota:</b> Sendo que as password hashes foram criadas noutra máquina, podem não funcionar quando forem validadas no seu computador. Se for esse o caso, em princípo basta criar um novo registo, e o bcrypt automaticamente deve conseguir desencriptar as restantes passwords, pois o hash e salt serão os mesmos.

Posto isto, para inicializar a aplicação deve:
* Ligar o SQL Server;
* No terminal da sua aplicação, dentro da diretoria Explica-Online, arranque com a API:
   ```sh
   npm run start:server 
   ```
* Deverá ser avisado do sucesso da inicialização;
* A Rest API está agora disponível em http://localhost:3000/, caso a queira testar via Postman;
* Abra um novo terminal;
* CD para a diretoria Explica-Online, inicialize agora o Development Server do Angular:
   ```sh
   ng serve 
   ```
* Finalmente pode aceder a webapp em: http://localhost:4200/;

## Contacto

Posto isto, as instruções de inicialização da nossa webapp estão terminadas. Caso encontre alguma dificuldade por favor contactar via: henriquesantos293@gmail.com

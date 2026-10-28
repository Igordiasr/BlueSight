# Nome do Produto

## Integrantes

- Ana Jardim
- Igor Dias


## Sobre o produto

Óculos de mergulho com camera para o registro de animais marinhos durante o mergulho. O óculos conta com uma IA para registrar automaticamente os animais marinhos encontrados e mostrar informações desses animais. Para exibir essas informações o óculos faz o uso de display de realidade aumentada, projetado na lente do óculos e conta com sensores de ambiente para captar a profundidade, temperatura e qualidade da água.

## Jornada de construção

### Ideia inicial

A idéia surgiu da dúvida que o Igor teve em aula, sobre o uso do projeto pessoal do primeiro semestre para a execução da atividade. A Ana trouxe a idéia desse óculos para facilitar o registro dos animais marinhos na aplicação que o Igor desenvolvi como projeto pessoal e então resolvemos adotar a idéia.
Consideramos criar um produto relacionado a Harry Potter, mas após discutir as opções, resolvemos seguir com a idéia do óculos.


### Pesquisa e referências

Iniciamos o desenvolvimento do projeto pesquisando óculos com funções semelhantes. Encontramos diversos sites de vendas para esse tipo de produto, sendo mais comum em sites como Mercado Livre e Amazon, mas também encontramos sites especializados em óculos para mergulho como o site da marca Arex, que nos ajudou a ter uma base mais sólida de modelo e preço para nosso produto.


### Ferramentas utilizadas

- Figma Make (automático)
- Ferramentas para geração de imagens (GPT)
- OpenCode (Nemotron 2.5 Lightning)
- VS Code


### Uso de IA

O GPT foi utilizado para gerar a imagem do protótipo do óculos, a imagem da tartaruga e o arquivo MD com as especificações da aplicação. Ele foi utilizado pois gera imagens boas e consegue captar bem a ideia sobre a idealização o produto. O resultado foi extremamente satisfatório. Não foi necessário a mudança. Não houve sugestão. 
 
O Figma Macker (Automático) foi utilizado para gerar o protótipo visual no figma e código. Por se tratar de um agente especialista na criação de protótipos. Ele ajudou na criação da landing page, com um resultado bem satisfatório. Não houve troca do modelo, as sugestões foram mantidas.
 
Open Code (Nemotron 2.5 Lightning) foi utilizado para refatorar o código para a arquitetura FSD, realizar pequenos ajustes e finalização, ajustada a imagem do óculos para ficar responsiva, alteração da logo que foi gerada por outra IA e ajuste no footer para o alinhamento das DIVs. Ele foi utilizado por ser gratuito e de fácil uso, o resultado foi satisfatório,  houve um momento apenas que foi necessário o ajuste do prompt para ajustar melhor a imagem do óculos. Mantivemos o modelo e nao houve sugestões. 


### Evolução da solução

Durante a construção da solução, precisamos ajustar algumas coisas que não sairam como o planejado. Inicialmente identificamos que as imagens geradas pelo Figma Maker eram desenhos, porém precisávamos de imagens mais realistas para a landing page. Solicitamos a alteração das imagens, mas sem sucesso, as novas imagens eram desenhos ainda mais simples do que os anteriores.
Recorremos ao GPT para gerar as imagens que foram adicionadas a versão final. Após a substituição das imagens, solicitamos a alteração da disposição dos textos na seção "Design do produto", pois o contraste com a nova imagem de fundo estava ruim, dificultando a leitura.
Por fim, solicitamos a alteração do logotipo para o logotipo que geramos junto com as novas imagens.


### Resultado final

Gostamos muito do resultado, mesmo com pouco tempo, tivemos a oportunidade de gerar uma landing page moderna e responsiva em poucas horas. Com mais tempo poderíamos utilizar esse conhecimento para acelerar nosso desenvolvimento e aprendizado, nos aprofundando na integração com o back-end da aplicação.

## Utilização de MCP - Atualização da atividade

Utilizamos o WebAbility MCP para garantir que o contraste entre a cor da fonte escolhida e a cor de fundo estejam de acordo com as diretrizes internacionais WCAG. Além da correção de contraste, aproveitamos para aprender como utilizar esse MCP para garantir a acessibilidade em nosso projeto de PI. 

Durante a utilização do MCP, foram realizados ajustes na estrutura semântica do HTML, no contraste das cores, na legibilidade dos textos, na navegação por teclado, nos atributos ARIA e na responsividade da página.

Após as correções, as verificações automatizadas apresentaram os seguintes resultados:

- Redução de 10 para 0 combinações de cores abaixo do contraste exigido.

- Eliminação das violações identificadas nas verificações de acessibilidade e atributos ARIA.

- Correção de 22 erros de tipagem TypeScript.

- Eliminação da rolagem horizontal indesejada nos tamanhos de tela testados.

- Implementação de melhorias na navegação por teclado e na identificação dos elementos por leitores de tela.
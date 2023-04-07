# Scraping
A técnica de scraping consiste na coleta de informações de sites de forma automatizada. Envolve escrever um script voltado para determinada página da web.

# Puppeteer
Neste estudo foi utilizada a biblioteca puppeteer, responsável por buscar as informações das respectivas páginas web.

Documentação: https://pptr.dev/
## Observações
Por questões legais a página crawleada ficará oculta, mas basta ler os arquivos para entender para onde o script está apontando. 

## Run
Um GET para  
```
/ali?search=nome_do_produto
```
onde o parâmetro 'search' contem o produto à ser buscado.

### Retorno
Uma lista em formato JSON contendo, no momento: nome, preco, loja, quantidade vendidos, avaliacao e link.
```json
[
    {
        "nome": "abcd",
        "preco": 10.90,
        "loja": "aquela la",
        "qtdVendidos": 90,
        "avaliacao": 4.8,
        "link": "www.link.exempĺo.com"
    },
    ...
]
```

## Planos futuros
Implementar crawler para outras páginas.
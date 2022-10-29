import { launch } from 'puppeteer';
import express, { Request, Response } from 'express';

interface Produto{
    nome: string,
    preco: number,
    qtdVendidos: number,
    nomeLoja: string,
    avaliacao: number
}

const server = express();

const link = "https://pt.aliexpress.com/af/redmi-10-pro.html?d=y&origin=n&SearchText=redmi+10+pro&catId=0&spm=a2g0o.best.1000002.0&initiative_id=SB_20221028161423";


server.get('/', async(_request: Request, response: Response) => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(link, {
        waitUntil: "load",
        timeout: 0
    });
    
    //Gera um print da pag acessada
    //await page.screenshot({path: "example.png"});
    const pageContent = await page.evaluate(() => {
        const cleanDiv = (div: any, class1: String) => {
            return div.querySelector(class1)?.innerText;
        }
        //leanDiv(el, "._18_85")

        const divs = [...document.querySelectorAll("._3GR-w")]
        return divs.map((el: any) => {
            return {
                nome: cleanDiv(el, "._18_85"),
                qtdVendidos: cleanDiv(el, "._1kNf9")
            }
        });
        //return [...document.querySelectorAll("._3GR-w")].map((el: any) => el.querySelector(".ZzMrp")?.querySelector("._1kNf9")?.innerText);
    });
    console.log(pageContent);

    await browser.close();
    response.send({
        "chave" : "Valor"
    });
});



const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Servidor running on port ${port}, acess: http://localhost:3000/`));
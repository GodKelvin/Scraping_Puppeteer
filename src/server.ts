import { launch } from 'puppeteer';
import express, { Request, Response } from 'express';

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
        function cleanDiv(div: any, classCSS: String): string{
            return div.querySelector(classCSS)?.innerText;
        }

        function getPreco(div: any, classCSS: string): number{
            let spansPreco: Array<HTMLElement> = div.querySelectorAll(classCSS)
            let preco = ""
            for(let span of spansPreco){
                preco += span.innerText
            }
            preco = preco.replace(/[^0-9\,]/g, "").replace(",", ".")
            return Number(preco);
        }


        const divs = [...document.querySelectorAll("._3GR-w")]
        return divs.map((el: any) => {
            return {
                nome: cleanDiv(el, "._18_85"),
                preco: getPreco(el, ".mGXnE._37W_B span"),
                loja: cleanDiv(el, "._7CHGi"),
                qtdVendidos: Number(cleanDiv(el, "._1kNf9")?.split(' ')[0]),
                avaliacao: Number(cleanDiv(el, ".eXPaM"))
            }
        });
        //return [...document.querySelectorAll("._3GR-w")].map((el: any) => el.querySelector(".ZzMrp")?.querySelector("._1kNf9")?.innerText);
    });
    console.log(pageContent);

    await browser.close();
    response.send({pageContent});
});



const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Servidor running on port ${port}, acess: http://localhost:3000/`));
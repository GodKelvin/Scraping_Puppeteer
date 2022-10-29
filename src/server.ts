import { launch } from 'puppeteer';
import express, { Request, Response } from 'express';

const server = express();

const link = "https://pt.aliexpress.com/af/redmi-10-pro.html?d=y&origin=n&SearchText=redmi+10+pro&catId=0&spm=a2g0o.best.1000002.0&initiative_id=SB_20221028161423";

server.get('/', async(_request: Request, response: Response) => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(link);
    //Gera um print da pag acessada
    //await page.screenshot({path: "example.png"});
    let teste = "pizza";
    const pageContent = await page.evaluate(() => {
        return [...document.querySelectorAll("._3GR-w")].map((el: any) => el.querySelector(".ZzMrp")?.querySelector("._1kNf9")?.innerText);
    });
    console.log(pageContent);

    await browser.close();
    response.send({
        "chave" : "Valor"
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Servidor running on port ${port}, acess: http://localhost:3000/`));
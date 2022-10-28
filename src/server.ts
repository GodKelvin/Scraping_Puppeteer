import { launch } from 'puppeteer';
import express, { Request, Response } from 'express';

const server = express();

server.get('/', (_request: Request, response: Response) => {
    response.send("Hello Galaxy!");
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Servidor running on port ${port}`));

(async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("https://www.alura.com.br/formacao-front-end");
    //Gera um print da pag acessada
    //await page.screenshot({path: "example.png"});
    await browser.close();
})();
import { launch } from 'puppeteer';
import express from 'express';

const server = express();

server.

(async () => {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto("https://www.alura.com.br/formacao-front-end");
    //Gera um print da pag acessada
    //await page.screenshot({path: "example.png"});
    await browser.close();
})();
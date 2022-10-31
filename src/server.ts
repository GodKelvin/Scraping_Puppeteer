
import express, { Request, Response } from 'express';
import cron from 'node-cron';
import { CrawlerAli } from './models/Crawler';

const server = express();

const link = "https://pt.aliexpress.com/af/redmi-10-pro.html?d=y&origin=n&SearchText=redmi+10+pro&catId=0&spm=a2g0o.best.1000002.0&initiative_id=SB_20221028161423";


server.get('/', async(_request: Request, response: Response) => {
    let robozinho = new CrawlerAli("redmi 10 pro");
    //let dataCrawler = robozinho.teste();
    let dataCrawler = await robozinho.run();

    response.send({"data": dataCrawler})
});



const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor running on port ${port}, acess: http://localhost:3000/`);
});
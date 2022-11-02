
import express, { Request, Response } from 'express';
import indexRoutes from './routes/indexRoutes';
//import cron from 'node-cron';
//import { CrawlerAli } from './models/Crawler';

const server = express();
//server.use(express.json());
server.use(indexRoutes);

server.get('/', async(_req: Request, res: Response) => {

    //let robozinho = new CrawlerAli("redmi 10 pro");
    //let dataCrawler = robozinho.teste();
    //let dataCrawler = await robozinho.run();

    res.status(200).json({"Feito por: Kelvin Lehrback":"-> https://github.com/GodKelvin"});
});



const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor running on port ${port}, acess: http://localhost:3000/`);
});
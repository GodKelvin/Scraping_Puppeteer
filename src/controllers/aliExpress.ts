import { Request, Response } from "express"
import { CrawlerAli } from '../models/Crawler';
export const getAli = async(req: Request, res: Response): Promise<any> => {
    try{
        if(!req.query.search) return res.status(400).json({pendente: "params SEARCH nao foi identificado"}) ;
        let robozinho = new CrawlerAli(String(req.query.search));
        let dataCrawler = await robozinho.run();
        return res.status(200).json(dataCrawler);
    }catch(error){
        //@TODO inserir logs
        console.log(`ERROR: ${error}`);
        return res.status(500).json("Internal Server Error");
    }
}
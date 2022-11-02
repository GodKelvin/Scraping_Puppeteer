import { Request, Response } from "express"
import { CrawlerAli } from '../models/Crawler';
export const getAli = async(req: Request, res: Response): Promise<any> => {
    try{
        let robozinho = new CrawlerAli("redmi 10 pro");
        let dataCrawler = await robozinho.run();
        return res.status(200).json(dataCrawler);
    }catch(error){
        console.log(`ERROR: ${error}`);
        return res.status(500).json("Internal Server Error");
    }
}
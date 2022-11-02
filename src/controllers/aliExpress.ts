import { Request, Response } from "express"
export const getAli = async(req: Request, res: Response): Promise<any> => {
    return res.status(200).json({"Pizza": "calabresa"})
}
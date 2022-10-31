import { rejects } from 'assert';
import { resolve } from 'path';
import { launch } from 'puppeteer';
export class CrawlerAli{
    //initValue & middleValue serao substituidos
    link: string = `https://pt.aliexpress.com/af/initValue.html?d=y&origin=n&SearchText=middleValue&catId=0&spm=a2g0o.best.1000002.0&initiative_id=SB_20221028161423`;
    busca: string;

    constructor(busca: string){
        this.busca = busca;
        this.mountQuery();
    }

    async run(): Promise<any>{
        let browser = await launch();
        let  page = await browser.newPage();
        await page.goto(this.link, {
            waitUntil: "load",
            timeout: 0
        });

        // //Gera um print da pag acessada
        // //await page.screenshot({path: "example.png"});
        let pageContent = await page.evaluate(() => {
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
    
    
            let divs = [...document.querySelectorAll("._3GR-w")]
            return divs.map((el: any) => {
                return {
                    nome: cleanDiv(el, "._18_85"),
                    preco: getPreco(el, ".mGXnE._37W_B span"),
                    loja: cleanDiv(el, "._7CHGi"),
                    qtdVendidos: Number(cleanDiv(el, "._1kNf9")?.split(' ')[0]),
                    avaliacao: Number(cleanDiv(el, ".eXPaM"))
                }
            });
        });
    
        await browser.close();
        return pageContent;
    }

    private mountQuery(): void{
        this.link = this.link.replace("initValue", this.busca.replace(/ /g, "-"));
        this.link = this.link.replace("middleValue", this.busca.replace(/ /g, "+"));
    }

    //#@TODO: Log no discord
}
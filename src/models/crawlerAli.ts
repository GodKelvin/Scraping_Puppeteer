import { launch } from 'puppeteer';
import { Produto } from '../types/produto';
export class CrawlerAli{
    //initValue & middleValue serao substituidos (valores vindo em 'process.env.PAGINA_CRAWLEADA')
    link: any = process.env.PAGINA_CRAWLEADA;
    busca: string;

    constructor(busca: string){
        this.busca = busca;
        this.mountQuery();
    }

    async run(): Promise<Produto[]>{
        let browser = await launch();
        let  page = await browser.newPage();
        await page.goto(this.link, {
            waitUntil: "load",
            timeout: 0
        });

        //Gera um print da pag acessada
        await page.screenshot({path: "screenshot_page.png"});
        let pageContent: Produto[] = await page.evaluate(() => {
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
    
    
            let divs = [...document.querySelectorAll(".manhattan--container--1lP57Ag")]
            return divs.map((el: any) => {
                return {
                    nome: cleanDiv(el, ".manhattan--titleText--WccSjUS"),
                    preco: getPreco(el, ".manhattan--price-sale--1CCSZfK"),
                    loja: cleanDiv(el, ".cards--storeLink--1_xx4cD"),
                    qtdVendidos: cleanDiv(el, ".manhattan--trade--2PeJIEB"),
                    avaliacao: Number(cleanDiv(el, ".manhattan--evaluation--3cSMntr")),
                    link: el.href
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
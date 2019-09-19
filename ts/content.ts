import * as fs from "fs";
import * as http from "http";
import { ParsedUrlQuery } from "querystring";
import * as url from "url";

export default class Content {

    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
         if (req.url === "/favicon.ico") {
             res.writeHead(200, { "Content-Type": "image/x-icon" });
             fs.createReadStream("favicon.ico").pipe(res);
             return;
         }

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang = 'hu'>");
        // Weboldal fejrésze
        res.write("<head>");
        res.write("<title>FaktorTK</title>");

        res.write("</head>");
        res.write("<body><form style = 'font-family:Courier; font-size:24px'>");
        res.write("<h1> Faktoriális </h1>");
        const query: ParsedUrlQuery = url.parse(req.url as string, true).query;
        const a: number = query.aInput === undefined || query.aInput === "" ? 5 : parseFloat(query.aInput as string);
        const b: number = query.bInput === undefined || query.bInput === "" ? 6 : parseFloat(query.bInput as string);
        res.write("<p>a= ");
        res.write(`<input type='number' name='aInput' value=${a} onChange='this.form.submit();'>`);
        res.write("</p>");
        res.write("<p>b= ");
        res.write(`<input type='number' name='bInput' value=${b} onChange='this.form.submit();'>`);
        res.write("</p>");
        const terulet: number = a * b;
        const kerulet: number = 2 * (a + b);
        res.write(`<p>T=${terulet}</p>`);
        res.write(`<p>K=${kerulet}</p>`);
        res.write("</form></body>");
        res.write("</html>");
        res.end();
    }
}

    

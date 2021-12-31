require('dotenv').config();
import express, { 
    Application, 
    Request, 
    Response }    from "express"    ;
import path       from "path"       ;
import bodyParser from "body-parser";

import plantRouter from "./routes/plant";

class App {
    public app : Application;

    constructor ( ) {
        const app = express();

        app.use( bodyParser.json() );
        app.use( express.static(path.resolve('public')) );

        this.app = app;
        this.init_routes( );
        return this;
    }

    private init_routes ( ) {
        this.app.get( '/ping', ( request : Request, response : Response ) => {
            response.status(200).json( { connection: true } );
        } );
        
        this.app.use( plantRouter );
        
        this.app.get( '/:id', ( request : Request, response : Response ) => {
            response.sendFile( path.resolve( "public/index.html" ) );
        } );
    }
}

export default new App();
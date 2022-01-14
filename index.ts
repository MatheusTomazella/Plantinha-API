require('dotenv').config();
import app from "./src/app";
const http = require( 'http' ).Server( app.app );

http.listen( process.env.PORT || 3306, ( error : any ) => {
    if ( error ) throw error;
    console.log( 'Server Started' );
} );

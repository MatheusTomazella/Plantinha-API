import { Request, Response, Router } from "express";
import activePlants from "../activePlants";
import { error_FAILED_TO_ADD_POINT, error_FAILED_TO_GET_GRAPH_POINTS, error_INACTIVE_PLANT } from "../errorFactory";
import Graph from "../Graph";

const router = Router();

// Get graph data
router.get("/plant/:id/graph", async ( request : Request, response : Response) => {
    const id      : number = parseInt(request.params.id);
    const year    : number | undefined = ( request.query.year  ) ? parseInt(request.query.year.toString())  : undefined;
    const month   : number | undefined = ( request.query.month ) ? parseInt(request.query.month.toString()) : undefined;
    const day     : number | undefined = ( request.query.day   ) ? parseInt(request.query.day.toString())   : undefined;
    const type    : number | undefined = ( request.query.type  ) ? parseInt(request.query.type.toString())  : undefined;

    const where : {
        plant      : number,
        year ?     : number,
        month?     : number,
        day  ?     : number,
        dataType?  : number
    } = { 
        plant: id
    };
    if ( year  !== undefined ) where.year     = year;
    if ( month !== undefined ) where.month    = month;
    if ( day   !== undefined ) where.day      = day;
    if ( type  !== undefined ) where.dataType = type;

    const data = await Graph.findAll( { 
        where
    } )
    .catch( error => {
        console.log( error );
        response.status(500).json( error_FAILED_TO_GET_GRAPH_POINTS( error ) );
        return;
    } );

    response.status(200).json(data);
} );

// Add point to graph
router.get( "/plant/:id/graph/add", async ( request : any, response : Response ) => {
    const id = parseInt( request.params.id );
    const plant = activePlants[id];
    if ( !plant ) { 
        response.status( 404 ).json( error_INACTIVE_PLANT( "Can't add point without data" ) );
        return;
    }
    plant.addPoint( )
    .then( () => {
        response.status( 200 ).end();
    } )
    .catch( error => {
        response.status( 500 ).json( error_FAILED_TO_ADD_POINT( error ) );
    } );
} );

export default router;
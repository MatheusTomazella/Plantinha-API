import { Request, Response, Router } from "express";
import activePlants, { getOrInsertToCache } from "../activePlants";
import { error_DATABASE_ERROR, error_FAILED_TO_CREATE_OBJECT, error_FAILED_TO_DELETE_OBJECT, error_FAILED_TO_SET_DATA, error_INACTIVE_PLANT, error_OBJECT_NOT_FOUND } from "../errorFactory";
import Plant from "../Plant";

const router = Router();

/* Plant */

// Get all plants
router.get( "/plant", async ( request : Request, response : Response ) => {
    const plants : Plant[] | void = await Plant.findAll()
    .catch( error => {
        response.status(500).json( error_DATABASE_ERROR( error ) );
    } );
    response.status( 200 ).json( plants );
} );

// Get a plant by id
router.get( "/plant/:id", async ( request : Request, response : Response ) => {
    const id : number = parseInt( request.params.id );
    if ( activePlants[id] ) {
        response.status(200).json( activePlants[id].toJSON() );
    }
    const plant = await Plant.findByPk( id )
    .catch( error => {
        response.status(404).json( error_OBJECT_NOT_FOUND( error ) );
        return;
    } );
    if ( !plant ) {
        response.status( 404 ).json( error_OBJECT_NOT_FOUND( "Plant not found" ) );
    }
    response.status( 200 ).json( (plant as Plant).toJSON() );
} );

// Create a plant
router.post( "/plant", async ( request : any, response : Response ) => {
    const plant = await Plant.create( {
        name: request.body.name,
        timestamp: request.body.timestamp || Date.now()
    } )
    .catch( ( error : any ) => { 
        console.error( error );
        response.status( 500 ).json( error_FAILED_TO_CREATE_OBJECT(error) );
    } );
    if ( !plant ) {
        response.status( 500 ).json( error_FAILED_TO_CREATE_OBJECT(null) );
        return;
    }
    response.status( 201 ).send( (plant as Plant).toJSON() );
} );

// Delete a plant
router.delete( "/plant", ( request : any, response : Response ) => {
    if ( !request.body.id ) {
        response.status( 400 ).json( error_FAILED_TO_DELETE_OBJECT( "No id provided" ) );
        return;
    }
    Plant.destroy( { 
        where: { 
            id: request.body.id
        }
    } )
    .catch( error => { 
        response.status( 500 ).json( error_FAILED_TO_DELETE_OBJECT( error ) );
        return;
    } );
    if ( activePlants[request.body.id] ) delete activePlants[request.body.id];
    response.status( 200 ).end( );
} );

/* Data */

// Get data for a plant
router.get( "/plant/data/:id", ( request : Request, response : Response ) => {
    const id : number = parseInt( request.params.id );
    const plant = activePlants[id];
    if ( !plant ) {
        response.status( 404 ).json( error_INACTIVE_PLANT( "No data for this plant" ) );
        return;
    }
    response.status( 200 ).json( plant.getData() );
} );

// Set data for a plant
router.post( "/plant/data/:id", async ( request : any, response : Response ) => {
    const id = parseInt( request.params.id );
    const plant = await getOrInsertToCache( id )
        .catch( error => { 
            response.status( 500 ).json( error_FAILED_TO_SET_DATA( error ) );
        } );
    if ( !plant ) { 
        response.status( 500 ).json( error_FAILED_TO_SET_DATA( "Plant not found" ) );
        return;
    }
    plant.setData( request.body );
    response.status( 200 ).json( plant.getData() );
} );

export default router;
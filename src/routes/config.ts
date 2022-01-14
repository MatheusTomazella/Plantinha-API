import { Router, Request, Response } from "express";
import Config from "../Config";
import { error_FAILED_TO_CREATE_OR_UPDATE_CONFIG, error_FAILED_TO_GET_CONFIG, error_MISSING_PARAMETER } from "../errorFactory";

const router = Router();

router.get("/plant/:id/config", async (request: Request, response: Response) => {
    const id : number = parseInt(request.params.id);
    
    const config = await Config.findOne({
        where: {
            plant: id
        }
    })
    .catch(error => {
        console.log(error);
        response.status(500).json(error_FAILED_TO_GET_CONFIG(error));
        return;
    });

    if (!config) {
        response.status(500).json(error_FAILED_TO_GET_CONFIG("Could not find or get config"));
        return;
    }

    response.status(200).json(config);
} );

router.post( "/plant/:id/config", async ( request : any, response : Response ) => {
    const id : number = parseInt( request.params.id );
    const PUMP_CHECK_INTERVAL_MS   : number | undefined = request.body.PUMP_CHECK_INTERVAL_MS;
    const PUMP_RUN_TIME_MS         : number | undefined = request.body.PUMP_RUN_TIME_MS;
    const DRY_THRESHOLD_PERCENTAGE : number | undefined = request.body.DRY_THRESHOLD_PERCENTAGE;
    const GRAPH_PLOT_INTERVAL_MS   : number | undefined = request.body.GRAPH_PLOT_INTERVAL_MS;

    if ( !PUMP_CHECK_INTERVAL_MS 
      || !PUMP_RUN_TIME_MS 
      || !DRY_THRESHOLD_PERCENTAGE 
      || !GRAPH_PLOT_INTERVAL_MS 
    ) {
        response.status( 400 ).json( error_MISSING_PARAMETER( "Missing configuration value" ) );
        return;
    }

    Config.createOrUpdate( id, {
        PUMP_CHECK_INTERVAL_MS,
        PUMP_RUN_TIME_MS,
        DRY_THRESHOLD_PERCENTAGE,
        GRAPH_PLOT_INTERVAL_MS
    } )
    .then( ( config : Config ) => {
        response.status( 200 ).json( config );
    } )
    .catch( ( error : any ) => {
        response.status( 500 ).json( error_FAILED_TO_CREATE_OR_UPDATE_CONFIG( error ) );
    } );
} );

export default router;
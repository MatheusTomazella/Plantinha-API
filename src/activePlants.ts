import { error_OBJECT_NOT_FOUND } from "./errorFactory";
import Plant from "./Plant";

const activePlants : { [id : number] : Plant } = {};

export async function getOrInsertToCache ( id : number ) : Promise<Plant> {
    if ( activePlants[id] ) return activePlants[id];
    const plant = await Plant.findByPk( id )
    .catch( error => {
        throw error_OBJECT_NOT_FOUND( error );
    } );
    if ( !plant ) {
        throw error_OBJECT_NOT_FOUND( "Plant not found" );
    }
    activePlants[id] = plant;
    return activePlants[id];
}

export default activePlants;
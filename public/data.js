function getData ( ) {
    return new Promise( ( resolve, reject ) => {
        resolve( {
            temperature: Math.floor( Math.random() * 40 ),
            airHumidity: Math.floor( Math.random() * 100 ),
            soilHumidity: Math.floor( Math.random() * 100 ),
            lifeTime: Math.floor( Math.random() * 10000 ),
            waterLevel: Math.floor( Math.random() * 100 ),
        } );
    } )
}
function updateData ( ) {
    getData()
    .then( data => {
        document.getElementById('temp').innerHTML = data.temperature + 'ºC';
        document.getElementById('air').innerHTML = data.airHumidity + '%';
        document.getElementById('soil').innerHTML = data.soilHumidity + '%';
        document.getElementById('lifetime').innerHTML = data.lifeTime + ' dias';
        document.getElementById('water').innerHTML = data.waterLevel + '%';
    } )
    .catch( defaultErrorHandler );
}

function getName ( ) {
    return new Promise( ( resolve, reject ) => {
        resolve( "Plantinha" );
    } )
}
function updateName ( ) {
    getName()
    .then( name => {
        document.getElementById('name').value = name;
    } )
    .catch( defaultErrorHandler );
}

function defaultErrorHandler ( error ) {
    console.error( error );
}

updateName();
updateData();
setInterval( updateData, 1000 );
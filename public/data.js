const APIurl = "https://planta.vercel.app";

const id = parseInt( window.location.pathname.slice(1) );

function getData ( ) {
    return new Promise( ( resolve, reject ) => {
        $.ajax({
            type: "GET",
            url: APIurl + `/plant/${id}/data`,
            success: function (response) {
                resolve( response );
            },
            error: ( error ) => {
                console.error( error );
                resolve( {
                    temperature: '??',
                    airHumidity: '??',
                    soilHumidity: '??',
                    lifetime: '??',
                    waterLevel: '??'
                } );
            }
        });
    } )
}
function updateData ( ) {
    getData()
    .then( data => {
        document.getElementById('temp').innerHTML = data.temperature + 'ºC';
        document.getElementById('air').innerHTML = data.airHumidity + '%';
        document.getElementById('soil').innerHTML = data.soilHumidity + '%';
        document.getElementById('lifetime').innerHTML = data.lifetime + ' dias';
        document.getElementById('water').innerHTML = data.waterLevel + '%';
    } )
    .catch( defaultErrorHandler );
}

function getName ( ) {
    return new Promise( ( resolve, reject ) => {
        $.ajax({
            type: "GET",
            url: APIurl + `/plant/${id}/name`,
            success: function (response) {
                resolve( response );
            },
            error: ( error ) => {
                console.error( error );
                resolve( '????' );
            }
        });
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
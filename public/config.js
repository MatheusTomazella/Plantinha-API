const configIds = [ 
    "PUMP_CHECK_INTERVAL_MS", 
    "PUMP_RUN_TIME_MS",
    "DRY_THRESHOLD_PERCENTAGE",
    "GRAPH_PLOT_INTERVAL_MS",
];

const timeUnits = [ 1, 1000, 60000, 3600000 ];

function convertToBiggerTimeUnit ( time ) {
    const result = {
        time: time,
        unit: 0
    };

    timeUnits.forEach( ( unit ) => {
        const timeInUnit = time / unit;
        if ( timeInUnit >= 1 ) {
            result.time = timeInUnit;
            result.unit = unit;
        } else return;
    } );

    return result;
}

function setConfigValues ( config ) {
    configIds.forEach( ( id ) => {
        if ( id.slice( -2 ) === 'MS' ) {
            const time = convertToBiggerTimeUnit( config[ id ] );
            document.getElementById( id ).value = time.time;
            $(`#${id}unit`).val( time.unit ).formSelect();
        } else document.getElementById( id ).value = config[ id ];
    } );
}

function updateConfigValues ( ) {
    $.ajax({
        type: "GET",
        url: `${APIurl}/plant/${id}/config`,
        success: ( response ) => {
            setConfigValues( response );
        },
        error: ( error ) => {
            console.error( error );
        }
    });
}

function getConfigObject ( ) {
    const config = { };
    configIds.forEach( ( id ) => {
        const value = $(`#${id}`).val();
        const multiplier = $(`#${id}unit`).val();
        config[ id ] = value * multiplier;
    } );
    return config;
}

function postConfig ( ) {
    const config = getConfigObject();

    $.ajax({
        type: "POST",
        url: `${APIurl}/plant/${id}/config`,
        data: JSON.stringify( config ),
        contentType: "application/json",
        success: ( response ) => {
            console.log( response );
        },
        error: ( error ) => {
            console.error( error );
        }
    });
}
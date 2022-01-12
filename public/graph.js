const canvas = document.getElementById('chart');

const myChart = new Chart(canvas, {
    type: 'line',
    data: { 
        labels: [],
        datasets: [{
            label: 'Temperatura',
            data: [],
            fill: false,
            borderColor: 'rgb(255, 0, 0)',
            tension: 0.1
        },{
            label: 'Um. Ar',
            data: [],
            fill: false,
            borderColor: 'rgb(0, 0, 255)',
            tension: 0.1
        },{
            label: 'Um. Solo',
            data: [],
            fill: false,
            borderColor: 'rgb(0, 255, 0)',
            tension: 0.1
        }]
    },
    options: {
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                scaleLabel: {
                    display: true,
                    labelString: 'Umidade (%)'
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                scaleLabel: {
                    display: true,
                    labelString: 'Temperatura (ºC)'
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        }
    }
});

function fetchAndUpdateGraph ( ) {
    const year    = $("#year").val();
    const month   = $("#month").val();
    const day     = $("#day").val();

    const queryComponents = [];
    if ( year  && year  != 0  ) queryComponents.push( `year=${year}` );
    if ( month && month != 0  ) queryComponents.push( `month=${month}` );
    if ( day   && day   != 0  ) queryComponents.push( `day=${day}` );
    const query = queryComponents.join( '&' );

    console.log( `${APIurl}/plant/${id}/graph?${query}` );

    $.ajax({
        type: "GET",
        url: `${APIurl}/plant/${id}/graph?${query}`,
        success: function (response) {
            const tempDataset   = extractDataset( response, 0 );
            const airDataset    = extractDataset( response, 1 );
            const soilDataset   = extractDataset( response, 2 );
            const labels        = extractLabels( response );

            myChart.data = {
                labels,
                datasets: [ tempDataset, airDataset, soilDataset ]
            }

            myChart.update();
        },
        error: console.error
    });
}

const dataTypeNames = [ 'Teperatura', 'Um. Ar', 'Um. Solo' ];
const colors = [
    'rgb(255, 0, 0)',
    'rgb(0, 0, 255)',
    'rgb(0, 255, 0)',
]
function extractDataset ( data, dataType ) {
    const result = {
        label: dataTypeNames[ dataType ],
        data: [],
        fill: false,
        backgroundColor: colors[ dataType ],
        borderColor: colors[dataType],
        tension: 0.1,
        yAxisID: (dataType == 0) ? 'y1' : 'y'
    }

    data = data.filter( point => ( point.dataType == dataType ) );

    data.forEach( ( point ) => { 
        result.data.push( {
            x: getPointLabel( point ),
            y: point.value
        } );
    } );

    return result;
}

function extractLabels ( data ) {
    const result = [];
    data.forEach( point => {
        const label = getPointLabel( point );
        if ( result[result.length-1] == label ) return;
        result.push( label );
    } );
    return result;
}

function getPointLabel ( point ) {
    return `${point.day}/${(point.month < 10) ? "0"+point.month : point.month} ${point.time}`;
}

function randomPlot ( ) {
    return Math.floor( Math.random() * 100 );
}

setInterval( fetchAndUpdateGraph, 60 * 1000 );
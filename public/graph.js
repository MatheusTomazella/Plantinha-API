const canvas = document.getElementById('chart');
            const myChart = new Chart(canvas, {
                type: 'line',
                data: { 
                    labels: ["2021-12-00",
                                "2021-12-01",
                                "2021-12-02",
                                "2021-12-03",
                                "2021-12-04",
                                "2021-12-05",
                                "2021-12-06",],
                    datasets: [{
                        label: 'Temperatura',
                        data: [{x:"2021-12-00",y:randomPlot()}, {x:"2021-12-02",y:randomPlot()}, {x:"2021-12-03",y:randomPlot()}, {x:"2021-12-04",y:randomPlot()}, {x:"2021-12-05",y:randomPlot()}, {x:"2021-12-06",y:randomPlot()}],
                        fill: false,
                        borderColor: 'rgb(255, 0, 0)',
                        tension: 0.1
                    },{
                        label: 'Um. Ar',
                        data: [{x:"2021-12-00",y:randomPlot()}, {x:"2021-12-02",y:randomPlot()}, {x:"2021-12-03",y:randomPlot()}, {x:"2021-12-04",y:randomPlot()}, {x:"2021-12-05",y:randomPlot()}, {x:"2021-12-06",y:randomPlot()}],
                        fill: false,
                        borderColor: 'rgb(0, 0, 255)',
                        tension: 0.1
                    },{
                        label: 'Um. Solo',
                        data: [{x:"2021-12-00",y:randomPlot()}, {x:"2021-12-02",y:randomPlot()}, {x:"2021-12-03",y:randomPlot()}, {x:"2021-12-04",y:randomPlot()}, {x:"2021-12-05",y:randomPlot()}, {x:"2021-12-06",y:randomPlot()}],
                        fill: false,
                        borderColor: 'rgb(0, 255, 0)',
                        tension: 0.1
                    }]
                }
            });

            function randomPlot ( ) {
                return Math.floor( Math.random() * 100 );
            }
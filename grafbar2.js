var ctx = document.getElementById('myChart2');

d3.csv('MarcaAutos.csv')
.then( (datos) => {
    
    console.log(datos)

    let datosmarca = datos.map( function(elemento, indice){
        console.log(indice, elemento)
        return elemento.Marca
    } )

    let datoscantidad = datos.map(
        function (elemento, indice) {
        console.log(indice, elemento)
        return elemento.Ofertas
    })

    var myChart2 = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: datosmarca,
            datasets: [{
                label: 'Ofertas',
                data: datoscantidad,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 64, 0.2)',
                    'rgba(153, 206, 64, 0.2)',
                    'rgba(153, 102, 86, 0.2)',
                    'rgba(54, 102, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 64, 0.2)',
                    'rgba(153, 206, 64, 0.2)',
                    'rgba(153, 102, 86, 0.2)',
                    'rgba(54, 102, 86, 0.2)'

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
})

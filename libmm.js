module.exports = { 
  // Se define una variable local de tipo Arreglo / Colección de JSON
  autos: [
    {marca: 'Peugeot', menciones: 0}, 
    {marca: 'Suzuki', menciones: 0}, 
    {marca: 'Kia', menciones: 0}, 
    {marca: 'Hyundai', menciones: 0}, 
    {marca: 'Renault', menciones: 0}, 
    {marca: 'Citroen', menciones: 0}, 
    {marca: 'Nissan', menciones: 0},
    {marca: 'Ford', menciones: 0},
    {marca: 'Honda', menciones: 0},
    {marca: 'Mazda', menciones: 0},
  ], 
  
  // Se define un método local, para leer contenido Web
  leerWebPage: function (url, callback) {
    let request = require('request')
    let cheerio = require('cheerio')

    request(url, function (err, resp, html) {
      if (!err) {
        // Se define instancia a Cheerio
        const $ = cheerio.load(html)
        
        // Obtener bloque de "noticias" de la página
        let noticias = $('#ContenedorListadoAvisos')
        // noticias.childNodes.forEach( function(item, index){
        //   console.log("Noticia: ", index, item)
        // })
//mm
       // console.log("Noticia: ", noticias)

        // Obtener artículos de las noticias
        let articulos = $(noticias).find('div.columnaListadoAvisos1')
        let datos = []
        articulos.map( function(index, articulo){
            let texto = $($(articulo.childNodes).find('a.links-resultado')[0]).text()
            // console.log(texto)
            datos.push(texto)
          })

        // Se retorna contenido de artículos
        callback(null, datos)
      } else {
        console.log("Se produjo un error al leer la URL: " + url, err)
        callback(err)
      }
    })

  },
  
  contarMenciones: function (datos) {
    // Se muestra el contenido de la variable local
    // console.log("autos considerados", this.autos)

    // Recorrer los valores del arreglo local
    let cantidad = this.autos.map( (auto)=>{
      datos.forEach(elemento => {
        if (elemento.indexOf(auto.marca) > -1) auto.menciones++
      })

      return auto
    })

    // Retornar / Devolver el dato procesado
    return cantidad
  },
  
  // Se define un método local, para escribir CSV
  escribirCSV: function (data){
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: 'MarcaAutos.csv',
      header: [
        { id: 'marca', title: 'Marca' },
        { id: 'menciones', title: 'Cantidad' },
      ]
    })

    csvWriter
      .writeRecords(data)
      .then(() => console.log('Archivo CSV de autos guardado.'))
      .catch((err) => console.log('Error al crear archivo CSV de autos.', err))

  },

  // Se define un método local, para escribir CSV
  escribirJSON: function (data){
    const fs = require('fs');

    fs.writeFile('marcas.json', data, 'utf8', function(){
      console.log('Archivo json de autos.')
    })
  }
}
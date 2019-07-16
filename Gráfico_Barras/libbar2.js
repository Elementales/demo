module.exports = { 
  // Se define una variable local de tipo Arreglo / Colección de JSON
  Marcaautos: [
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
        
        
        let anuncios = $('#ContenedorListadoAvisos')
       
        let Avisos = $(anuncios).find('div.columnaListadoAvisos1')
        let valores = []
        Avisos.map(function (index, aviso) {
          let texto = $($(aviso.childNodes).find('a.links-resultado')[0]).text()
          // console.log(texto)
          valores.push(texto)
          })

        // Se retorna contenido de artículos
        callback(null, valores)
      } else {
        console.log("Se produjo un error al leer la URL: " + url, err)
        callback(err)
      }
    })

  },
  
  contarMenciones: function (valores) {
    // Se muestra el contenido de la variable local
    // console.log("autos considerados", this.autos)

    // Recorrer los valores del arreglo local
    let cantidad = this.Marcaautos.map((marcadeauto) => {
        valores.forEach(elemento => {
          if (elemento.indexOf(marcadeauto.marca) > -1) marcadeauto.menciones++
        })
  
        return marcadeauto
    })

    // Retornar / Devolver el dato procesado
    return cantidad
  },
  
  // Se define un método local, para escribir CSV
  escribirCSV: function (data) {
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: 'MarcaAutos.csv',
      header: [
        { id: 'marca', title: 'Marca' },
        { id: 'menciones', title: 'Ofertas' },
      ]
    })

    csvWriter
      .writeRecords(data)
      .then(() => console.log('Archivo CSV de MarcaAutos guardado.'))
      .catch((err) => console.log('Error al crear archivo CSV de MarcaAutos.', err))

  },

  // Se define un m�todo local, para escribir CSV
  escribirJSON: function (data) {
    const fs = require('fs');

    fs.writeFile('mmenciones.json', data, 'utf8', function () {
      console.log('Archivo json de MarcaAutos.')
    })
  }
}
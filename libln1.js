module.exports = {
  // Se define una variable local de tipo Arreglo / Colecci�n de JSON
  UsoAutos: [
    { auso: '2010', menciones: 0 },
    { auso: '2011', menciones: 0 },
    { auso: '2012', menciones: 0 },
    { auso: '2013', menciones: 0 },
    { auso: '2014', menciones: 0 },
    { auso: '2015', menciones: 0 },
    { auso: '2016', menciones: 0 },
    { auso: '2017', menciones: 0 },
    { auso: '2018', menciones: 0 },
          
  ],

  // se lee contenido Web
  leerWebPage: function (url, callback) {
    let request = require('request')
    let cheerio = require('cheerio')

    request(url, function (err, resp, html) {
      if (!err) {
        // Se instancia a Cheerio
        const $ = cheerio.load(html)

        // Obtener bloque de "anuncios" de la p�gina de el rastro
        let anuncios = $('#ContenedorListadoAvisos')

        // Obtener avisos de autos de los anuncios
        let Avisos = $(anuncios).find('div.columnaListadoAvisos1')
        let valores = []
        Avisos.map(function (index, aviso) {
          let texto = $($(aviso.childNodes).find('a.links-resultado')[0]).text()
          // console.log(texto)
          valores.push(texto)
        })
        // Se retorna contenido de avisos
        callback(null, valores)
      } else {
        console.log("Se produjo un error al leer la URL: " + url, err)
        callback(err)
      }
    })

  },
  contarMenciones: function (valores) {
    // Se muestra el contenido de la variable local
    // console.log(" UsoAutos considerados", this. UsoAutos)

    // Recorrer los valores del arreglo local
    let cantidad = this.UsoAutos.map((uso) => {
      valores.forEach(elemento => {
        if (elemento.indexOf(uso.auso) > -1) uso.menciones++
      })

      return uso
    })

    // Retornar / Devolver el dato procesado
    return cantidad
  },

  // Se define un m�todo local, para escribir CSV
  escribirCSV: function (data) {
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: 'UsoAutos.csv',
      header: [
        { id: 'auso', title: 'Uso' },
        { id: 'menciones', title: 'Ofertas' },
      ]
    })

    csvWriter
      .writeRecords(data)
      .then(() => console.log('Archivo CSV de UsoAutos guardado.'))
      .catch((err) => console.log('Error al crear archivo CSV de UsoAutos.', err))

  },

  // Se define un m�todo local, para escribir CSV
  escribirJSON: function (data) {
    const fs = require('fs');

    fs.writeFile('mmenciones.json', data, 'utf8', function () {
      console.log('Archivo json de UsoAutos.')
    })
  }
}

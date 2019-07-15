module.exports = { 
  // Se define un método local, para leer contenido Web
  leerExcel: function (ARCHIVO, HOJA, callback) {
    const readXlsxFile = require('read-excel-file/node')

    // TODO: Leer JSON Regiones
    const fs = require('fs');
    const center_regions = fs.readFileSync('./center_regions.geojson')
    const regions = JSON.parse(center_regions)

    readXlsxFile(ARCHIVO, { sheet: HOJA })
    .then((data) => {
      // console.log(data)
      let datos_extraidos = data.slice(2,16).map((item)=>{
        let coordenada_x = -69.657523966675882
        let coordenada_y = -18.490253944816949

        let nombre_region = item[0].replace(/\*/g, '')
        regions.regiones_centroides.map( (r)=>{
          if (nombre_region === r.properties.Region){
            // Se asignan invertidos ya que así estén en el GEOJSON de referencia.
            coordenada_x = r.properties.X
            coordenada_y = r.properties.Y
          }
        } )
        return { 
          "type": "Feature", 
          "properties": { 
          "Region": item[0].replace(/\*/g, ''),
          "npro_ar": item[1],
          "npro_dip": item[4],
          "npro_mag": item[7],
          "npro_vce": item[10],
          "fic_ar": item[3],
          "fic_dip": item[6],
          "fic_mag": item[9],
          "fic_vce": item[12],
          "conicyt_ar": item[2], 
          "conicyt_dip": item[5],
          "conicyt_mag": item[8],
          "conicyt_vce": item[11],
          }, 
          "geometry": { 
            "type": "Point", 
            "coordinates": [coordenada_x, coordenada_y] 
          } 
        }
      })

      let geojson = {
        "type": "FeatureCollection",
        "features": datos_extraidos
      }

      callback(null, geojson)
    })
    .catch((error) => {
      console.log("Se produjo un error al leer el archivo: " + ARCHIVO, error)
      callback(error)
    })
  },

  // Se define un método local, para escribir CSV
  escribirJSON: function (data){
    const fs = require('fs');

    fs.writeFile('mapa_dip.json', JSON.stringify(data), 'utf8', function(){
      console.log('Archivo json creado correctamente.')
    })
  }
}
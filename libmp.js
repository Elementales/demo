module.exports = { 
  // Se define un método local, para leer contenido Web
  leerExcel: function (ARCHIVO, HOJA, callback) {
    const readXlsxFile = require('read-excel-file/node')

    readXlsxFile(ARCHIVO, { sheet: HOJA })
    .then((data) => {
      // console.log(data)
      let datos_extraidos = data.slice(4,20).map((item)=>{
        return { 
          "type": "Feature", 
          "properties": { 
            "Region": item[0].replace(/\*/g, ''),
            "Superficie_KM2": item[1],
            "Poblacion_HAB": item[3],
            "Densidad_HABporKM2": item[5],
            "Género_M": item[6],
            "Género_F": item[6],
          }, 
          "geometry": { 
            "type": "Point", 
            "coordinates":  [item[8], item[9]], 
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

    fs.writeFile('mapamp.json', JSON.stringify(data), 'utf8', function(){
      console.log('Archivo json creado correctamente.')
    })
  }
}
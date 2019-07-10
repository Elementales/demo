// Definir atributos iniciales para el Mapa
const MAP_ZOOM = 4
const MAP_CENTER = [-33.4444, -70.6535]

// Crear instancia del Mapa
var map = L.map('myMap').setView(MAP_CENTER, MAP_ZOOM)

// Crear capa de sectores y Copyright del Mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

// Agregar marcador (Marker) con información emergente (PopUp) de ejemplo



  function MostrarDato(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
      let dato_a_mostrar = `<p> 
      <h5>Region: ${feature.properties.Region}</h5><br/>
      <span><b>Superficie_KM2</b>: ${feature.properties.Superficie_KM2}</span><br/>
      <span><b>Poblacion_HAB</b>: ${feature.properties.Poblacion_HAB}</span><br/>
      <span><b>Densidad_HABporKM2</b>: ${feature.properties.Densidad_HABporKM2}</span><br/>
      <span><b>Género_M</b>: ${feature.properties.Género_M}</span><br/>
      <span><b>Género_F</b>: ${feature.properties.Género_F}</span><br/>
      </p>`  
      layer.bindPopup(dato_a_mostrar);
    }
  }

// Se agrega data al Mapa
d3.json('./mapamp.json')
 .then((geojson) => {
 L.geoJSON(geojson,{
  onEachFeature: MostrarDato
}).addTo(map)
 })

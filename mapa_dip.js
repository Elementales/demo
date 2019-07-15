// Definir atributos iniciales para el Mapa
const MAP_ZOOM = 4
const MAP_CENTER = [-33.4444, -70.6535]
const MAP_CIRCLE = [-35.4444, -70.6535]
const MAP_RADIUS = 5

// Crear instancia del Mapa
var map = L.map('myMap').setView(MAP_CENTER, MAP_ZOOM)

// Crear capa de sectores y Copyright del Mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

// Agregar marcador (Marker) con información emergente (PopUp) de ejemplo
L.marker(MAP_CENTER)

// Agregar circulo marcador (CircleMarker) con información emergente (PopUp) de ejemplo
L.circleMarker(MAP_CIRCLE, { radius: MAP_RADIUS })

  // Se establece una constante como referencia para mostrar "Información Adicional"

const mas_info = document.getElementById("mas_info")

function MostrarDato(feature, layer) {
  // Se valida si el objeto tiene la propiedad "properties"
  if (feature.properties) {
    let dato_a_mostrar = `<p>
      <h6>Región: ${feature.properties.Region}</h6><br/>
      <span>Proy_Diplomado: ${feature.properties.npro_dip}</span><br/>
      <span>MontoFic_Dip: ${feature.properties.fic_dip}</span><br/>
      <span>MontoConicyt_Dip: ${feature.properties.conicyt_dip}</span><br>
    </p>`
    layer.bindPopup(dato_a_mostrar);
    layer.on({
        click: (event)=>{
       // Se obtienen los datos desde las propiedades del JSON
       let npro_dip = event.target.feature.properties.npro_dip
    }
})
}
}
// Se agrega data al Mapa
d3.json('./mapa_dip.json')
  .then((geojson) => {
    L.geoJSON(geojson, {
      onEachFeature: MostrarDato,
      pointToLayer: function (geoJsonPoint, latlng) {
        return L.circleMarker(latlng).bindPopup(`Proy_Diplomado: ${geoJsonPoint.npro_dip}`)
      },
            
    }).addTo(map)
  })

  
       
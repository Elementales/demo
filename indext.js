// Se establece URL fuente de información a procesar
const URL = 'https://www.rastro.com/resultado.html?q=&cl=1001&c=&Optz=&t='

// Se instancia la librería principal
const trabajo = require('./trabajo')

// Se instancia el primer método de la librería 
// para leer contenido desde URL
const webpage = trabajo.leerWebPage(URL, function(error, valores){
  // Se evalúa posible error
  if(error){
    // En caso de error se presenta mensaje
    console.log("Error al leer WebPage", error)
  }else{
    // Mostrar textos    
    console.log("Textos:", valores)

    // Se instancia un método de la librería 
    // y su resultado se asigna a una constante
    const menciones = trabajo.contarMenciones(valores)

    // Se muestra el contenido de la constante
    console.log("Contador: ", menciones)

    // Se instancia otro método de la librería
    // para generar un CSV con el valor 
    // de la constante anterior
    trabajo.escribirCSV(menciones)
    
  }
})

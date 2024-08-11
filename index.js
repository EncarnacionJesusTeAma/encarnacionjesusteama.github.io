// Tu configuración de Firebase
var firebaseConfig = {
    databaseURL: "https://encarnacion-jesus-te-ama-default-rtdb.firebaseio.com/"
};
// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
// Referencia a la base de datos
var database = firebase.database();

// --------------------------------- Función para limpiar formulario
function cleanForm () {
    document.getElementById("nombre").value = "";
    document.getElementById("edad").value = "";
    document.getElementById('sexo').selectedIndex = -1;
    document.getElementById("asiste_a_alguna_iglesia").selectedIndex = -1;
    document.getElementById("iglesia").value = "";
    document.getElementById("paso_al_frente_por").value = "";
    document.getElementById("quiere_que_oremos_por_algo").value = "";
    document.getElementById("celular").value = "";
    document.getElementById("direccion").value = "";

    const diasSemana = document.getElementsByName('que_dias_se_le_puede_visitar[]');
    diasSemana.forEach((dia) => {
        dia.checked = false;
    });
}

// --------------------------------- Función para enviar datos
document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir que la página se recargue

  // Capturar los valores del formulario ------------------------------------------- REFORMULAR .value X
  var id = document.getElementById('id').value;
  var nombre = document.getElementById('nombre').value;
  var edad = document.getElementById('edad').value;
  var asiste_a_alguna_iglesia = document.getElementById('asiste_a_alguna_iglesia').value;
  var iglesia = document.getElementById('iglesia').value;
  var paso_al_frente_por = document.getElementById('paso_al_frente_por').value;
  var quiere_que_oremos_por_algo = document.getElementById('quiere_que_oremos_por_algo').value;
  var celular = document.getElementById('celular').value;
  var direccion = document.getElementById('direccion').value;
  
  var que_dias_se_le_puede_visitar = [];
  var checkboxes = document.getElementsByName('que_dias_se_le_puede_visitar[]');

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      que_dias_se_le_puede_visitar.push(checkboxes[i].value);
    }
  }

  // Datos que queremos enviar
  var data = {
    id,
    nombre,
    edad,
    sexo,
    asiste_a_alguna_iglesia,
    iglesia,
    paso_al_frente_por,
    quiere_que_oremos_por_algo,
    celular,
    direccion,
    que_dias_se_le_puede_visitar
  };

  // Config
  var updates = {};
  updates[id + '/' + nombre] = data;

  // Enviar los datos a Firebase
  database.ref().update(updates)
    .then(function() {
      cleanForm();
    })
    .catch(function(error) {
      alert("Capture la pantalla y recargue la página web! Hubo un error!");
    });

});
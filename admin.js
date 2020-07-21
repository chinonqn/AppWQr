// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//Agregar documentos
function guardar() {
  var keyCliente = document.getElementById('keyCliente').value;
  var nombre = document.getElementById('nombre').value;
  var localidad = document.getElementById('localidad').value;
  var correo = document.getElementById('correo').value;
  var clave = document.getElementById('clave').value;

  db.collection("client").add({
    keyCliente: keyCliente,
    nombre: nombre,
    localidad: localidad,
    correo: correo,
    clave: clave
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('keyCliente').value = '';
      document.getElementById('nombre').value = '';
      document.getElementById('localidad').value = '';
      document.getElementById('correo').value = '';
      document.getElementById('clave').value = '';
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

//Leer documentos
var tabla = document.getElementById('tabla');
db.collection("client").onSnapshot((querySnapshot) => {
  tabla.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.keyCliente} => ${doc.data().nombre}=> ${doc.data().localidad}=> ${doc.data().correo}=> ${doc.data().clave}`);
    tabla.innerHTML += `
      <tr>
    
      <td>${doc.data().keyCliente}</td>
      <td>${doc.data().nombre}</td>
      <td>${doc.data().localidad}</td>
      <td>${doc.data().correo}</td>
      <td>${doc.data().clave}</td>
      <td>
        <button  class="btn btn-primary"  title="Eliminar" data-toggle="tooltip"><i
         class="material-icons" onclick="eliminar('${doc.id}')">&#xE5C9;</i></button>
      </td>
        <td>
        <button  class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="editar('${doc.id}','${doc.data().keyCliente}','${doc.data().nombre}','${doc.data().localidad}${doc.data().correo}${doc.data().clave}')">
        Editar
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar Usuario</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <input type="text" id="keyCliente" placeholder="CUIT" class="form-control my-3">
                <input type="text" id="nombre" placeholder="Nombre Comercial" class="form-control my-3">
                <input type="text" id="localidad" placeholder="Ciudad" class="form-control my-3">
                <input type="text" id="correo" placeholder="Correo" class="form-control my-3">
                <input type="text" id="clave" placeholder="Clave" class="form-control my-3">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"><i
                    class="fas fa-times-circle"></i> Cerrar</button>
                <button type="button" class="btn btn-info" id="boton" onclick="guardar()"><i
                    class="fas fa-upload"></i> Cargar</button>
              </div>
            </div>
          </div>
        </div>
      </td>
      </tr>
      `
  });
});

//borrar documentos
function eliminar(id) {
  db.collection("client").doc(id).delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}

//editar documentos
function editar(id, keyCliente, nombre, localidad) {

  document.getElementById('keyCliente').value = keyCliente;
  document.getElementById('nombre').value = nombre;
  document.getElementById('localidad').value = localidad;
  document.getElementById('correo').value = correo;
  document.getElementById('clave').value = clave;
  var boton = document.getElementById('boton');
  boton.innerHTML = 'Editar';

  boton.onclick = function () {
    var washingtonRef = db.collection("client").doc(id);
    // Set the "capital" field of the city 'DC'

    var keyCliente = document.getElementById('keyCliente').value;
    var nombre = document.getElementById('nombre').value;
    var localidad = document.getElementById('localidad').value;
    var correo = document.getElementById('correo').value;
    var clave = document.getElementById('clave').value;

    return washingtonRef.update({
      keyCliente: keyCliente,
      nombre: nombre,
      localidad: localidad,
      correo: correo,
      clave: clave
    })
      .then(function () {
        console.log("Document successfully updated!");
        boton.innerHTML = 'Guardar';
        document.getElementById('keyCliente').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('localidad').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('clave').value = '';
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
}
//configuración personal de Firebase
firebase.initializeApp({
  apiKey: "AIzaSyC71sgR8BNOoOxFDGMG1XEs7s6ugSoMD9Y",
  authDomain: "app-qr-28856.firebaseapp.com",
  projectId: "app-qr-28856"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
  
  var tabla = document.getElementById('tabla');
  
    db.collection("clientes").where("correo", "==", "email")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            

            const keyCliente = doc.data().keyCliente;
            sessionStorage.set("keyCliente", keyCliente);

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    const keyCliente = sessionStorage.get("keyCliente");
  //Leer documentos
  db.collection("users").where("keyCliente", "==", keyCliente)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            

            const nombre = doc.data().nombre;
            const telefono = doc.data().telefono;
            const dni = doc.data().dni;
            const fecha = doc.data().fecha;

            tabla.innerHTML += `
          <tr>
          <td><i class="fa fa-user"></i> ${nombre}</td>
          <td><a href="https://wa.me/${telefono}"><i class="fa fa-whatsapp-square"></i></a> ${telefono}</td>
          <td><i class="fa fa-address-card"></i> ${dni}</td>
          <td><i class="fa fa-calendar"></i> ${fecha}</td>
          <td></td>
    
          `

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    function logout(){
        firebase.auth().signOut();
        window.location = 'index.html';
      }

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;
    window.location = 'admin.php';
    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.
    window.location = 'index.html';
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});
function logout(){
  firebase.auth().signOut();
  window.location = 'index.html';
}
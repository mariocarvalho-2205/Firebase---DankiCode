// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDBejs9asi8LpeZ6vrRIJs2g5PsBtQiGHM",
  authDomain: "portal-cliente-9c54d.firebaseapp.com",
  projectId: "portal-cliente-9c54d",
  storageBucket: "portal-cliente-9c54d.appspot.com",
  messagingSenderId: "222267716659",
  appId: "1:222267716659:web:7d7133b3bc983fbf1a1f46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
console.log(db);
// console.log(app)
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("admin");
const adminArea = document.getElementById("admin");
const clienteArea = document.getElementById("cliente");

if (myParam == "true") {
    
    adminArea.style.display = "block";
    // clienteArea.style.display = "none";
} else {
    // adminArea.style.display = "none";
    clienteArea.style.display = "block";
}


const formCliente = document.getElementById("form-clientes");

formCliente.addEventListener("submit", (e) => {
  e.preventDefault();
  let comprovanteText = document.getElementById("comprovante").value;
  let arquivo = document.getElementById("arquivo").files[0];
  console.log(comprovanteText);

  // uploadTask vai permitir que coloque uma barrad de progresso e envio do arquivo
  /*
    Sintaxe
    arquivo.name = e o nome do aquivo original
    storage.ref("nome da pasta que sera armazenada no banco" + nome do arquivo arquivo.name).put(arquivo)
    */
  const storageRef = ref(storage, "documentos/" + arquivo.name);
  const uploadTask = uploadBytesResumable(storageRef, arquivo);

  // uploadTask.on(retorna o estado para criar uma barra de prograsso por exemplo)
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // progresso
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 1
      );
      console.log(progress);
    },
    function (error) {
      console.log(error);
    },
    function () {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        //   console.log(url);
        addDoc(collection(db, "documentos"), {
          comprovante: comprovanteText,
          url: url,
        });
      });
      console.log("Upload concluido");
    }
  );
  formCliente.reset();
});

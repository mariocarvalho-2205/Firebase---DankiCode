import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  doc,
  onSnapshot
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

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("admin");
const adminArea = document.getElementById("admin");
const clienteArea = document.getElementById("cliente");

const provider = new GoogleAuthProvider();

if (myParam != "true") {
    adminArea.style.display = "block";
} else {
    clienteArea.style.display = "none";
}

const formCliente = document.getElementById("form-clientes");
const loginBtn = document.getElementById("login");

formCliente.addEventListener("submit", (e) => {
  e.preventDefault();
  let comprovanteText = document.getElementById("comprovante").value;
  let arquivo = document.getElementById("arquivo").files[0];
  console.log(comprovanteText);

  const storageRef = ref(storage, "documentos/" + arquivo.name);
  const uploadTask = uploadBytesResumable(storageRef, arquivo);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
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

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
    .then((result) => {
            const user = result.user;
            console.log(user);
        })
       .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorCode, errorMessage, email, credential);
        });
})

onAuthStateChanged(auth, (user) => {
    if (user) {
        if (user.email == "mario.carvalho.devpython@gmail.com") {
            console.log("Usuario logado");
            loginBtn.style.display = "none";
            document.getElementById("listar-pedidos").style.display = "block";
          } else {
            console.log("Usuario nao autorizado");
          }
        } else {
          console.log("Nenhum usuario logado");
        }
})

// Pegar dados em tempo real e atualizar o HTML
const documentosContainer = document.getElementById("documentos-container");

const datas = collection(db, "documentos");
onSnapshot(datas, (snapshot) => {
    documentosContainer.innerHTML = ""; // Limpa o contêiner antes de adicionar os documentos
    snapshot.forEach((doc) => {
        const data = doc.data();

        // Cria um contêiner para cada documento
        const docDiv = document.createElement("div");
        docDiv.classList.add("documento");

        // Cria e adiciona o elemento de texto
        const textElement = document.createElement("p");
        textElement.textContent = data.comprovante;
        docDiv.appendChild(textElement);

        // Cria e adiciona o elemento de imagem
        const imgElement = document.createElement("img");
        imgElement.src = data.url;
        imgElement.alt = "Imagem do documento";
        docDiv.appendChild(imgElement);

        // Adiciona o contêiner do documento ao contêiner principal
        documentosContainer.appendChild(docDiv);
    });
}, (error) => {
    console.log("Erro ao pegar documentos:", error);
});

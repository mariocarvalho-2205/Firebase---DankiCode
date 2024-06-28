let user = null
const form = document.getElementById('input_form')
const formCreateUser = document.getElementById('form_create_user')
const btncriar = document.getElementById('create_user')
const btnsair = document.getElementById('sair')
const formTarefa = document.querySelector('.form_tarefa')


const BtnCriarTarefa = document.getElementById('btn_criar_tarefa')



const firebaseConfig = {
    apiKey: "AIzaSyAF6Tx8O2bES7POVHkslxvU9Myz8bW_H8g",
    authDomain: "todolist-b44be.firebaseapp.com",
    projectId: "todolist-b44be",
    storageBucket: "todolist-b44be.appspot.com",
    messagingSenderId: "1017707961468",
    appId: "1:1017707961468:web:f4ea6817f664c676103df9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

// sair
function sair() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        user = null
        document.querySelector('.container-login').style.display = "none";
        formCreateUser.style.display = "none"
        document.querySelector("#input_form").style.display = "block"
        console.log('Deslogado com sucesso')

    }).catch((error) => {
        // An error happened.
        console.log('Erro ao sair', error)
    });
}

// login
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    // console.log('teste', email, password)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            user = userCredential.user;
            document.querySelector("#input_form").style.display = "none"
            document.querySelector('.container-login').style.display = "block";
            form.reset()
            console.log(" Logado ", user.email)
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("erro do auth", error)
        });
    formTarefa.reset()



})

// verificador
firebase.auth().onAuthStateChanged((user) => {
    if (user) {


        user = user;
        document.querySelector("#input_form").style.display = "none"
        document.querySelector('.container-login').style.display = "block";
        // ...
        console.log(user, user.uid, "Logado Vefiricador")

        // ouvir mudanças no banco de dados .where('userId', '==', user.uid)
        db.collection('tarefas').where("userId", "==", user.uid).onSnapshot((data) => {

            // adicionando items na lista dinamicamente
            let list = document.getElementById('tarefas')
            list.innerHTML = ''
            let tarefas = data.docs
            tarefas = tarefas.sort((a, b) => {
                if (a.data.horario < b.data().horario) {
                    return -1
                } else {
                    return +1
                }

            })
            console.log('dentro de if tarefas.sort ', tarefas[0].data().tarefa)


            tarefas.map((val) => {                                              // recupera id tarefa-id="${val.id}"
                list.innerHTML += `<li>${val.data().tarefa} - <a tarefa-id="${val.id}" href="javascript:void(0)" class="excluir-btn">X Excluir</a></li>`

            })

            // excluir a tarefa
            let excluirTarefa = document.querySelectorAll('.excluir-btn')

            excluirTarefa.forEach((element) => {
                element.addEventListener("click", (e) => {
                    e.preventDefault()
                    let docId = element.getAttribute('tarefa-id')

                    db.collection('tarefas').doc(docId).delete()

                })
            })
            console.log(data.docs)
        })
    } else {
        // User is signed out
        // ...
        console.log("deslogado Verificador")
    }
});



// criar usuario
function criar() {


    document.querySelector("#input_form").style.display = "none"
    formCreateUser.style.display = "block"
    formCreateUser.addEventListener("submit", (e) => {
        e.preventDefault()
        const createName = document.getElementById('nome').value
        const createEmail = document.getElementById('create_email').value
        const createPassword = document.getElementById('create_password').value
        firebase.auth().createUserWithEmailAndPassword(createEmail, createPassword)
            .then((userCredential) => {
                // Signed in 
                let user = userCredential.user;
                let userUpdate = firebase.auth().currentUser;
                userUpdate.updateProfile({
                    displayName: createName,
                })
                user = userUpdate
                console.log('Login Criado com Sucesso!', user)

                document.querySelector("#input_form").style.display = "block"
                formCreateUser.style.display = "none"
                sair()
                // ...
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                // ..
                console.log(error, errorCode, errorMessage)
            });
    })
}




// adicionar tarefa
formTarefa.addEventListener("submit", (e) => {
    e.preventDefault();
    const tarefa = document.getElementById("tarefa").value
    const dateHora = document.getElementById('dia_hora').value

    const dataAtual = new Date().getTime()

    console.log(tarefa, dateHora, dataAtual)
    if (dataAtual > new Date(dateHora).getTime()) {
        console.log('sua data e menor que a data atual')

    } else if (tarefa == "" || dateHora == "") {
        alert("Voce precisa preencher os campos vazios!!")
    } else {

        db.collection('tarefas').add({
            tarefa: tarefa,
            horario: dateHora,
            userId: user.uid,
            user: user.displayName
        });

        console.log('Tarefa Criada com Sucesso', user)

        formTarefa.reset()

    }


})




btnsair.addEventListener('click', sair)
btncriar.addEventListener('click', criar)


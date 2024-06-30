import React from "react";
// import { useNavigate } from "react-router-dom";

// import { auth } from "../../firebase/firebaseConfig";
// import { signOut, getAuth } from "firebase/auth";

const Home = () => {
    // const navigate = useNavigate()
    
    // const handleSair = (e) => {
    //     e.preventDefault()
    //     const auth = getAuth()
    //     console.log("Sair", auth)
    //     signOut(auth)
    //     .then(()=>{
    //         console.log("Saiu")
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })

    //     navigate("/")
    // }
  return (
    <div className="main">
      <h1>Home</h1>
      {/* <button onClick={handleSair}>Sair</button> */}
    </div>
  );
};

export default Home;

const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async (event) => {

  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(!email || !password){
    errorMessage.textContent = "Todos los campos son obligatorios";
    return;
  }

  try{

    const response = await fetch("http://localhost:3000/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({email,password})
    });

    const data = await response.json();

    if(!response.ok){
      errorMessage.textContent = data.message;
      return;
    }

    localStorage.setItem("token",data.token);
    localStorage.setItem("role",data.role);
    localStorage.setItem("loginTime", Date.now());

    window.location.href="dashboard.html";

  }catch(error){

    errorMessage.textContent="Error de conexión con el servidor";

  }

});
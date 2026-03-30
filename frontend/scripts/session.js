function checkSession(){

const token = localStorage.getItem("token");
const loginTime = localStorage.getItem("loginTime");

if(!token){
window.location.href = "/frontend/pages/login.html";
return;
}

const now = Date.now();
const maxSession = 60 * 60 * 1000;

if(now - loginTime > maxSession){

logout();

}

}
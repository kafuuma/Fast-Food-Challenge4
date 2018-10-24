
window.addEventListener("load", start_login);
function start_login(){
    let login = document.getElementById("login");
    login.addEventListener("submit", logIn);
}

function logIn(e){
    e.preventDefault();
    console.log("method login called");
    var email_address= document.getElementById("email2").value;
    var password_ = document.getElementById("password3").value;
   
    user_details = {
            email: email_address,
            password: password_,
    }
fetch(

    
    "http://127.0.0.1:5000/api/v1/auth/login",
    {
        method: "POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(user_details)
    })
    .then(function(res){

        return res.json()
    })
    .then(function(resdata){
        console.log(resdata);
        console.log(resdata["message"]);
        console.log(resdata["Authentication"]);
        if(resdata["message"]=="login successfull"){
            localStorage.setItem("auth-token", resdata["Authentication"]);
            if(resdata["user_role"]=="user"){
                redirect:window.location.replace("./user_order.html")
                showError(resdata["message"], "success");
            }
            if(resdata["user_role"]=="admin"){
                redirect:window.location.replace("./admin.html")
                showError(resdata["message"], "success");  
            }
        }
        else{
            document.getElementById("log2").style.display="block";
            document.getElementById("log1").style.display="none";
            showError(resdata["message"], "error");

        }
    })  
    .catch(function(error){
        console.log(error)
    });
    }
    
    
    function showError(message,className){
        const div = document.createElement("div");
        div.className=className;    
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector("#log2");
        const form = document.querySelector("#login");
        container.insertBefore(div, form);
        setTimeout(function(){
            document.querySelector(`.${className}`).remove();
        },3000);
         
    }

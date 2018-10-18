
var  details;
window.addEventListener("load", start_signup);
function start_signup(){
    let signup = document.getElementById("signup");
    signup.addEventListener("submit", signUp);
}

function signUp(e){
    e.preventDefault();
    console.log("method signup called");
    var name = document.getElementById("full_name").value;
    var phone = document.getElementById("phone").value;
    var email_address= document.getElementById("email1").value;
    var password_ = document.getElementById("password1").value;
    var confirm_password_ = document.getElementById("password2").value;

    user_details = {
            full_name: name,
            contact: phone,
            email: email_address,
            password: password_,
            confirm_password: confirm_password_
    }
fetch(

    
    "http://127.0.0.1:5000/api/v1/auth/signup",
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
      if(resdata["message"] =="signup successfull"){
        document.getElementById("log2").style.display="block";
        document.getElementById("log1").style.display="none";
      }
      else{
        document.getElementById("log2").style.display="none";
        document.getElementById("log1").style.display="block";
      }
      alert(resdata["message"]);
    })  
    .catch(function(error){
        console.log(error)
    });
    }
    
    
    


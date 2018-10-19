
//access token
console.log(localStorage["auth-token"]);

window.addEventListener("load", startMenuActions);
function startMenuActions(){
    let logout = document.getElementById("log-out");
    let addmenu = document.getElementById("addmenu");
    let getmenu = document.getElementById("displaymenu");
    let vieworder = document.getElementById("vieworder");
    let allorders = document.getElementById("allorders");
    let update_status = document.getElementById("status");
    logout.addEventListener("click", logOut, false);
    addmenu.addEventListener("click", add_menu, false);

}

//add menu
function add_menu(e){
    e.preventDefault();
    console.log("add menu called");
    var email_address= document.getElementById("email2").value;
    var password_ = document.getElementById("password3").value;
   
    user_details = {
            email: email_address,
            password: password_,
    }
fetch(
    "http://127.0.0.1:5000/api/v1/menu",
    {
        method: "POST",
        headers:{
            "content-type":"application/json",
            "Authentication":localStorage["auth-token"]
        }
    })
    .then(function(res){

        return res.json()
    })
    .then(function(resdata){
        console.log(resdata);
        console.log(resdata["message"]);
        if(resdata["message"]=="menu successfuly created"){
            localStorage.setItem("auth-token", resdata["Authentication"]);
            if(resdata["user_role"]=="user"){
                redirect:window.location.replace("./user_order.html")
            }
            if(resdata["user_role"]=="admin"){
                redirect:window.location.replace("./admin.html")  
            }
        }
        else{
            document.getElementById("log2").style.display="block";
            document.getElementById("log1").style.display="none";
        }
        alert(resdata["message"]);
    })  
    .catch(function(error){
        console.log(error)
    });
    }

function logOut(){
    localStorage.setItem("auth-token",null);
    console.log(localStorage["auth-token"]);
    redirect:window.location.replace("./signup.html")
}


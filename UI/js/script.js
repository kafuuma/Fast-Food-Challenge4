
window.addEventListener("load",start_up);
function start_up(){
    let signup = document.getElementById("sign_up");
    let signin = document.getElementById("log_in");
    var cart  =  document.getElementById("cart");
    let addmenu = document.getElementById("addmenu");
    var admin_actions = document.getElementById("actions");
    var user_actions = document.getElementById("user_actions")
    var shw_order = document.getElementById("vieworder");
    if (cart){
        cart.addEventListener("click", shwCurt,false)}
    if (signin){
    signup.addEventListener("click", showSignUp, false);}
    if (signup){
    signin.addEventListener("click",showLogin, false);}
    if(admin_actions){
        admin_actions.addEventListener("click", showAdmin_actions,false);
    }
     if(user_actions){
         user_actions.addEventListener("click",showUser_actions,false);
     }
    if(addmenu){
        addmenu.addEventListener("click", show_menu_item, false);
    }

    if(shw_order){
        shw_order.addEventListener("click", show_order,false);
    }
}

function showSignUp()
{
    document.getElementById("log1").style.display="block";
    document.getElementById("log2").style.display="none";
    console.log("signup clicked")
}

function showLogin()
{
    document.getElementById("log2").style.display="block";
    document.getElementById("log1").style.display="none";
    console.log("login clicked");

}

function shwCurt(){
    document.getElementById("cat-box").style.display="block";
    document.getElementById("dropdown").style.display="none";
}

function showAdmin_actions(){
    document.getElementById("dropdown").style.display="block";
    console.log("method show admin actions called");
}

function show_menu_item(){
    document.getElementById("menu-block").style.display="block";
    document.getElementById("dropdown").style.display="none";
    console.log("method add menu called");
}

function show_order(){
    document.getElementById("order-block").style.display="block";
}

function showUser_actions(){
    console.log("method user actions called");
    document.getElementById("dropdown").style.display="block";
    document.getElementById("cat-box").style.display="none";
}




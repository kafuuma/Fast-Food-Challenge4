
window.addEventListener("load",start_up);
function start_up(){
    let signup = document.getElementById("sign_up");
    let signin = document.getElementById("log_in");
    var cart  =  document.getElementById("cart");
    let addmenu = document.getElementById("addmenu");
    var admin_actions = document.getElementById("actions");
    var shw_order = document.getElementById("vieworder");
    if (cart){
        cart.addEventListener("click", shwCurt,false)}
    if (signin){
    signup.addEventListener("click", showSignUp, false);}
    if (signup){
    signin.addEventListener("click",showLogin, false);}
    if(admin_actions){
        admin_actions.addEventListener("click", showAdmin_actions,false);
        console.log(admin_actions)
    }
    if(addmenu){
        addmenu.addEventListener("click", show_menu_item, false);
    }

    if(shw_order){
        shw_order.addEventListener("click", show_order,false);
    }
    console.log(signin);
    console.log(signup);
    console.log(cart);
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



window.addEventListener("load",start_up);
function start_up(){
    let signup = document.getElementById("sign_up");
    let signin = document.getElementById("log_in");
    var cart  =  document.getElementById("cart");
    if (cart){
        cart.addEventListener("click", shwCurt,false)}
    if (signin){
    signup.addEventListener("click", showSignUp, false);}
    if (signup){
    signin.addEventListener("click",showLogin, false);}
    
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


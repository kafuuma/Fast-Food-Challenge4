
//access token
console.log(localStorage["auth-token"]);
let url="http://127.0.0.1:5000/api/v1/menu";

window.addEventListener("load", startMenuActions);
function startMenuActions(){
    let logout = document.getElementById("log-out");
    let addmenu = document.getElementById("add-menu");
    let getmenu = document.getElementById("displaymenu");
    let user_menu = document.getElementById("menu");
    let vieworder = document.getElementById("vieworder");
    let allorders = document.getElementById("allorders");
    let update_status = document.getElementById("status");
    logout.addEventListener("click", logOut, false);
    if(addmenu){
        addmenu.addEventListener("submit", add_menu, false);
    }
   if (getmenu){
    getmenu.addEventListener("click", fetch_all_menu, false);
   }
   if(user_menu){
    user_menu.addEventListener("click", fetch_all_menu, false);   
   }
   

}

//add menu
function add_menu(e){
    e.preventDefault();
    console.log("add menu called");
    var menu_name_= document.getElementById("menu_name").value;
    var menu_price_ = document.getElementById("menu_price").value;
    var desciption_ = document.getElementById("desciption").value;
    var image_ = document.getElementById("image").value;
    menu_data = {
            menu_name: menu_name_,
            menu_price: menu_price_,
            description: desciption_,
            image:image_
    }
    fetch(url,
        {
            method: "POST",
            headers:{
                "content-type":"application/json",
                "Authentication":localStorage["auth-token"]
            },
            body:JSON.stringify(menu_data)
        })
        .then(function(res){

            return res.json()
        })
        .then(function(resdata){
            console.log(resdata);
            console.log(resdata["message"]);
            if(resdata["message"]=="menu successfuly created"){
                document.location.reload();
            }
            else{
                document.getElementById("menu-block").style.display="block";
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

//fetch all menu

function fetch_all_menu(e){
    e.preventDefault();
    console.log("fetch all menu called");
    
    fetch(url,
        {
            method: "GET",
            headers:{
                "content-type":"application/json",
                "Authentication":localStorage["auth-token"]
            }
        })
        .then(function(res){
    
            return res.json()
        })
        .then(function(resdata){
            console.log(resdata["message"]);
            console.log(resdata["menu"]);
            if(resdata["message"]=="successfuly fetched all menu"){
            let menu =resdata["menu"];
            let header = `
            <section class="products" id="float"> 
               <div class="container">
            
            `;
            menu.forEach(function(menu_item){
              header  += `
              <div class="column">
                <img src="${"images/"+menu_item.menu_image}" alt="${menu_item.menu_name}">
                <p class="info">
                    ${menu_item.menu_name}<br>
                    <span>${menu_item.description}</span>
                </p>
                <p class="price">
                    ${menu_item.menu_price+"Ush"}
                    <input type="checkbox" id="${menu_item.menu_id}">
                </p>     
              </div>
                `;
            });
              
            // window.location.reload();
            console.log(document.getElementById("fetch_menu"));
               document.getElementById("fetch_menu").innerHTML = header;
               
               document.getElementById("dropdown").style.display="none";
            }
            else{
                document.location.reload();
                document.getElementById("order-block").innerHTML = resdata["message"];
            }
            alert(resdata["message"]);
        })  
        .catch(function(error){
            console.log(error)
        });
        }



function logOut(){
    localStorage.setItem("auth-token",null);
    redirect:window.location.replace("./signup.html")
}


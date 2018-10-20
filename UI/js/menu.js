
//access token
console.log(localStorage["auth-token"]);
let url="http://127.0.0.1:5000/api/v1/menu";

window.addEventListener("load", startMenuActions);
function startMenuActions(){
    let logout = document.getElementById("log-out");
    let addmenu = document.getElementById("add-menu");
    let getmenu = document.getElementById("displaymenu");
    let vieworder = document.getElementById("vieworder");
    let allorders = document.getElementById("allorders");
    let update_status = document.getElementById("status");
    logout.addEventListener("click", logOut, false);
    addmenu.addEventListener("submit", add_menu, false);
    getmenu.addEventListener("click", fetch_all_menu, false);

}

//add menu
function add_menu(e){
    e.preventDefault();
    console.log("add menu called");
    var menu_name_= document.getElementById("menu_name").value;
    var menu_price_ = document.getElementById("menu_price").value;
    var desciption_ = document.getElementById("desciption").value;

    menu_data = {
            menu_name: menu_name_,
            menu_price: menu_price_,
            description: desciption_
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
    
            <table class="table-data" id="admin-history">
                <thead>
                    <tr>
                        <th>Menu_Id</th>
                        <th>Order</th>
                        <th>Description</th>
                        <th>Menu Price</th>
                    </tr>
                </thead>
                <tbody>
            
            `;
            menu.forEach(function(menu_item){
              header  += `
                <tr>
                    <td>${menu_item.menu_id}</td>
                    <td>${menu_item.menu_name}</td>
                    <td>${menu_item.description}</td>
                    <td>${menu_item.menu_price}</td>
                </tr>
                `;
            });
            let display_menu = header+"</tbody></table>";
              
            //    window.location.reload();
               document.getElementById("fetch_menu").innerHTML = display_menu;
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
    console.log(localStorage["auth-token"]);
    redirect:window.location.replace("./signup.html")
}


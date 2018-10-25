

//access token
console.log(localStorage["auth-token"]);
let url1="https://fastfasatfood.herokuapp.com/api/v1/users/orders";
let url2="https://fastfasatfood.herokuapp.com/api/v1/orders";

window.addEventListener("load", startOrderActions);
function startOrderActions(){
    let logout = document.getElementById("log-out");
    let placeorder = document.getElementById("cat_log");
    let vieworder = document.getElementById("history");
    let allorders = document.getElementById("allorders");
    let singleorder = document.getElementById("singleorder");
    logout.addEventListener("click", logOut, false);
    if(singleorder){
       singleorder.addEventListener("submit",Fetch_single_order, false);
       console.log("single order active");
    }
    if(placeorder){
        placeorder.addEventListener("submit", place_order, false);
    }
    if (vieworder){
        console.log(vieworder)
        vieworder.addEventListener("click", Fetch_orders,false);
    }

    if(allorders){
        allorders.addEventListener("click", Fetch_orders,false);
    }
}

//place order
function place_order(e){
    e.preventDefault();
    let selected = document.querySelectorAll(".checkbox");
    console.log("place_order method called");
    let orders =[];  
    selected.forEach(function(menu_item){
        if (menu_item.checked){
            orders.push(parseInt(menu_item.id));
            console.log(orders);
        }
    }) 
     order_details={"menu_id":orders[0]};
   
    fetch(url1,
        {
            method: "POST",
            headers:{
                "content-type":"application/json",
                "Authentication":localStorage["auth-token"]
            },
            body:JSON.stringify(order_details)
        })
        .then(function(res){
            return res.json()
        })
        .then(function(resdata){
            console.log(resdata["message"]);
            if(resdata["message"]=="successfuly placed food order"){
            // document.getElementById("cat-box").style.display="none";
            showErrorPlacerOrder(resdata["message"],"success_menu_order")
        }
        else{
            showErrorPlacerOrder(resdata["message"],"error_menu_order")
            console.log(resdata["message"]);
        }
        })  
        .catch(function(error){
            console.log(error)
        });
    }

function Fetch_orders(e){
    e.preventDefault();
    console.log("fetch_order method called");
    let order_node_user = document.getElementById("user_orders");
    let order_admin_node = document.getElementById("all_orders");
    if(order_admin_node){
       var url=url2;
    }
    if(order_node_user){
        var url=url1;
    }
    
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
         if(resdata["message"]=="successfully fetched orders"){
                console.log(resdata["orders"]);
                let orders =resdata["orders"];
                if(order_node_user){
                    var header_user = `
            
                        <table class="table-data" id="admin-history">
                            <thead>
                                <tr>
                                <td>Order ID</td>
                                <td>Menu ID</td>
                                <td>Order Satatus</td>
                                <td>Date</td>
                                <td>Delete</td>
                                </tr>
                            </thead>
                            <tbody>
                    
                    `;
                    orders.forEach(function(order){
                        header_user += `
                        </tr>
                            <td  class="order-id">${order.order_id}</td>
                            <td>${order.menu_id}</td>
                            <td>${order.status}</td>
                            <td>9th.Oct.2018</td>
                            <td><button>Trash</button></td>
                        </tr>
                        `;
                    });
                }

                if(order_admin_node){        
                    var header_admin = `
            
                        <table class="table-data" id="admin-history">
                            <thead>
                                <th>Date</th>
                                <th>Order ID</th>
                                <th>Menu ID</th>
                                <th>Email Adress</th>
                                <th>Status</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                    
                    `;
                    orders.forEach(function(order){
                        var status = generate_order_status(order);
                        header_admin += `
                        </tr>
                            <td>9.13.2018</td>
                            <td id_data="order_id">${order.order_id}</td>
                            <td>${order.menu_id}</td>
                            <td>${order.email}</td>
                            <td status_data="status">${status}</td>
                            <td><button class="update-status">Update</button></td>
                        </tr>
                        `;
                    });
                }
            let display_orders_user = header_user+"</tbody></table>";
            let display_orders_admin = header_admin+"</tbody></table>";
                document.getElementById("fetch_menu").style.display="none";
                document.getElementById("dropdown").style.display="none";
                
                if(order_node_user){
                document.getElementById("user_orders").innerHTML = display_orders_user;
                document.getElementById("cat-box").style.display="none";
                document.getElementById("user_orders").style.display="block"
                showError(resdata["message"], "success_menu");
                }
                if(order_admin_node){
                    document.getElementById("signle_order").style.display="none";
                document.getElementById("all_orders").innerHTML = display_orders_admin;
                showError(resdata["message"], "success_menu");
                document.getElementById("all_orders").style.display="block"
                Update_order_status();
                }
                
                document.getElementById("fetch_menu").style.display="none"
                
        }
            else{
                document.getElementById("fetch_menu").style.display="none";
                document.getElementById("dropdown").style.display="none";
                if(document.getElementById("cat-box")){
                document.getElementById("cat-box").style.display="none";
                showError(resdata["message"], "error_menu");
                }
            }
        })  
        .catch(function(error){
            console.log(error)
        });
        
    }
        
function Fetch_single_order(e){
    e.preventDefault();
    console.log("fetch_order method called");
    let signle_order_node = document.getElementById("signle_order");
    var order_id = parseInt(document.getElementById("order-id").value);
    
    fetch(url2+"/"+order_id,
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
            if(resdata["message"]=="successfully fetched order" && resdata["order"].length !=0){
                console.log(resdata["order"]);
                let Order =resdata["order"];
                var status= generate_order_status(Order[0]);
               
                console.log(status);
                    var header_specific = `
            
                        <table class="table-data" id="admin-history">
                            <thead>
                                <th>Date</th>
                                <th>Order ID</th>
                                <th>Menu ID</th>
                                <th>Email Adress</th>
                                <th>Status</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                    
                    `;
                    Order.forEach(function(order){
                        header_specific += `
                        </tr>
                            <td>9.13.2018</td>
                            <td id_data="order_id">${order.order_id}</td>
                            <td>${order.menu_id}</td>
                            <td>${order.email}</td>
                            <td status_data="status">${status}</td>
                            <td><button class="update-status">Update</button></td>
                        </tr>
                        `;
                    });
            
                let display_specific_order = header_specific+"</tbody></table>";
                console.log(display_specific_order)
                document.getElementById("fetch_menu").style.display="none";
                document.getElementById("dropdown").style.display="none";
                document.getElementById("all_orders").style.display="none";  
                document.getElementById("signle_order").style.display="block";
                document.getElementById("order-block").style.display="none";
                document.getElementById("signle_order").innerHTML=display_specific_order;
                showError(resdata["message"], "success_menu");
                Update_order_status();
            }
        
            else{
                document.getElementById("fetch_menu").style.display="none";
                document.getElementById("dropdown").style.display="none";
                document.getElementById("all_orders").style.display="none" 
                document.getElementById("order-block").style.display="none"; 
                showError(resdata["message"], "error_menu"); 
                
            }
        })  
        .catch(function(error){
            console.log(error)
        });
    }

function Update_order_status(){
    console.log("update order status funtion called")
    // e.preventDefault();
    let order_table = document.querySelector("table")
    console.log(order_table)
    order_table.addEventListener("click", function(e){
    var element = e.target, parent;
    if ( element && element.nodeName == "BUTTON" ) {
        parent = element.parentNode
        while ( parent.nodeName != "TR" ) {
            parent = parent.parentNode
    }
    var order_id, child;
    var data = {}
    for ( var i = 0, _len = parent.children.length; i < _len; i++ ) {
        console.log(i)
        child = parent.children[i];
        console.log(child);
        if ( child.hasAttribute("id_data") ) data[child.getAttribute("id_data")] = child.innerText
        if ( child.hasAttribute("status_data") ){
        var select = document.querySelector(".status").selectedOptions;
        var status = select[0].value
        }
    }

            order_id=data["order_id"]
            new_status={"status":status}

    fetch(url2+"/"+order_id,
        {
            method: "PUT",
            headers:{
                "content-type":"application/json",
                "Authentication":localStorage["auth-token"]
            },
            body:JSON.stringify(new_status)
        })
        .then(function(res){
    
            return res.json()
        })
        .then(function(resdata){
            console.log(resdata["message"]);
            showError(resdata["message"], "success_menu");    
        })  
        .catch(function(error){
            console.log(error)
        });
    }

   });
}

function generate_order_status(obj){
   
    let status_string, new_state,pro_state, canc_state, comp_state;
    if(obj.status=="new"){
        new_state="selected", pro_state="", canc_state="",comp_state="";
    }
    if(obj.status=="processing"){
        new_state="",pro_state="selected", canc_state="", comp_state="";
    }
    if(obj.status=="cancelled"){
        new_state="",pro_state="", canc_state="selected", comp_state="";
    }
    if(obj.status=="complete"){
        new_state="",pro_state="", canc_state="", comp_state="selected";
    }
    status_string = `<select class="status"><option value="processing" ${pro_state}>Processing</option>
                     <option value="cancelled" ${canc_state}>Cancelled</option>
                     <option value="complete" ${comp_state}>Complete</option>
                     <option value="new" ${new_state}>New</option></select>
                     `;
    return status_string;
}

function logOut(){
    localStorage.setItem("auth-token",null);
    console.log(localStorage["auth-token"]);
    redirect:window.location.replace("./signup.html")
}

function showError(message,className){
    const div = document.createElement("div");
    div.className=className;    
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector("#res_message");
    const before = document.querySelector("#after");
    container.insertBefore(div, before);
    setTimeout(function(){
        document.querySelector(`.${className}`).remove();
    },3000);
        
}

function showErrorPlacerOrder(message,className){
    console.log("method show error order called")
    const div = document.createElement("div");
    div.className=className;    
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector("#cat-box");
    const before = document.querySelector("#field");
    container.insertBefore(div, before);
    setTimeout(function(){
        document.querySelector(`.${className}`).remove();
    },3000);
        
}
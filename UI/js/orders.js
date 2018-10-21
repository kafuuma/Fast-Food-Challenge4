

//access token
console.log(localStorage["auth-token"]);
let url1="http://127.0.0.1:5000/api/v1/users/orders";
let url2="http://127.0.0.1:5000/api/v1/orders";

window.addEventListener("load", startOrderActions);
function startOrderActions(){
    let logout = document.getElementById("log-out");
    let placeorder = document.getElementById("cat_log");
    let vieworder = document.getElementById("history");
    let allorders = document.getElementById("allorders");
    let update_status = document.getElementById("status");
    logout.addEventListener("click", logOut, false);
    if(placeorder){
        placeorder.addEventListener("submit", place_order, false);
    }
    if (vieworder){
        console.log(vieworder)
        vieworder.addEventListener("click", Fetch_orders,false);
    }

}

//customise it to ordes
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
            document.getElementById("cat-box").style.display="none";
            alert(resdata["message"]);
        }
        else{
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
    fetch(url1,
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
                let header = `
    
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
                header  += `
                </tr>
                    <td>${order.order_id}</td>
                    <td>${order.menu_id}</td>
                    <td>${order.status}</td>
                    <td>9th.Oct.2018</td>
                    <td><button>Trash</button></td>
                </tr>
                `;
            });
            let display_menu = header+"</tbody></table>";
                
                document.getElementById("dropdown").style.display="none";
                document.getElementById("cat-box").style.display="none";
                document.getElementById("user_orders").innerHTML = display_menu;
            }
            else{
                document.getElementById("dropdown").style.display="none";
                document.getElementById("cat-box").style.display="none";
                document.getElementById("user_orders").innerHTML = display_menu;
                document.getElementById("user_orders").innerHTML = resdata["message"];
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

// <!-- <table class="table-data" id="admin-history">
//         <thead>
//             <tr>
//                 <th>Orde_Id</th>
//                 <th>Date</th>
//                 <th>Order</th>
//                 <th>Description</th>
//                 <th>Status</th>
//                 <th>Action</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>001</td>
//                 <td>9.13.2018</td>
//                 <td>Pizza</td>
//                 <td>this is served with 20mls of soda</td>
//                 <td><select name="status" id="status"><option value="Approved">Approved</option>
//                 <option value="Decline">Declined</option><option value="Delivered">Delivered</option>
//                     <option value="Pending" selected>Pending</option></select></td>
//                 <td><button>Trash</button></td>
//             </tr>
//             <tr>
//                 <td>002</td>
//                 <td>10.9.2018</td>
//                 <td>chicken bucket</td>
//                 <td>This is served with 8 peaces of chicken</td>
//                 <td><select id="status"><option value="Approved">Approved</option>
//                 <option value="Decline">Declined</option><option value="Delivered">Delivered</option>
//                     <option value="Pending" selected>Pending</option></select></td>
//                 <td><button>Trash</button></td>
//             </tr>
//             <tr>
//                 <td>002</td>
//                 <td>10.9.2018</td>
//                 <td>chicken bucket</td>
//                 <td>This is served with 8 peaces of chicken</td>
//                 <td><select name="status" id="status"><option value="Approved">Approved</option>
//                     <option value="Decline">Declined</option><option value="Delivered">Delivered</option>
//                         <option value="Pending" selected>Pending</option></select></td>
//                     <td><button>Trash</button></td>
//             </tr>
//             <tr>
//                 <td>002</td>
//                 <td>10.9.2018</td>
//                 <td>chicken bucket</td>
//                 <td>This is served with 8 peaces of chicken</td>
//                 <td><select name="status" id="status"><option value="Approved">Approved</option>
//                     <option value="Decline">Declined</option><option value="Delivered">Delivered</option>
//                     <option value="Pending" selected>Pending</option></select></td>
//                 <td><button>Trash</button></td>
//             </tr>
//         </tbody>
//     </table> -->

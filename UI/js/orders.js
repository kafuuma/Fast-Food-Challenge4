
//customise it to ordes
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
                        <th>Menu img</th>
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
                    <td>${menu_item.menu_image}</td>
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

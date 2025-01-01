var Name = document.querySelector("#Name")
var Category = document.querySelector("#Category")
var Price = document.querySelector("#Price")
var Tax = document.querySelector("#Tax")
var Discount = document.querySelector("#Discount")
var Search = document.querySelector("#Search")
var Count = document.querySelector("#Count")
var ptn = document.querySelector(".ptn")
var Update = document.querySelector(".Update")
var Delete = document.querySelector(".Delete")
var deleteAll = document.querySelector(".deleteAll")
var lab = document.querySelector(".lab")
var span = document.querySelector("span")
var conn = document.querySelector(".conn")


var mood = "createMo"
var tmp;

// grap the data from localStorage 
let data 
if( localStorage.getItem('product')){
   data = JSON.parse( localStorage.getItem("product"))
   displayPro()
}else{
    data = []
}

// create product 
function create(){
var product = {
    Name :Name.value ,
    Category :Category.value ,
    Price :Price.value ,
    Tax :Tax.value ,
    Discount :Discount.value 
}

// update counter 
if( mood == "createMo"){
    if(Count.value > 1){
        for(var c = 0 ; c < Count.value ; c++ ){
            data.push(product)
        }
    }else{
        data.push(product)
    }
}else{
    data[tmp] = product
    mood = "createMo"
    span.innerHTML = "Create"
    Count.style.display = "block"
    conn.style.display = "flex"
}

localStorage.setItem("product" , JSON.stringify(data))
displayPro();
clear();
}

// display producs created 
function displayPro(){
    var item = ""
    var ID = 0

    for( var i = 0 ; i < data.length ; i++){
        item += `
        <tr>
        <td>${++ID}</td>
        <td>${data[i].Name}</td>
        <td>${data[i].Category}</td>
        <td>${data[i].Price}</td>
        <td>${data[i].Tax}</td>
        <td>${data[i].Discount}</td>
        <td>  <div class="pot">
            <div class="Update" onclick="updatePro(${i})">
                <span>Update</span>
            </div>
        </div></td>
        <td>  <div class="pot">
            <div class="Delete">
                <span onclick="deletePro(${i})">Delete</span>
            </div>
        </div></td>
    </tr>
        `
        
    }
    document.querySelector("tbody").innerHTML = item

    if(data.length > 0){
        deleteAll.innerHTML = `<button onclick="dall()">Delete All</button>`
    }else{
        deleteAll.innerHTML = ``
    }
    
}

// clear inputs 
function clear() {
    Name.value = ""
    Category.value = ""
    Price.value = ""
    Tax.value = ""
    Discount.value = ""
    Count.value = ""
}

// delete the product 
function deletePro(lol) {
    if(data.length > 0){

        data.splice( lol , 1)
        localStorage.setItem("product" , JSON.stringify(data))
        displayPro();
    }else{
        data.splice( -1 )
        localStorage.setItem("product" , JSON.stringify(data))
        displayPro()
    }
    }

    // update the product 
function updatePro(i){
    Name.value = data[i].Name
    Category.value = data[i].Category
    Price.value = data[i].Price
    Tax.value = data[i].Tax
    Count.style.display = "none"
    lab.style.display = "none"
    conn.style.display = "none"
    Discount.value = data[i].Discount
    mood = "updateMo"
    span.innerHTML = "Update"
    tmp = i
    scroll({
        top:0,
        behavior: "smooth"
    })
}
// search by name or category 
Search.onkeyup = function(){
    var item = ""
    var ID = 0
    for( var i = 0 ; i < data.length ; i++){
        if( data[i].Name.toLowerCase().includes( Search.value.toLowerCase() ) || data[i].Category.toLowerCase().includes( Search.value.toLowerCase() ) ){
            item += `
            <tr>
            <td>${++ID}</td>
            <td>${data[i].Name}</td>
            <td>${data[i].Category}</td>
            <td>${data[i].Price}</td>
            <td>${data[i].Tax}</td>
            <td>${data[i].Discount}</td>
            <td>  <div class="pot">
                <div class="Update" onclick="updatePro(${i})">
                    <span>Update</span>
                </div>
            </div></td>
            <td>  <div class="pot">
                <div class="Delete">
                    <span onclick="deletePro(${i})">Delete</span>
                </div>
            </div></td>
        </tr>
            `
            


        }
    }
    document.querySelector("tbody").innerHTML = item
}


// delete all products
function dall(){
    localStorage.clear()
    data.splice(0)
    localStorage.clear()
    displayPro()
}
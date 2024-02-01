// add form
var addform = document.getElementById("addform") 
var pname = document.getElementById("name")
var price = document.getElementById("price")
var des = document.getElementById("des")
var img = document.getElementById("img")
var fullImageadd = document.getElementById("fullImageadd")
//////////////////////////////////////////////
// update form
var updateform = document.getElementById("updateform")
var updatename = document.getElementById("updatename")
var updateprice = document.getElementById("updateprice")
var updatedes = document.getElementById("updatedes")
var updateimg = document.getElementById("updateimg")
var updateID = document.getElementById("updateID")
var fullImage = document.getElementById("fullImage")
///////////////////////////////////////////////
var t_body = document.getElementById("tbody")
///////////////////////////////////////////////
addform.addEventListener("submit",(e)=>{
    e.preventDefault()


    var products = JSON.parse(localStorage.getItem("products")) // data from local storage // not null or 0 or "" => []
    
    
    
    
    var data = {name:pname.value,price:price.value,des:des.value,img:img.files[0].name} // data from add form
    
    
    
    
    
    
    
    console.log(img.files[0].name);
    // if(products){
    //     products.push(data)
    // }else{
    //     products = [data]
    // }
    // localStorage.setItem("products",JSON.stringify(products) )

    alert("your item has been added")
    pname.value = ""
    price.value = ""
    des.value = ""
    img.value = ""

    view()
})


function view(){

    t_body.innerHTML=""
// fetch => result = products
    let products = JSON.parse(localStorage.getItem("products"))
    


    products.forEach((elem,i)=>{
        t_body.innerHTML += `
        <tr>
            <td>${i+1}</td>
            <td>${elem.name}</td>
            <td>${elem.price}</td>
            <td>${elem.des}</td>
            <td>
                <img class="table-img" src="assets/img/${elem.img}" alt="" width="80px">
            </td>
            <td>
                <div class="btn-group-vertical">
                    <button class="btn btn-danger" onclick="del(${i})">delete</button>
                    <button class="btn btn-primary" onclick="productData(${i})" data-bs-toggle="modal" data-bs-target="#exampleModal">update</button>
                </div>
            </td>
        </tr>
        `
    })
}

view()

 

function del(id){
    var products = JSON.parse(localStorage.getItem("products"))
    products.splice(id,1)
    localStorage.setItem("products",JSON.stringify(products))
    view()
}

function productData(id){
    var products = JSON.parse(localStorage.getItem("products"))
    updatename.value = products[id].name
    updateprice.value = products[id].price
    updatedes.value = products[id].des
    updateID.value = id
    updateimg.value = ""//input

    fullImage.setAttribute("src",`assets/img/${products[id].img}`)//img
    

}


updateform.addEventListener("submit",(e)=>{
    e.preventDefault()
    var products = JSON.parse(localStorage.getItem("products"))
    var data = {name:updatename.value,price:updateprice.value,des:updatedes.value,img:products[updateID.value].img}
    if(updateimg.value){
        data.img = updateimg.files[0].name
    }
    products[updateID.value] = data
    localStorage.setItem("products",JSON.stringify(products))
    updatename.value = ""
    updateprice.value = ""
    updatedes.value = ""
    updateID.value = ""
    updateimg.value = ""
    view()
})

updateimg.addEventListener("change",(e)=>{
    console.log(e.target.files[0])
    fullImage.setAttribute("src",`assets/img/${e.target.files[0].name}`)
})

img.addEventListener("change",(e)=>{
    console.log(e.target.files[0])
    fullImageadd.setAttribute("src",`assets/img/${e.target.files[0].name}`)
})






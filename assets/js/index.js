var cardRow = document.getElementById("cardRow")
var cartNumber = document.getElementById("cartNumber")

var products = JSON.parse(localStorage.getItem("products"))







products.forEach((elem,i)=> {
    cardRow.innerHTML += `
    <div class="col-lg-3 col-md-4 col-6 p-3">
        <div class="card" >
            <img src="assets/img/${elem.img}" class="card-img-top img-test" alt="...">
            <div class="card-body">
            <h5 class="card-title">${elem.name}</h5>
            <h6 class="card-subtitle">${elem.price} EGP</h6>                      
            <p class="card-text">${elem.des}</p>
            <button onclick="add(${i})" class="btn btn-primary">Add to cart</button>
            </div>
        </div>
    </div>
    `
})

function add(id){
    var cart = JSON.parse(localStorage.getItem("cart")) 
    var data = {id:id,Quantity:1} 
    // [{id:1,Q:5},{id:10,Q:20}]=>[1,10] .indexOf()
    if(cart){
        var index = cart.map(el=>{return el.id}).indexOf(id)
        if(index == -1){
            cart.push(data)
        }else{
            cart[index].Quantity++
        }
    }else{
        cart = [data]
    }
    localStorage.setItem("cart",JSON.stringify(cart) )
    cartNumber.innerHTML = cart.length
}


var cart = JSON.parse(localStorage.getItem("cart")) 
if(cart){
    cartNumber.innerHTML = cart.length
}else{
    cartNumber.innerHTML = 0
}

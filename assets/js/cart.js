var cartNumber = document.getElementById("cartNumber")
var tbody = document.getElementById("tbody")
var plusBtn = document.querySelectorAll("[data-add]")
var subBtns = document.querySelectorAll("[data-sub]")
var input = document.querySelectorAll("[data-change]")
var totalItems = document.getElementById("totalItems")
var addedfee = document.getElementById("addedFee")
var totalCost = document.getElementById("totalCost")
var apply = document.getElementById("apply")
var promoInput = document.getElementById("promoInput")

var cost = 0;
var promo = { "ali": 10 , "moh": 5, "amr": 20, "we2": 15} 

var cart = JSON.parse(localStorage.getItem("cart")) 
if(cart){
    cartNumber.innerHTML = cart.length
}else{
    cartNumber.innerHTML = 0
}

var products = JSON.parse(localStorage.getItem("products"))

function show(){
    var products = JSON.parse(localStorage.getItem("products"))
    var cart = JSON.parse(localStorage.getItem("cart")) 

    tbody.innerHTML = ""
    cart.forEach((elem,i) => {
    
    
        tbody.innerHTML += `<tr>
        <td>
          <div class="row">
            <div class="col-6">
              <img class="img-test" src="assets/img/${products[elem.id].img}" alt="">
            </div>
            <div class="col-6" style="text-align: start;">
              <h5>${products[elem.id].name}</h5>
            </div>
          </div>
        </td>
    
        <td>${products[elem.id].price}$</td>
    
        <td class="td-width">
          <div class="row ">
            <div class="col-4"><button data-add="${i}" class="btn btn-primary fw-bolder Qbtn"><i class="bi bi-plus-lg"></i></button></div>
            <div class="col-4"><input  data-change="${i}" type="number" class="form-control w-100" value="${elem.Quantity}"></div>
            <div class="col-4"><button data-sub="${i}" class="btn btn-primary fw-bolder Qbtn"><i class="bi bi-dash"></i></button></div>
          </div>
        </td>
    
        <td>${products[elem.id].price * elem.Quantity}$</td>
    
      </tr>`
    });

    plusBtn = document.querySelectorAll("[data-add]") //=> [+ , + ]
    input = document.querySelectorAll("[data-change]")
    subBtns = document.querySelectorAll("[data-sub]")

    plusBtn.forEach(elem=>{
      elem.addEventListener("click",e=>{
        var cart = JSON.parse(localStorage.getItem("cart"))
        var id
        if(e.target.tagName == "I"){
          id = e.target.parentNode.dataset.add
        }else{
          id = e.target.dataset.add
        }
        
        cart[id].Quantity++ 
    
        localStorage.setItem("cart",JSON.stringify(cart))
    
        show()
    
      })
    })

    subBtns.forEach(elem=>{
      elem.addEventListener("click",e=>{
        var cart = JSON.parse(localStorage.getItem("cart"))
        var id
        if(e.target.tagName == "I"){
          id = e.target.parentNode.dataset.sub
        }else{
          id = e.target.dataset.sub
        }
        
        cart[id].Quantity-- 
        if(cart[id].Quantity == 0){
          cart.splice(id,1)
        }
    
        localStorage.setItem("cart",JSON.stringify(cart))
    
        show()
    
      })
    })

    input.forEach(elem=>{
      elem.addEventListener("change",e=>{
        var cart = JSON.parse(localStorage.getItem("cart")) 
    
        cart[e.target.dataset.change].Quantity = e.target.value 
    
        if(cart[e.target.dataset.change].Quantity == 0){
          cart.splice(e.target.dataset.change,1)
        }
        localStorage.setItem("cart",JSON.stringify(cart))
    
        show()
    
    
      })
    })
    order()
}
show()


function order(){
  var cart = JSON.parse(localStorage.getItem("cart"))
  var products = JSON.parse(localStorage.getItem("products"))
  var total = 0
  

  cart.forEach(elem=>{
    total += ( elem.Quantity * products[elem.id].price)
  })


  totalItems.innerHTML = total+"$"
  cost = total + parseInt(addedfee.value) 
  totalCost.innerHTML = cost+"$"
}
//////////////////////
addedfee.addEventListener("change",e=>{
  order()
})
///////////////////////
apply.addEventListener("click",(e)=>{
  var code = promoInput.value
  if(promo[code]){
    console.log(cost);
    var disc = cost * promo[code] / 100
    var newCost = cost - disc 
    totalCost.innerHTML = newCost+"$"

  }else{
    totalCost.innerHTML = cost+"$"
  }

})


// function changeQ(i){
//     var cart = JSON.parse(localStorage.getItem("cart")) 
//     var input = document.getElementById("cart"+i)

//     cart[i].Quantity = input.value 

//     if(cart[i].Quantity == 0){
//       cart.splice(i,1)
//       console.log("hi");
//     }
//     localStorage.setItem("cart",JSON.stringify(cart))

//     show()

// }
// function add(i){
//     var cart = JSON.parse(localStorage.getItem("cart")) 

//     cart[i].Quantity++ 

//     localStorage.setItem("cart",JSON.stringify(cart))

//     show()

// }

// function sub(i){
//     var cart = JSON.parse(localStorage.getItem("cart")) 

//     cart[i].Quantity--  
//     if(cart[i].Quantity == 0){
//       cart.splice(i,1)
//       console.log("hi");
//     }

//     localStorage.setItem("cart",JSON.stringify(cart))

//     show()

// }


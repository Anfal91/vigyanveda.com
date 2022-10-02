let label = document.getElementById("cart-label")
let shoppingCart = document.getElementById("shopping-cart")

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
    

    let cartIcon2 = document.getElementById("cartAmount2");
    cartIcon2.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
};
calculation();

let allCartItem = document.getElementById("allCartItem");

let generateCartItem = ()=>{
    if(basket.length !== 0){
        return (allCartItem.innerHTML = basket.map((x)=>{
            let{id,item} = x;
            let search = kitItemData.find((y)=>y.id === id) || [];
            return `
                <tr>
                    <td id="cartName" class="align-middle"><img src=${search.Image} alt="" style="width: 50px;">${search.name}</td>
                    <td class="align-middle">$${search.price}</td>
                    <td class="align-middle">
                        <div class="input-group quantity mx-auto" style="width: 100px;">
                            <div class="input-group-btn">
                                <button id="minusBtn" onclick="minus(${id})" class="btn btn-sm btn-primary btn-minus" >
                                <i class="fa fa-minus"></i>
                                </button>
                            </div>
                            <label class="form-control form-control-sm bg-secondary border-0 text-center" id=${id}>${item}</label>
                            <div class="input-group-btn">
                                <button id="plusBtn" onclick="plus(${id})" class="btn btn-sm btn-primary btn-plus">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </td>
                    <td class="align-middle">$${item*search.price}</td>
                    <td class="align-middle"><button onclick="removeItem(${id})" class="btn btn-sm btn-danger"><i class="fa fa-times"></i></button></td>
                </tr>
            
            `;
            
        }).join(""));
     }
    else{
        shoppingCart.innerHTML = ``;
        label.innerHTML =  `
        <h2>Cart is empty</h2>
        `;
    }
}
generateCartItem();

let plus = (id)=> {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id:selectedItem.id,
            item: 1
        });
    }
    else{
        search.item += 1;
    }
    // console.log(basket);
    result(selectedItem.id);
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
};

let minus = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined) return;
    else if (search.item === 0)return;
    else{
        search.item -= 1;
    }

    result(selectedItem.id);
    basket = basket.filter((x)=> x.item !==0);
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
};

let result = (id) =>{
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let removeItem = (id)=> {
    let selectedItem = id;
    basket = basket.filter((x)=>x.id !== selectedItem.id);
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
};

let finalResult = document.getElementById("finalResult");
let totalResult = document.getElementById("totalResult");
let totalAmount = ()=>{

    if(basket.length !==0){
        let amount = basket.map((x)=>{
            let {item, id} = x;
            let search = kitItemData.find((y)=>y.id === id) || [];
            return item * search.price;
        }).reduce((x,y)=>x+y,0);
            finalResult.innerHTML=`
        </div>
        <div class="border-bottom pt-3 pb-2">
            <div class="d-flex justify-content-between mb-3">
                <h6>Subtotal</h6>
                <h6 id="subTotal">$${amount}</h6>
            </div>
            <div class="d-flex justify-content-between">
                <h6 class="font-weight-medium">Shipping</h6>
                <h6 class="font-weight-medium">$10</h6>
            </div>
        </div>
        <div class="pt-2">
            <div class="d-flex justify-content-between mt-2">
                <h5>Total</h5>
                <h5 id="ckoutGrandTotal">$${amount+10}</h5>
            </div>
        </div>
            `
        }
        else return;
        
    };
totalAmount();
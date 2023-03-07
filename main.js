let allProductData=[];
let searchInput=document.querySelector("#search");
let produts=document.querySelector(".ptoducts-center");
const btns=document.querySelectorAll(".btn");
const filter={
    searchItem:"",
}

document.addEventListener("DOMContentLoaded",()=>{
    axios
    .get("http://localhost:3000/items")
    .then((res) =>{
        allProductData=res.data;
        renderProducts(allProductData,filter);
    })
    .catch((err) => console.log(err));
});

function renderProducts(_products,_filters){
    const filteredProducts=_products.filter((e)=>{
    return e.title.toLowerCase().includes(_filters.searchItem.toLowerCase());  
    });
    produts.innerHTML="";
    filteredProducts.forEach((item,index) => {
        const productsDiv=document.createElement("div");
        productsDiv.classList.add("product");
        productsDiv.innerHTML=`
        <img src=${item.image} class="img-container" alt=${index} >
                <div class="product-desc">
                    <p class="product-price">${item.price} $</p>
                    <p class="product-title">${item.title}</p>
                </div> `;
        produts.appendChild(productsDiv);
    });
}

searchInput.addEventListener("input", (e)=>{

    filter.searchItem=e.target.value;
    renderProducts(allProductData,filter);
})

btns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        const filter1=e.target.dataset.filter;
        filter.searchItem=filter1;
        renderProducts(allProductData,filter);
    })
})
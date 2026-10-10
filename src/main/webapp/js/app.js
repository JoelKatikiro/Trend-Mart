const demoProducts = [
 {id:1,name:"Everyday Carry Tote",category:"Style",price:899,image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80",tag:"Everyday"},
 {id:2,name:"Soft Form Ceramic Vase",category:"Home",price:1249,image:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80",tag:"Bestseller"},
 {id:3,name:"Weekend Classic Sneakers",category:"Style",price:2499,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",tag:"Just in"},
 {id:4,name:"Desk Companion Lamp",category:"Home",price:1799,image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",tag:"Good light"},
 {id:5,name:"Wireless Sound Buds",category:"Tech",price:2199,image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=80",tag:"On the go"},
 {id:6,name:"The Daily Shoulder Bag",category:"Style",price:1599,image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",tag:"A favourite"},
 {id:7,name:"Little Moment Mug Set",category:"Home",price:749,image:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80",tag:"Made for slow"},
 {id:8,name:"Pocket Speaker",category:"Tech",price:1999,image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80",tag:"Play it loud"}
];
const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
let products=demoProducts, category="All", cart=readCart(), toastTimer;
function readCart(){try{return JSON.parse(localStorage.getItem("trendmart-cart")||"[]")}catch{return []}}
function saveCart(){localStorage.setItem("trendmart-cart",JSON.stringify(cart));renderCart()}
function notify(message){$("toast").textContent=message;$("toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),2200)}
function renderProducts(){
 const term=$("search").value.trim().toLowerCase();
 const shown=products.filter(p=>(category==="All"||p.category===category)&&`${p.name} ${p.category} ${p.tag}`.toLowerCase().includes(term));
 $("result-count").textContent=`${shown.length} ${shown.length===1?"find":"finds"} to explore.`;
 const grid=$("product-grid");grid.replaceChildren();
 if(!shown.length){const empty=document.createElement("p");empty.className="empty-results";empty.textContent="No matches just yet. Try another search or category.";grid.append(empty);return}
 shown.forEach(p=>{
  const card=document.createElement("article");card.className="product-card";
  const visual=document.createElement("div");visual.className="product-image-wrap";
  const img=document.createElement("img");img.className="product-image";img.src=p.image;img.alt=p.name;img.loading="lazy";img.onerror=()=>{img.style.visibility="hidden"};
  const tag=document.createElement("span");tag.className="product-tag";tag.textContent=p.tag;
  const add=document.createElement("button");add.className="add-button";add.type="button";add.textContent="+";add.setAttribute("aria-label",`Add ${p.name} to bag`);add.onclick=()=>addToCart(p.id);
  visual.append(img,tag,add);
  const info=document.createElement("div");info.className="product-info";
  const top=document.createElement("div");top.className="product-info-top";
  const details=document.createElement("div");const name=document.createElement("h3");name.textContent=p.name;const cat=document.createElement("p");cat.className="product-category";cat.textContent=p.category;details.append(name,cat);
  const price=document.createElement("span");price.className="product-price";price.textContent=money(p.price);top.append(details,price);info.append(top);card.append(visual,info);grid.append(card);
 });
}
function addToCart(id){const p=products.find(x=>x.id===id);if(!p)return;const item=cart.find(x=>x.id===id);if(item)item.quantity++;else cart.push({id,quantity:1});saveCart();notify(`${p.name} added to your bag`)}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.quantity,0);$("cart-count").textContent=count;$("drawer-count").textContent=`(${count})`;
 const box=$("cart-items");box.replaceChildren();let subtotal=0;
 if(!cart.length){const p=document.createElement("p");p.className="cart-empty";p.textContent="Your bag is taking a little breather. Find something you love and add it here.";box.append(p)}
 cart.forEach(item=>{const p=products.find(x=>x.id===item.id);if(!p)return;subtotal+=p.price*item.quantity;
  const row=document.createElement("div");row.className="cart-item";const img=document.createElement("img");img.src=p.image;img.alt="";
  const details=document.createElement("div");const name=document.createElement("h3");name.textContent=p.name;const price=document.createElement("p");price.textContent=money(p.price);const qty=document.createElement("div");qty.className="qty-controls";
  const minus=document.createElement("button");minus.textContent="−";minus.setAttribute("aria-label","Decrease quantity");minus.onclick=()=>changeQty(item.id,-1);
  const number=document.createElement("span");number.textContent=item.quantity;const plus=document.createElement("button");plus.textContent="+";plus.setAttribute("aria-label","Increase quantity");plus.onclick=()=>changeQty(item.id,1);qty.append(minus,number,plus);details.append(name,price,qty);
  const remove=document.createElement("button");remove.className="remove-item";remove.textContent="Remove";remove.onclick=()=>{cart=cart.filter(x=>x.id!==item.id);saveCart()};row.append(img,details,remove);box.append(row);
 });
 $("cart-subtotal").textContent=money(subtotal);
}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.quantity+=delta;if(item.quantity<1)cart=cart.filter(x=>x.id!==id);saveCart()}
function openCart(){$("cart").classList.add("open");$("cart").setAttribute("aria-hidden","false");$("cart-backdrop").hidden=false;$("cart-close").focus()}
function closeCart(){$("cart").classList.remove("open");$("cart").setAttribute("aria-hidden","true");$("cart-backdrop").hidden=true;$("cart-open").focus()}
document.querySelectorAll("[data-category]").forEach(btn=>btn.addEventListener("click",()=>{category=btn.dataset.category;document.querySelectorAll("[data-category]").forEach(b=>b.classList.toggle("active",b===btn));renderProducts()}));
$("search").addEventListener("input",renderProducts);$("cart-open").addEventListener("click",openCart);$("cart-close").addEventListener("click",closeCart);$("cart-backdrop").addEventListener("click",closeCart);document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("cart").classList.contains("open"))closeCart()});
$("checkout-button").addEventListener("click",()=>{$("checkout-message").textContent=cart.length?"This is a demo only — checkout and payment are not connected.":"Add an item to your bag before continuing."});
$("newsletter-form").addEventListener("submit",e=>{e.preventDefault();$("newsletter-message").textContent="Thanks! Newsletter signup is a demo and your address was not saved.";e.target.reset()});
$("menu-toggle")?.addEventListener("click",()=>{$("nav-links").classList.toggle("open")});
async function loadProducts(){try{const response=await fetch("api/products",{headers:{Accept:"application/json"}});if(!response.ok)throw new Error("API unavailable");const data=await response.json();if(!Array.isArray(data))throw new Error("Unexpected API response");products=data.map(p=>({id:Number(p.id),name:String(p.name),category:p.category||"Other",price:Number(p.price),image:p.image||"",tag:"From the catalogue"}));}catch{products=demoProducts;}renderProducts();renderCart()}
$("year").textContent=new Date().getFullYear();loadProducts();
// GitHub Pages falls back to demo products because it cannot run Java Servlets or MySQL.

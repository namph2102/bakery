productDetail()
async function productDetail() {
    const id = window.location.search.slice(4) || 1;
    const res__products = await fetch(API_PRODUCTS);
    const API = await res__products.json();
    const res__kind = await fetch(API_KIND)
    const kinds = await res__kind.json();

    const item = API.find(item => {
        return item.id == id;
    })
    $$('.product__status').innerHTML = item.status ? 'Còn hàng' : 'Hết hàng';
    $$('.product__material').innerHTML = item.material.join(', ');
    $$('.product__price').innerHTML = coverPrice(item.priceSale) + 'đ';
    $$('.image__avata').src = item.avatar;
    $$('.product__detail--footer_des').innerHTML=item.des;

    const kind=kinds.find(kind=>kind.id==item.kind);
    $$('.product__navition--kind').innerHTML=` / ${kind.title} / `;
    $$('.product__navition--kind').href+=kind.id;
    $$('.product__des--name').innerHTML=item.name;
    $$('.product__navition--name').innerHTML=item.name;
    $$('.product__buying').onclick = () => {
        console.log('sadsad');
        if (carts.check(id)) {
            carts.update(id, 1);
        }
        else {
            carts.add(id);
        }
        showKind(API.filter(item=>item.id==id).kind);
        HandleCart();
        $$('#modal__cart').classList.remove("hidden");
    }
    await showProductsViewHome(4,item.kind);
    $$('.products__kind--title').innerHTML = 'Sản phẩm tương tự';
}
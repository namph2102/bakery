
export const title = 'Giỏ Hàng'
export const head = 'Trang chủ'

function moduleShowCart(carts = []) {

    let total = 0;
    const vat = 5;
    console.log(carts);
    const html = carts.map(item => {
        const size = item?.size.toLowerCase();
        const { id, name, avatar, priceSale, priceOrigin, amount } = item;
        total += amount * priceSale;
        return `<div class="table__content--item">
        <a href="/asset/html/productDetail.html?id=${id}" class="table__content--product">
            <figure>
                <img src="${avatar}" alt="${name}">
            </figure>
            <div class="table__content--product__des">
                <div class="product__des--name">
                ${name}
                </div>
                <div class="product__des--price">
                    <span>${coverPrice(priceSale)} đ</span> <del class="text-danger ms-2">${coverPrice(priceOrigin)} đ</del>
                </div>
            </div>
        </a>
        <div class="table__content--amount">
            <div class="table__content--quantity__contain">
                <button data-id="${id}" data-type="decrease" class="handleAmountCart"><i class="fa-solid ${amount <= 1 ? 'fa-trash-can' : 'fa-minus'}"></i></button>
                <input class="table__content--quantity__amount" type="text" readonly="" value="${amount}">
                <button data-id="${id}" data-type="increase" class="handleAmountCart"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div class="table__content-size">
            <div class="table__content--size__contain" data-id="${id}">
                <input type="radio" ${size == 's' && 'checked'}  name="size${id}" id="sizes${id}"> <label for="sizeS${id}">S</label>
                <input type="radio" ${size == 'l' && 'checked'}  class="ms-3" name="sizem${id}" id="sizeM${id}"> <label class="me-3" for="sizeM${id}">M</label>
                <input type="radio"  ${size == 'm' && 'checked'}  name="size${id}" id="sizel${id}"> <label for="sizeL${id}">L</label>
            </div>
        </div>
        <div class="table__content--total">
            <div class="table__content--total__contain">
                ${coverPrice(amount * priceSale)} đ
            </div>
        </div>
    </div>`;
    }).join('');
    $$('.table__content--body').innerHTML = html;
    $$('.box_bill_pay-subtotal_coin').textContent = coverPrice(total) + ' đ';
    $$('.box_bill_pay-subtotal_vat').textContent = vat + ' %';
    $$('.box_bill_pay-total_coin').textContent = coverPrice(total * (1 + vat / 100)) + ' đ'
}
export default moduleShowCart;
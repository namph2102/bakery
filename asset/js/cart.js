// import showProductCart from './module.js';

import * as module from './module.js';


async function showPageCartBag() {
    await showProductsViewHome(0, 1);
    HandleCart();
    handleHearts();
    module.default(carts.show());
    const totalPrice = $$('.box_bill_pay-subtotal_coin');
    document.querySelector('.table__content--body')
        .addEventListener('click', function (e) {
            if (e.target.closest('button')) {
                const parentElement = e.target.closest('button');
                const id = parentElement.dataset.id;
                const inputEle = parentElement.parentNode.querySelector('input');
                let amounts = Number(inputEle.value);
                const boxItem = parentElement.closest('.table__content--item');
                let totalOrder = coverNumber(totalPrice.innerHTML.trim()) / 1000;
                console.log(totalOrder);
                const { priceSale } = API.find(item => item.id == id);
                if (parentElement.dataset.type == 'increase') {
                    if (amounts >= 10) return;
                    ++amounts;
                    totalOrder += priceSale;
                    if (amounts == 2) parentElement.parentNode
                        .firstElementChild.innerHTML =
                        `<i class="fa-solid fa-minus"></i>`;

                    carts.update(id, 1);
                } else {
                    --amounts;
                    if (amounts == 1) {
                        parentElement.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
                    }
                    carts.update(id, -1);
                    totalOrder -= priceSale;
                }
                if (amounts <= 0) {
                    carts.delete(id);
                    boxItem.classList.add('hidden');
                }
                console.log(totalOrder);
                totalPrice.innerHTML = coverPrice(totalOrder) + ' đ';
                $$('.box_bill_pay-total_coin').textContent = coverPrice(totalOrder * 1.05) + ' đ';
                boxItem.querySelector('.table__content--total__contain').textContent = coverPrice(amounts * priceSale) + ' đ';
                inputEle.value = amounts;

            }
        })

    document.querySelector('.modal__body--product__list')
    .addEventListener('click',function(e){
        if (e.target.closest('button')) {
            module.default(carts.show());
        }
    })

}
showPageCartBag();  

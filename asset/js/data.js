
const URL_BANNER = "./asset/json/banner.json"
const API_PRODUCTS = './asset/json/products.json';
const API_KIND = './asset/json/kind.json';
const totalBox = $$(".modal__body__add--total .total__cart");
const totalCart = $$('.header__products-cart__count');
const modal__container_cart = $$("#modal__cart");
let API = [];


// show san phẩm ở modal
function showProductModal({ name, avatar, priceOrigin, priceSale, des }) {
    const box_reducer = $$(".modal__product__view--reducer");
    box_reducer.classList.remove("hidden");
    $$("#productName").innerHTML = name;
    $$(".product__views-des__price--sale").innerHTML = coverPrice(priceSale) + " đ";
    $$("del.product__views-des__price--origin").innerHTML = (priceOrigin > priceSale) ? coverPrice(priceOrigin) + " đ" : "";
    $$(".product__views--item__des").innerHTML = des;
    // $$(".modal__item--product_size").innerHTML;
    const redusePrice = percentReduce(priceOrigin, priceSale);
    if (redusePrice) box_reducer.innerHTML = `-${redusePrice} %`
    else box_reducer.classList.add("hidden")

    $$(".product-modal--avata").src = avatar;
    $$(".modal__dialog").classList.remove("hidden");
}

//Show trang tin tuc 
function showNewsHomePage(len = 3) {
    fetch("/asset/json/news.json")
        .then(res => res.json())
        .then(news => {
            if (news.length > len) news.length = len;
            const HTML__NEWS = news
                .map(newItem => {
                    const { date, name, des, avata } = newItem;
                    return ` <div class="news__item col-lg-4 col-6">
            <a class="news__item--link__container" href="">
                <figure>
                    <div class="news__item--box__avata">
                        <img src="${avata}" alt="${name}">
                    </div>
                    <figcaption>
                        <h4 class="news__item--title"><a href="http://">${name}</a></h4>
                        <p class="news__item--des">${des}</p>
                    </figcaption>
                    <div class="overlay_news">

                    </div>
                    <div class="news__item---open">
                    ${date}
                    </div>
                </figure>
            </a>

            <div class="news__item--seeall">
                <a href="">Xem Thêm ...</a>
            </div>
        </div>`
                }).join("");
            $$("#news").innerHTML = HTML__NEWS;
        })
}
fetch(URL_BANNER)
    .then(res => res.json())
    .then(banners => {
        // show banner sliders
        const HTML_BANNER = banners.map((banner, index) => `<figure>
            <img class="slider" src="${banner}"  alt="Slider ${index} - HT Bakery">
        </figure>
        `).join("");
        $$('.banner_sliders').innerHTML = HTML_BANNER;

        const lengthBanner = banners.length;
        // button sliders
        let HTML_BTN_BANNER = '';
        for (const i in banners) {
            HTML_BTN_BANNER += ` <button class="btn_banner ${i == 0 ? "active" : ""}"></button>`;
        }
        $$('.presentation__sliders').innerHTML = HTML_BTN_BANNER;
        banner_sliders(lengthBanner);
    })

// Banner slider
const banner_sliders = (lengthBanner = 0) => {
    const btn_left = $$('.btn_silder_left');
    const btn_right = $$('.btn_silder_right');
    const slider_buttons = $$l('.presentation__sliders button');
    const timeSlide = 6000;
    let slider_id_change = setTimeout(() => {
        btn_right.click();
    }, timeSlide)
    const banners = {
        isIndex: 0,
        autoplaySpeed: timeSlide,
        setBannerActive(index) {
            slider_buttons[this.isIndex].classList.remove('active');
            slider_buttons[index].classList.add('active');
            this.isIndex = index;
            clearTimeout(slider_id_change);
            slider_id_change = setTimeout(() => {
                btn_right.click();
            }, this.autoplaySpeed)
        }
    }

    $(document).ready(function () {
        $('.banner_sliders').slick({
            dots: true,
            speed: 1000,
        });
        const stickDots = $$l('.slick-dots li');

        // banner slider left right button
        btn_left.onclick = () => {
            $$(".slick-prev").click();
            const index_current_pre = banners.isIndex - 1;
            banners.setBannerActive(
                (index_current_pre < 0) ? lengthBanner - 1 : index_current_pre
            );
        }
        btn_right.onclick = () => {
            $$(".slick-next").click();
            const index_current = banners.isIndex + 1;
            banners.setBannerActive(
                (index_current >= lengthBanner) ? 0 : index_current
            );
        }
        // banner slider with  index button
        slider_buttons.forEach((buttonSlider, index) => {
            buttonSlider.onclick = () => {
                stickDots[index].click();
                banners.setBannerActive(index);
            };
        });

    });

}


//show product at home
async function showProductsViewHome(lenProduct = 4, kind = 1) {
    const res__products = await fetch(API_PRODUCTS);
    const data = API = await res__products.json();
    const res__kind = await fetch(API_KIND)
    const kinds = await res__kind.json();
    const { title } = kinds.find(item => item.id == kind) ?? false;
    if (!title) return false;

    let HTML_BAKERY = '';
    const dataBakery = data
        .filter(bakery => bakery.kind == kind)
        .sort((a, b) => b.Sales - a.Sales)
    lenProduct = lenProduct > dataBakery.length ? dataBakery.length : lenProduct;
    for (let i = 0; i < lenProduct; i++) {
        const { id, name, avatar, priceSale, priceOrigin, size } = dataBakery[i];
        HTML_BAKERY += `<div class="product-content col-lg-3 col-md-4 col-6">
            <figure class="product__item--des">
                <a href="" class="product__item--avata">
                    <img  loading="lazy" src="${avatar}" alt="${name}">
                </a>
                <figcaption>
                    <h3 class="product__item--title"><a href="http://">${name}</a></h3>
                    <div class="product__item--price">${coverPrice(priceSale)} đ <del class="price--del">${coverPrice(priceOrigin)}đ</del>
                    </div>
                    <div class="product__item--size">${size == "fullsize" ? "S, M, L" : size}</div>
                </figcaption>
                <div data-id="${id}" class="product-item--stickers__love ${hearts.show().includes(id + '') ? "hidden" : ""}">
                    <i class="fa-regular fa-heart"></i>
                    <span class="stickers--des">Thêm vào yêu thích</span>
                </div>
                <div class="product-item--stickers__del ${percentReduce(priceOrigin, priceSale) || "hidden"}">
                    -${percentReduce(priceOrigin, priceSale)}%
                </div>
                <div class="product-item--buttons d-md-block d-none">
                    <div onclick="openViews(${id})"  class="product-item__btn product-item--button__show">
                        <div class="item__btn--view"> Xem nhanh</div>
                        <div class="item__btn--view item__btn--sub_view"><i
                                class="fa-regular fa-eye"></i></div>
                    </div>
                    <div class="product-item__btn product-item--button__buy">
                        <div class="item__btn--view" data-id="${id}"> Mua Hàng</div>
                        <div data-id="${id}" class="item__btn--view item__btn--sub_view addcart">
                            <i data-id="${id}" class="fa-solid fa-cart-plus"></i>
                        </div>
                    </div>
                </div>
                <div class="product-item--buttons__mobiles d-md-none d-flex">
                    <div onclick="openViews(${id})" class="item__btn--view"><i class="fa-regular fa-eye"></i></div>
                    <div class="item__btn--view addcart" data-id="${id}"><i data-id="${id}" class="fa-solid fa-cart-plus"></i></div>
                </div>

            </figure>
        </div>`;
    }


    const products__kind = `
    <div class="products__container--shows">
        <div class="products__container">
            <div class="products__kind">
                <h2 class="products__kind--title">${title}</h2>
            </div>
            <div class="row product__item">
                ${HTML_BAKERY}
             </div>
             <div class="button__green products__container--seeall">
                <a href="">Xem Thêm</a>
            </div>
         </div>
    </div>
    `;
    const container = $$("#show__products");
    if (container.innerHTML) {
        container.insertAdjacentHTML('beforeend', products__kind);
    } else container.innerHTML = products__kind;




}
// xem sản phẩm views
function openViews(id) {
    const product = API.find(item => item.id == id);
    showProductModal(product)
}

//xừ lý giỏ hàng Cart;
function HandleCart() {
    const list__btn_adds = $$l('.addcart');
    const btn__close = $$('.modal__head--close');
    // Dóng mở modal
    modal__container_cart.addEventListener('click', () => {
        modal__container_cart.classList.add("hidden");
    })
    $$("#modal__cart .modal__body--content").addEventListener('click', e => {
        e.stopPropagation();
    })

    btn__close.addEventListener('click', (e) => {
        modal__container_cart.classList.add("hidden");
    })
    list__btn_adds.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const kind = API.find(item => item.id == id).kind;
            showKind(kind)
            if (carts.check(id)) {
                carts.update(id, Number(carts.getItem(id).amount) + 1);
            }
            else {
                carts.add(id);
            }
            showCart();
            modal__container_cart.classList.remove("hidden");

        })
    })
    showCart();
}
// xử lý giỏ hang yeu thich
function handleHearts() {
    const btn__loves = $$l('.product-item--stickers__love');
    const totalHeartElement = $$('.header__products-like__count');
    btn__loves.forEach(btnHeart => {
        btnHeart.onclick = () => {
            const id = btnHeart.getAttribute('data-id');
            hearts.add(id);
            totalHeartElement.innerText = hearts.show().length;
            btnHeart.classList.add("hidden");
        }
    })
    $$("#heart__container").innerHTML = hearts.show().map(id => {
        const { name, avatar, priceSale } = API.find(item => item.id == id);
        return `<div class="modal__body--product">
        <a href="" class="modal__body--product__avata">
            <img src="${avatar}" alt="${name}">
        </a>
        <div class="modal__body--product__des" id="heart__container">
            <h3 class="product__des--title pb-2"><a href="http://">${name}</a></h3>
            <p class="product__des--price">${coverPrice(priceSale)}<span>₫</span></p>
            <div class="button__green">
                <a href="">Chi Tiết</a>
            </div>
        </div>
        <div data-id="${id}" class="modal__hearts--close"> 
        <i class="fa-solid fa-xmark"></i>
    </div>
    </div>`
    }).join('');
    totalHeartElement.innerText = hearts.show().length;
    $$('.modal__hearts .modal__head--close').onclick = () => {
        $$(".modal__hearts").classList.add('hidden');
    }
    $$(".modal__hearts").onclick = () => {
        $$(".modal__hearts").classList.add('hidden');
    }
    $$(".modal__hearts .modal__body--content").onclick = (e) => {
        e.stopPropagation();
    }

    $$l('.modal__hearts .modal__hearts--close').forEach(btnClose => {
        btnClose.onclick = () => {
            const id = btnClose.getAttribute("data-id");
            const parentHeartBox = btnClose.closest(".modal__body--product");
            parentHeartBox.classList.add("hidden");
            hearts.delete(id);

            Array.from($$l('.product-item--stickers__love'))
                .find(item => item.getAttribute('data-id') == id).classList.remove("hidden");

            totalHeartElement.innerText = hearts.show().length;
        }
    })
}

$$("#cartBag").onclick = () => {
    showKind(1)
    modal__container_cart.classList.remove("hidden");
    HandleCart();
}
$$(".btn--login").onclick = () => {
    $$(".modal__userlog").classList.remove("hidden");
    const inputList = Array.from($$l("#loginform .form--group input"));
    const form = $$("#loginform");
    form.onsubmit = () => false;

    inputList.forEach(input => {
        input.onblur = () => {
            handleInput(input, 'không được để trống !')
        }
        input.oninput = () => {
            handleInput(input, 'không được để trống !')
        }

    })
    // submit form 
    $$('.btn--submitLogin').onclick = () => {
        form.onsubmit = () => !inputList.some(input => !input.value);
    }
    $$('.modal__userlog').addEventListener('click', () => {
        closeModal($$('.modal__userlog'));
    })
    $$(".userlog__container").onclick = (e) => {
        e.stopPropagation();
    }
    $$(".userlog__container .modal__head--close").onclick = () => {
        closeModal($$('.modal__userlog'));
    }
}
function closeModal(modalParent) {
    modalParent.classList.add("hidden");
}
function openModal(modalParent) {
    modalParent.classList.remove("hidden");
}

function handleInput(input, message = '') {
    const parentInput = input.closest(".form--group");
    const form__input = parentInput.querySelector(".form__input");
    const messageElement = parentInput.querySelector('.form__input--error');
    if (!input.value) {
        form__input.classList.add('error');
        messageElement.innerHTML = `Trường ${input.dataset.name + message} `;
        return false;
    } else {
        form__input.classList.remove('error');
        messageElement.innerHTML = ``;
    }
}
// Display sản phẩm
function showCart() {
    const CartProductsBox = $$(".modal__body--product__list");
    const listCartItems = carts.show();
    let total = 0;
    totalCart.innerText = listCartItems.length;
    const HTML__CART = listCartItems.map(cart => {
        const { id, name, avatar, priceSale } = items = API.find(item => item.id == cart.id);
        total += priceSale * cart.amount;
        return `<div class="modal__body--product">
        <a href="" class="modal__body--product__avata">
            <img loading="lazy" src="${avatar}" alt="${name}">
        </a>
        <div class="modal__body--product__des">
            <h3 class="product__des--title pb-2"><a href="http://">${name}</a></h3>
            <p class="product__des--price">${coverPrice(priceSale)} x <span class="product__des--amount"> ${cart.amount}</span><span> ₫</span></p>
            <div class="product__des--controller">
                <button data-id=${id} data-type="decrease" class="handleAmounts"><i class="${cart.amount >= 2 ? 'fa-solid fa-minus' : 'fa-solid fa-trash-can'}"></i></button>
                <input class="product__des--controller__amount" type="number" value="${cart.amount}">
                <button data-id=${id} data-type="increase" class="handleAmounts"><i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
    </div>`;
    }).join('');
    CartProductsBox.innerHTML = HTML__CART;
    $$(".total__cart").innerText = coverPrice(total);
    controllerCartProducts();
}
function showKind(kind = 1, len = 3) {
    const listProductKinds = API.filter(item => item.kind == kind);
    if (len < listProductKinds.length) listProductKinds.length = len;
    $$(".modal__body__add--listporduct").innerHTML = listProductKinds.map(item => {
        const { name, avatar, priceSale } = item;
        return `<div class="modal__body--product">
        <a href="" class="modal__body--product__avata">
            <img src="${avatar}" alt="">
        </a>
        <div class="modal__body--product__des">
            <h3 class="product__des--title pb-2"><a href="http://">${name}</a></h3>
            <p class="product__des--price">${coverPrice(priceSale)}<span>₫</span></p>
            <div class="button__green">
                <a href="">Chi Tiết</a>
            </div>
        </div>
    </div>`;
    }).join('');
}
// Điều chỉnh sử lý tăng giảm số lượng sản phẩm trong giỏ hàng;
function controllerCartProducts() {
    const listBtnHandleAmounts = $$l('.handleAmounts');
    listBtnHandleAmounts.forEach(item => {
        item.onclick = () => {
            const parentBox = item.closest('.modal__body--product');
            const id = item.getAttribute('data-id');
            const typeButton = item.getAttribute('data-type');
            let amount = carts.getItem(id)?.amount ?? 1;

            let totalProduct = coverNumber(totalBox.innerText) / 1000;
            const priceSale = Number(API.find(product => product.id == id).priceSale);

            if (typeButton == 'increase') {
                totalProduct += priceSale;
                amount = amount < 10 ? ++amount : 10;
            } else {
                totalProduct -= priceSale;
                --amount;
                if (amount == 1) {
                    item.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
                }
                if (amount <= 0) {
                    totalCart.innerText = Number(totalCart.innerText) - 1
                    carts.delete(id);
                    parentBox.classList.add('hidden');
                    totalBox.innerHTML = coverPrice(totalProduct);
                    return true;
                }
            }

            carts.update(id, amount)
            parentBox.querySelector('.product__des--amount').innerText = amount;
            parentBox.querySelector('.product__des--controller__amount').value = amount;
            totalBox.innerHTML = coverPrice(totalProduct);
        }
    })

}


// Serach sản phẩm 

$$('.btn--open-search').onclick = () => {
    showModalSearch();
}

function showModalSearch() {
    const modal__search = $$('#modal__search');
    const searchInput = $$("#search--input");
    modal__search.classList.remove('hidden');
    modal__search.onclick = () => {
        modal__search.classList.add("hidden");
    }
    $$(".modal__search").onclick = () => {
        closeModal(modal__search);
    }
    $$('.btn--close-search').onclick = () => {
        closeModal(modal__search);
    }
    $$('#modal__search .modal__body--content').onclick = e => {
        e.stopPropagation();
    }
    $$("#modal__search .modal__body").innerHTML=`Chưa có sản phẩm`;
    searchInput.focus();
    searchInput.addEventListener('input', e => {
        let value = e.target.value.trim().toLowerCase();
        let listItemsSearch = [];
        listItemsSearch = API.filter(({ name, des }) => name.toLowerCase().includes(value) || des.toLowerCase().includes(value));
        if (listItemsSearch?.length >= 5) {
            listItemsSearch.length = 5;
        }
        if (listItemsSearch.length > 0) {
            $$("#modal__search .modal__body").innerHTML=listItemsSearch.map(item => {
                const { id,priceSale, name, avatar } = item;
                return `<div class="modal__body--product">
                <a href="" class="modal__body--product__avata">
                    <img src="${avatar}" alt="${name}">
                </a>
                <div class="modal__body--product__des" id="heart__container">
                    <h3 class="product__des--title pb-2"><a href="http://">${name}</a></h3>
                    <p class="product__des--price">${coverPrice(priceSale)}<span>₫</span></p>
                    <div class="button__green">
                        <a href="">Chi Tiết</a>
                    </div>
                </div>
                <div data-id="${id}" class="modal__hearts--close"> 
                <i class="fa-solid fa-xmark"></i>
            </div>
            </div>`
            }).join('');
            $$l('#modal__search .modal__hearts--close').forEach(btnClose => {
                btnClose.onclick = () => {
                    const parentHeartBox = btnClose.closest(".modal__body--product");
                    parentHeartBox.classList.add("hidden");
                }
            })
        } else   $$("#modal__search .modal__body").innerHTML=`Sản phẩm không tồn tại !`;
    })
}
// format number đạng 100.000
const coverPrice = (number) => {
    if (!Number(number)) return 0;
    return new Intl.NumberFormat().format(number * 1000);
}
const coverNumber = (price) => {
    if (price.includes(',')) {
        return Number(price.replaceAll(',', ''));
    }
    if (price.includes('.')) {
        return Number(price.replaceAll('.', ''));
    }
}

// sử lý %
const percentReduce = (a, b) => {
    if (b >= a) return false;
    return ((1 - b / a) * 100).toFixed(2)
}





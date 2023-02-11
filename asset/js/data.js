
const URL_BANNER = "./asset/json/banner.json"
const API_PRODUCTS = './asset/json/products.json';
const API_KIND = './asset/json/kind.json';
let API=[];
// show san phẩm ở modal
function showProductModal({ name, avatar, priceOrigin, priceSale, des }) {
    const box_reducer = $$(".modal__product__view--reducer");
    box_reducer.classList.remove("hidden");
    $$("#productName").innerHTML = name;
    $$(".product__views-des__price--sale").innerHTML = formatNumber(priceSale) + " đ";
    $$("del.product__views-des__price--origin").innerHTML = (priceOrigin > priceSale) ? formatNumber(priceOrigin) + " đ" : "";
    $$(".product__views--item__des").innerHTML = des;
    // $$(".modal__item--product_size").innerHTML;
    const redusePrice = percentReduce(priceOrigin, priceSale);
    if (redusePrice) box_reducer.innerHTML = `-${redusePrice} %`
    else box_reducer.classList.add("hidden")

    $$(".product-modal--avata").src = avatar;
    $$(".modal__dialog").classList.remove("hidden");
}

//Show trang tin tuc 
function showNewsHomePage(len=3) {
    fetch("/asset/json/news.json")
        .then(res => res.json())
        .then(news => {
            if(news.length>len) news.length=len;
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
    const data = API=await res__products.json();
    const res__kind=await fetch(API_KIND)
    const kinds=await res__kind.json();
    const {title}=kinds.find(item=>item.id==kind) ?? false;
    if(!title) return false;

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
                    <div class="product__item--price">${formatNumber(priceSale)} đ <del class="price--del">${formatNumber(priceOrigin)}đ</del>
                    </div>
                    <div class="product__item--size">${size == "fullsize" ? "S, M, L" : size}</div>
                </figcaption>
                <div class="product-item--stickers__love">
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
                        <div class="item__btn--view item__btn--sub_view">
                            <i class="fa-solid fa-cart-plus"></i>
                        </div>
                    </div>
                </div>
                <div class="product-item--buttons__mobiles d-md-none d-flex">
                    <div onclick="openViews(${id})" class="item__btn--view"><i class="fa-regular fa-eye"></i></div>
                    <div class="item__btn--view" data-id="${id}"><i class="fa-solid fa-cart-plus"></i></div>
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
    const container=$$("#show__products");
    if(container.innerHTML){
        container.insertAdjacentHTML('beforeend',products__kind)  ;
    }else container.innerHTML=products__kind;

}
// format number đạng 100.000
const formatNumber = (number) => {
    if (!Number(number)) return 0;
    return new Intl.NumberFormat().format(number * 1000);
}
// sử lý %
const percentReduce = (a, b) => {
    if (b >= a) return false;
    return ((1 - b / a) * 100).toFixed(2)
}





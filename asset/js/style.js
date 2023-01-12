

const URL_BANNER = "./asset/json/banner.json"
fetch(URL_BANNER)
    .then(res => res.json())
    .then(banners => {
        // show banner sliders
        const HTML_BANNER = banners.map((banner, index) => `<figure>
            <img class="slider" src="${banner}" alt="Slider ${index} - HT Bakery">
        </figure>
        `).join("");
        $$('.banner_sliders').innerHTML = HTML_BANNER;

        const lengthBanner = banners.length;
        // button sliders
        let HTML_BTN_BANNER='';
        for(const i in banners){
            HTML_BTN_BANNER+=` <button class="btn_banner ${i==0?"active":""}"></button>`;
        }
        $$('.presentation__sliders').innerHTML = HTML_BTN_BANNER;
        banner_sliders(lengthBanner);
    })

// Banner slider
const banner_sliders = (lengthBanner=0) => {
    const btn_left = $$('.btn_silder_left');
    const btn_right = $$('.btn_silder_right');
    const slider_buttons = $$l('.presentation__sliders button');
    const timeSlide=6000;
    let slider_id_change= setTimeout(()=>{
        btn_right.click();
    },timeSlide)
    const banners = {
        isIndex: 0,
        autoplaySpeed:timeSlide,
        setBannerActive(index) {
            slider_buttons[this.isIndex].classList.remove('active');
            slider_buttons[index].classList.add('active');
            this.isIndex = index;
            clearTimeout(slider_id_change);
            slider_id_change=setTimeout(()=>{
                btn_right.click();
            },this.autoplaySpeed)
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
            const index_current_pre=banners.isIndex-1;
            banners.setBannerActive(
                (index_current_pre <0)?lengthBanner-1:index_current_pre
                );
        }
        btn_right.onclick = () => {
            $$(".slick-next").click();
           const index_current=banners.isIndex+1;
           banners.setBannerActive(
            (index_current >=lengthBanner)?0:index_current
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

//api
// const api=[
//     {
//         id:1,
//         name:"Bánh Kem Thảo Cẩm Viên",
//         avatar:'/image/sn1.jpeg',
//         kind:1,
//         priceOrigin:180,
//         priceSale:160,
//         size:'fullsize',
//         love:false,
//         material:["Socola","Kem phomai vị coffee","Ca Cao"],
//         des:'Bánh làm từ 3 lớp gato TRẮNG xen giữa 3 lớp kem TƯƠI PHOMAI, VỊ COFFEE. Bên ngoài phủ 1 lớp bột cacao VÀ DECOR HOA QUẢ. ',
//         Sales:150,
//     },
//     {
//         id:2,
//         name:"Bánh Nhung Đỏ Hình Trái Tim",
//         avatar:'/image/cakes/id2.jpg',
//         kind:1,
//         priceOrigin:680,
//         priceSale:560,
//         size:['M','L'],
//         love:false,
//         material:["Cream cheese", "Bơ New zealand", "Whipping Cream", "Gateaux"],
//         des:'Lớp phủ kem phô mai thơm và ngọt ngào. Với kết cấu mềm mịn như nhung và lớp sương bông xốp',
//         Sales:15,
//     },
//     {
//         id:3,
//         name:"Bánh sinh nhật Gato chuối",
//         avatar:'/image/cakes/id3.jpg',
//         kind:1,
//         priceOrigin:350,
//         priceSale:260,
//         size:['M','L'],
//         love:false,
//         material:["Gato", "Kem Whipping", "Bơ Newzea land"],
//         des:'Lớp phủ kem bơ Newzea land thơm và ngọt ngào hài hòa giữa thiên nhiên đất trời',
//         Sales:15,
//     },
//     {
//         id:4,
//         name:"Bánh sinh nhật phát tài",
//         avatar:'/image/sn2.jpg',
//         kind:1,
//         priceOrigin:850,
//         priceSale:750,
//         size:'fullsize',
//         love:false,
//         material:["Socola", "Kem Chease", "Whipping Cream", "Gateaux"],
//         des:'Lớp phủ kem Chease thơm và ngọt ngào. Với kết cấu mềm mịn như nhung và lớp sương bông xốp',
//         Sales:65,
//     },
//     {
//         id:5,
//         name:"Bánh Sinh Nhật Opera",
//         avatar:'/image/cakes/id5.jpg',
//         kind:1,
//         priceOrigin:450,
//         priceSale:400,
//         size:'',
//         love:false,
//         material:["Gateau", "Hạt điều", "Chocolate",'Whipping cream'],
//         des:'Bánh Sinh Nhật, Địa chỉ mua bánh sinh nhật tại Hà Nội, Bánh Sinh Nhật Công Ty, Bánh Sinh Nhật Cho Bé, Bánh Sinh Nhật Đẹp',
//         Sales:44,
//     },
//     {
//         id:6,
//         name:"Bánh Cream cheese 3 lớp",
//         avatar:'/image/cakes/id6.jpg',
//         kind:1,
//         priceOrigin:550,
//         priceSale:500,
//         size:'',
//         love:false,
//         material:["Gateau", "gateaux", "Chocolate"],
//         des:'Bánh Sinh Nhật, Địa chỉ mua bánh sinh nhật tại Hà Nội, Bánh Sinh Nhật Công Ty, Bánh Sinh Nhật Cho Bé, Bánh Sinh Nhật Đẹp',
//         Sales:15,
//     },
// ]
const API_PRODUCTS='/asset/json/products.json';


const showProductsViewHome=(lenProduct=4)=>{
    fetch(API_PRODUCTS)
    .then(res=>res.json())
    .then(data=>{
        let HTML_BAKERY='';
        let dataBakery=data
        .filter(bakery=>bakery.kind==1)
        .sort((a,b)=>b.Sales-a.Sales)    
        lenProduct=lenProduct>dataBakery.length?dataBakery.length:lenProduct;
        for(let i=0;i<lenProduct;i++){
            const {id,name,avatar,priceSale,priceOrigin,size}=dataBakery[i];
            HTML_BAKERY+=`<div class="product-content col-lg-3 col-md-4 col-6">
            <figure class="product__item--des">
                <a href="" class="product__item--avata">
                    <img  loading="lazy" src="${avatar}" alt="${name}">
                </a>
                <figcaption>
                    <h3 class="product__item--title"><a href="http://">${name}</a></h3>
                    <div class="product__item--price">${formatNumber(priceSale)} đ <del class="price--del">${formatNumber(priceOrigin)}đ</del>
                    </div>
                    <div class="product__item--size">${size=="fullsize"?"S, M, L":size}</div>
                </figcaption>
                <div class="product-item--stickers__love">
                    <i class="fa-regular fa-heart"></i>
                    <span class="stickers--des">Thêm vào yêu thích</span>
                </div>
                <div class="product-item--stickers__del ${percentReduce(priceOrigin,priceSale) || "hidden"}">
                    -${percentReduce(priceOrigin,priceSale)}%
                </div>
                <div class="product-item--buttons d-md-block d-none">
                    <div class="product-item__btn product-item--button__show">
                        <div class="item__btn--view"> Xem nhanh</div>
                        <div class="item__btn--view item__btn--sub_view"><i
                                class="fa-regular fa-eye"></i></div>
                    </div>
                    <div class="product-item__btn product-item--button__buy">
                        <div class="item__btn--view"> Mua Hàng</div>
                        <div class="item__btn--view item__btn--sub_view">
                            <i class="fa-solid fa-cart-plus"></i>
                        </div>
                    </div>
                </div>
                <div class="product-item--buttons__mobiles d-md-none d-flex">
                    <div class="item__btn--view"><i class="fa-regular fa-eye"></i></div>
                    <div class="item__btn--view"><i class="fa-solid fa-cart-plus"></i></div>
                </div>

            </figure>
        </div>`;
        }
        document.querySelector("#bakery").innerHTML=HTML_BAKERY;

    })
}
showProductsViewHome();
const formatNumber=(number)=>{
    if(!Number(number)) return 0;
    return new Intl.NumberFormat().format(number*1000);
}
const percentReduce=(a,b)=>{
    if(b>=a) return false;
    return ((1-b/a)*100).toFixed(2)
}
// turn off menu
$$('.btn_close--menu').onclick=()=>{
    $$("#openmenu").click();
}


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
$$('.btn_close--menu').onclick=()=>{
    $$("#openmenu").click();
}
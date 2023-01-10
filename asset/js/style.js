
// Banner slider
const banner_sliders = () => {
    const btn_left = $$('.btn_silder_left');
    const btn_right = $$('.btn_silder_right');
    console.log(btn_left);
    $(document).ready(function () {
        $('.banner_sliders').slick({
            dots: true,
        });
        btn_left.onclick = () => {
            $$(".slick-prev").click();
        }
        btn_right.onclick = () => {
            $$(".slick-next").click();
        }
    });

}
banner_sliders();
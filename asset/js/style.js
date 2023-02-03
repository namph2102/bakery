
showProductsViewHome();
showNewsHomePage();

// xem sản phẩm views
function openViews(id) {
    const product = API.find(item => item.id == id);
    showProductModal(product)
}


//handle Click button
(function () {
    // turn off menu
    $$('.btn_close--menu').onclick = () => {
        $$("#openmenu").click();
    }
    // turn off modal
    $$(".modal__dialog--close").onclick = () => {
        $$(".modal__dialog").classList.add("hidden");
    }
}())


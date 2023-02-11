// xuất ra sản phẩm showProductsViewHome(Độ dài sản phẩm,Loại sản phẩm )
showProductsViewHome(4,1);
showProductsViewHome(2,2);

showNewsHomePage(4);

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
}());



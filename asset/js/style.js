
const carts=createStoreList('cart');
const hearts=createStoreList('hearts',false);
// xuất ra sản phẩm showProductsViewHome(Độ dài sản phẩm,Loại sản phẩm )

showHomePage();

async function showHomePage(){
    await showProductsViewHome(4,1);
    await showProductsViewHome(2,2);
    HandleCart();
    handleHearts();
    showNewsHomePage(4);
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
    $$('.header__menu--right.header-heart').onclick=()=>{
        $$(".modal__hearts").classList.remove('hidden');
        handleHearts();
    }
}());

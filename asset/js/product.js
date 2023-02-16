displayProduct();
async function displayProduct(){
    await showProductsViewHome(8,1);
    HandleCart();
    handleHearts();
    panation();
}

function panation(){
    $$('.products__container--seeall').classList.add('hidden');
    const panationList=document.querySelectorAll('.pagination--item')
    const panationContainer=document.querySelector('.show__products--container__list');
    panationContainer.addEventListener('click',function(e){
        e.preventDefault();
        // document.documentElement.contains    
        const parentBox=e.target.classList.contains('pagination--item');
        if(!parentBox) return;
        panationList.forEach(p=>p.classList.remove('active'))
        e.target.classList.add('active');
        console.log(e.target.dataset.page);
    })
}
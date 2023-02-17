displayProduct();
async function displayProduct(){
    const lenProduct=8;
    const id=window.location.search.slice(4) || 1;

    await showProductsViewHome(lenProduct,id);
    HandleCart();
    handleHearts();
    await panigationLink(id,lenProduct);
    panation();
}
async function panigationLink(kind=1,len=4){
   const productKinds=API.filter(item=>item.kind==kind);
   
   fetch(API_KIND)
   .then(res=>res.json())
   .then(data=>{
    const catelory=data.find(item=>item.id==kind)
    $$('.navigation__box--kinds').innerHTML=catelory.title;
    document.title=`${catelory.title} tại HT Bakery`
   })
    const totalPage=Math.floor(productKinds.length/len);
    const container=$$('.show__products--container__list');
    if(totalPage>1){
        let html='';
        for(let i=2;i<=totalPage;i++){
            html+=`<li><a class="pagination pagination--item" data-page="${i}">${i}</a></li>`;
        }
        container.innerHTML=
        `<li><a class="pagination pagination--item" data-page="<" href="">&lt;</a></li>
        <li><a class="pagination pagination--item active" data-page="1" href="">1</a></li>
        ${html}
        <li><a class="pagination pagination--item" data-page=">" href="">&gt;</a></li>
        `;
        return;
    }
    container.innerHTML='';
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
    })
}
  function createStorage(key){
    const store=JSON.parse(localStorage.getItem(key)) ?? {};
   const save=()=>{
       localStorage.setItem(key,JSON.stringify(store));
   }
    const storage={
        get(key){
            return store[key]
        },
        add(key,value){
            store[key]=value;
            save();
        },
        delete(key){
            delete store[key];
            save();
        }
    }
    return storage;
}
 function createStoreList(key,obj=true){
    const storeList =JSON.parse(localStorage.getItem((key))) ?? [];
    const save=()=>{
        localStorage.setItem(key, JSON.stringify(storeList));
    }
    // kiem tra id co ton tai hay khong
    const check=(id)=>storeList.some(item=>item.id==id);
    return {
        show(){
            return storeList;
        },
        getItem(id){
            return storeList.find(item=>item.id==id);
        },
        add(product='id',amount=1,size='S'){
            console.log(product);
            console.log(check(product.id));
            if(obj){
                if(!check(product.id)){
                    const { id, name, avatar, priceSale, priceOrigin } = product;
                    storeList.push({id,name,avatar,priceSale,priceOrigin,amount,size})
                }
               
            }else{
                if(!storeList.includes(product)){
                    storeList.push(product)
                }
            }
           
            save();
        },
        check(id){
            return check(id);
        },
        update(id,amout,size){
            if(storeList.some(item=>item.id==id)){
                let item=storeList.find(item=>item.id==id);
                if(size){
                    item.size=size;
                }
                if(amout){
                    let value=Number(item.amount)+Number(amout);
                    item.amount=value>=10?10:value;
                }
                
            }
            save();
        },
        delete(id){
            if(obj){
                check(id) && storeList.splice(storeList.findIndex(item=>item.id==id).id,1);
            }else {
                if(storeList.includes(id)){
                    storeList.splice(storeList.indexOf(id),1)
                }
            }
            save();
        }
    }
}




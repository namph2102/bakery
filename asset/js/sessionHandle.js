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


// const checkInstances = (instances) => {
    //   instances.forEach( async (instance) => {
    //     const now = Date();
    //     const instanceAge = Math.round((Date.parse(now) - Date.parse(instance.time)) / (1000*60));
    //     const tooOld = instanceAge >= 15;
        
    //     if(tooOld){
    //       const update = await updateInstance(instance);
    //     }
    //   })
    // };
    
    // const updateInstance = async (instance) => {
    //   const data = await fetchUpdate(instance);
    //   const update = new Update(data);

    //   return update;

    // };
    
    
    // const fetchUpdate = async (instance) => {
    //   const res = await fetch(`${api.base}weather?q=${instance.location}&units=metric&appid=${api.key}`);
    //   const data = await res.json();

    //   return data;
    // }
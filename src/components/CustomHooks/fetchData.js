
// export default async function fetchData(query, instances) {
//     const api = {
//         key: "3a4015c59fc01878434227ba79fd42ca",
//         base: "https://api.openweathermap.org/data/2.5/",
//       };

//     const res = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
//     const data = await res.json()
    
//     if (data.cod === "404") {
//       errorLocationNotFound();
//       return;
//     }
//     let check = true;
//     instances.forEach((instance) => {
//       if (instance.id === data.id) {
//         errorLocationAlreadyExists();
//         check = false;
//       }
//     })
//     if (check === true){
//       return data;
//     }
// }

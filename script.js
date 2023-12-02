fetch('https://dummyjson.com/products').then((data)=>{
    //console.log(data);
    return data.json();
}).then((completedata)=>{
    console.log(completedata[2].title);
    //document.getElementById('root').innerHTML=completedata[2].title;
});






// fetch('https://dummyjson.com/products')
// .then(res=>{
//     return res.json();
// })
// .then(data=>{
//     data.array.forEach(product => {
//         const markup = `<li>${product.title}</li>`;

//         document.querySelector('ul').insertAdjacentHTML('beforeend', markup);
    
//     });

//     // data.forEach(product=>{
//     //     const markup = `<li>${product.title}</li>`;

//     //     document.querySelector('ul').insertAdjacentHTML('beforeend', markup);
//     // });
// })
// .catch(error=>console.log(error));






// function getInfo (){
//     navigator.geolocation.getCurrentPosition((position) => {
        
//         let lon = position.coords.longitude;
//         let lat = position.coords.latitude;

//         fetch('https://dummyjson.com/products').then(res => res.json()).then(data => {

//          console.log(data);
//          weatherInfo(data);
         
        
//         })

//     })
// }
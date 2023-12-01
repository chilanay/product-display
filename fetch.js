function getInfo (){
    navigator.geolocation.getCurrentPosition((position) => {
        
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;

        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

         console.log(data);
         weatherInfo(data);
         
        
        })

    })
}

// const apiUrl = 'https://dummyjson.com/products';

// // Function to handle errors during fetch
// const handleErrors = (response) => {
//     if (!response.ok) {
//         throw new Error(`Error: ${response.status} - ${response.statusText}`);
//     }
//     return response.json();
// };

// // Fetch data from the API
// fetch(apiUrl)
//     .then(handleErrors)
//     .then((data) => {
//         // Handle the data as needed
//         console.log('Fetched data:', data);
//     })
//     .catch((error) => {
//         // Handle errors during fetch
//         console.error('Fetch error:', error.message);
//     });
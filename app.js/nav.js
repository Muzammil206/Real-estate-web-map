'strick mode'


const menu = document.querySelector('.menu-pop')
const body = document.querySelector('.main')
const mobileMenu = document.querySelector('.mobile-menu')
const mobileButton = document.querySelector('.mobile-button')
const openMenu = document.querySelector('.path')
const btnopen = document.querySelector('.openuser')
const mobileInfo = document.querySelector('.mobile-card')
const openPOPbtn = document.querySelector('.btn-pop')
const mobileMap = document.querySelector('.map-mobile')
const overlay = document.getElementById('overlay')
const image1 = document.querySelector('.house-image')
const scrolTo = document.getElementById('scrol')
const scrolmobile = document.getElementById('mobilescrol')
const agent = document.getElementById('agent')
const sideShow = document.querySelector('.side-show')
const card = document.querySelector('.card')
const mobileinfoCancel = document.querySelector('.cancel-btn')



/////scrol  
scrolmobile.addEventListener('click', function(){
    console.log('ade')
    scrolTo.scrollIntoView({behavior: 'smooth'})
})




// open and close of user-info

// const display = function(){
//     menu.classList.remove('hidden')
// }



// // display usermenu
// openPOPbtn.addEventListener('click', display )
//undisplay user menu





//////menu user

openPOPbtn.addEventListener("click", function() {
    if ( menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
});

body.addEventListener('click', function(){
    if ( menu.style.display === "none") {
        menu.style.display = "none";
    } else {
        menu.style.display = "none";
    }
})


mobileMap.addEventListener('click', function(){
    if ( menu.style.display === "none") {
        menu.style.display = "none";
    } else {
        menu.style.display = "none";
    }
})





///mobile menu
mobileButton.addEventListener("click", function() {
    if ( mobileMenu.style.display === "block") {
        mobileMenu.style.display = "none";
    } else {
        mobileMenu.style.display = "block";
    }
});



mobileMap.addEventListener('click', function(){
    if (mobileMenu.style.display === "none") {
        mobileMenu.style.display = "none";
    } else {
        mobileMenu.style.display = "none";
    }
})


///////////////////////////////////////testing map/////////////////////////////


mapboxgl.accessToken = 'pk.eyJ1IjoibXV6YW1pbDIwNiIsImEiOiJjbGN5eXh2cW0wc2lnM290ZzJsZnNlbmxsIn0.o2Obvl7E_nQefSN34XsFmw';
const map = new mapboxgl.Map({
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/navigation-day-v1',
    center: [-74.0066, 40.7135],
    zoom: 15.5,
    pitch: 45,
    bearing: -17.6,
    container: 'map',
    antialias: true
});

const mapmobile = new mapboxgl.Map({
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/navigation-day-v1',
        center: [-74.0066, 40.7135],
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map-mobile',
        antialias: true
    });

const display3dMap = function(map){
    
   
    
    map.on('style.load', () => {
    // Insert the layer beneath any symbol layer.
    const layers = map.getStyle().layers;
    const labelLayerId = layers.find(
    (layer) => layer.type === 'symbol' && layer.layout['text-field']
    ).id;


    map.addControl(new mapboxgl.NavigationControl());
    
    // The 'building' layer in the Mapbox Streets
    // vector tileset contains building height data
    // from OpenStreetMap.
    map.addLayer(
    {
    'id': 'add-3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
    'fill-extrusion-color': '#aaa',
    
    // Use an 'interpolate' expression to
    // add a smooth transition effect to
    // the buildings as the user zooms in.
    'fill-extrusion-height': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'height']
    ],
    'fill-extrusion-base': [
    'interpolate',
    ['linear'],
    ['zoom'],
    15,
    0,
    15.05,
    ['get', 'min_height']
    ],
    'fill-extrusion-opacity': 0.6
    }
    },
    labelLayerId
    );
    });
   
}

display3dMap(mapmobile)
display3dMap(map)

mapmobile.scrollZoom.disable()
mapmobile["dragPan"].disable();
////change map style


////search

const search = function(map){
    map.addControl(
        new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        })
        );
}
search(mapmobile)
search(map)


const changeMap = function(){
    const layerList = document.getElementById('menu');
   const inputs = layerList.getElementsByTagName('input');
    
    for (const input of inputs) {
    input.onclick = (layer) => {
    const layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
    };

    }
}


changeMap(map)


const marker = new mapboxgl.Marker()
        .setLngLat([-74.0066, 40.7135])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML('<h3>Available House</h3><p>3 Bedrooms, 2 Bathrooms, 1,500 sqft</p>'))
        .addTo(map);



const houses = [
    { coordinates: [-74.0066, 40.7135], description: "3 Bedrooms, 2 Bathrooms, 1,500 sqft" },
    { coordinates: [-74.008, 40.7135  ], description: "4 Bedrooms, 2 Bathrooms, 2,000 sqft" },
    { coordinates: [-74.0018, 40.7135], description: "2 Bedrooms, 1 Bathroom, 800 sqft" }
];

houses.forEach(house => {
    const marker = new mapboxgl.Marker()
        .setLngLat(house.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h3>Available House</h3><p>${house.description}</p>`))
        .addTo(map);
})


document.getElementById('fly').addEventListener('click', () => {
    // Fly to a random location
    map.flyTo({
    center: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 100],
    essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
    });


    ////////Api////////

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '48987c29a2msh70042b6c8cc7318p1be182jsn410b29c07c53',
            'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
        }
    };
    
    fetch('https://zillow56.p.rapidapi.com/search?location=houston%2C%20tx', options)
        .then(response => response.json())
        .then(function(response){
            console.log(response)
            const data = response.results[0]
            const data2 = response.results[1]
            const data3 = response.results[2]
            console.log(data3.imgSrc)
            


            const html = sideShow.insertAdjacentHTML('beforeend', `
             <div class="side-section animate-in slide-in-from-top transform hover:scale-95 ease-in-out flex  bg-transparent p-4  rounded-lg m-5  shadow-2xl h-1/4 border-4 max-w-2/6  transition-opacity">
               <img src="${data.imgSrc} " alt="House" class="house-image w-1/3 rounded-lg">
              <div class="house-info text-center font-semibold text-lg mt-auto">
                <h2 class="text-blue-500 p-2 font-sans">🏡No ${data.streetAddress} ${data.city}  ${data.country}</h2>
                <p class="text-lg text-gray-600  font-sans"> ${data.bedrooms}🛏 Bedrooms | ${data.bathrooms}🛁 Bathrooms | 🛣1,500 sq ft</p>
              </div>
            </div>
            <div class="side-section animate-in slide-in-from-top transform hover:scale-95 ease-in-out flex  bg-transparent p-4  rounded-lg m-5  shadow-2xl h-1/4 border-4 max-w-2/6  transition-opacity">
            <img src="${data2.imgSrc} " alt="House" class="house-image w-1/3 rounded-lg">
             <div class="house-info text-center font-semibold text-lg mt-auto">
             <h2 class="text-blue-500 p-2 font-sans">🏡No ${data2.streetAddress}  ${data2.country}</h2>
             <p class="text-lg text-gray-600  font-sans"> ${data2.bedrooms}🛏 Bedrooms | ${data2.bathrooms}🛁 Bathrooms | 🛣1,500 sq ft</p>
             </div>
            </div> 
            <div class="side-section animate-in slide-in-from-top transform hover:scale-95 ease-in-out flex  bg-transparent p-4  rounded-lg m-5  shadow-2xl h-1/4 border-4 max-w-2/6  transition-opacity">
            <img src="${data3.imgSrc} " alt="House" class="house-image w-1/3 rounded-lg">
             <div class="house-info text-center font-semibold text-lg mt-auto">
             <h2 class="text-blue-400 p-2 font-sans">🏡No ${data3.streetAddress} ${data3.city}  ${data3.country}</h2>
             <p class="text-lg text-gray-600  font-sans"> ${data3.bedrooms}🛏 Bedrooms | ${data3.bathrooms}🛁 Bathrooms | 🛣1,500 sq ft</p>
             </div>
            </div> 
            `)

            const html2 = card.insertAdjacentHTML('beforeend', `
             <div class="    bg-slate-50 text-center relative  mx-4 sm:w-4/5 rounded-3xl shadow-xl lg:h-full lg:w-4/5 mb-10  duration-500 ease-in-out transform hover:scale-105">
             <img src="${data3.imgSrc}" alt="house" class=" relative w-full rounded-3xl rounded-b-lg  bg-none">
             <h1 class=" font-normal  mb-6 m-t-2 text-l  text-gray-600">🏡${data3.streetAddress} ${data3.city}</h1>
             <h1 class=" font-normal text-l text-orange-500">#${data3.price/700}m</h1>
             <p class="p-2 font-serif mt-4 font-normal  text-l text-gray-600 border-t-2 "> ${data3.bedrooms}🛏   | ${data3.bathrooms}🛁  |  🛣1,500 sq ft</p>
             </div>
             <div class="    bg-slate-50 text-center relative  mx-4 sm:w-4/5 rounded-3xl shadow-xl lg:h-full lg:w-4/5 mb-10  duration-500 ease-in-out transform hover:scale-105">
             <img src="${data2.imgSrc}" alt="house" class=" relative w-full rounded-3xl rounded-b-lg h-1/2 bg-none">
             <h1 class=" font-normal  mb-6 m-t-2 text-text-l  text-gray-600">🏡${data2.streetAddress} ${data2.city}</h1>
             <h1 class=" font-normal text-l text-orange-500">#${data2.price/700}m/year</h1>
             <p class="p-2 font-serif mt-5 font-normal  text-xl text-gray-600 border-t-2 "> ${data2.bedrooms}🛏  | ${data2.bathrooms}🛁  |  🛣1,500 sq ft</p>
              </div>
              <div class="    bg-slate-50 text-center relative  mx-4 sm:w-4/5 rounded-3xl shadow-xl lg:h-full lg:w-4/5 mb-10  duration-500 ease-in-out transform hover:scale-105">
              <img src="${data.imgSrc}" alt="house" class=" relative w-full rounded-3xl rounded-b-lg  bg-none">
              <h1 class=" font-normal  mb-6 m-t-2 text-l  text-gray-600">🏡${data.streetAddress} ${data3.city}</h1>
              <h1 class=" font-normal text-l text-orange-500">#${data.price/700}m/year</h1>
              <p class="p-2 font-serif mt-5 font-normal  text-xl text-gray-600 border-t-2 "> ${data2.bedrooms}🛏   |  ${data2.bathrooms}🛁  |  🛣1,500 sq ft</p>
               </div>
            ` )

            
        })
        .catch(err => console.error(err));
    
    
    // Outputs
   


//////////smothscrol




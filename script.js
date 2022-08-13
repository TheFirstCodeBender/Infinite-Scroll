const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Helper Function to Set Attributes on Dom Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}
//Create Elements for links and Photos, add to dom
function displayPhotos() {
    totalImages = photosArray.length;
    console.log('total Images',totalImages)
    //Run dunction for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        //Create <img> for photo
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        //Event Listener check when each is finished loading
        img.addEventListener('load',imageLoaded)
        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}



// Unsplash API
let ImagesToLoadCount = 5;
// Normally we don't want to store api keys like this but the information is free and public.
const apiKey = 'D5izaJCQhURYbjxzjc204SaE1T1qjAps3tMf-5o7QSk'
let apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${ImagesToLoadCount}&orientation=landscape`

function changeImagesLoadCount(count) {
   return apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}&orientation=landscape`
    
}
// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        imagesLoaded = 0;
        if (ImagesToLoadCount === 5) {
            apiUrl = changeImagesLoadCount(30)
        }
        loader.hidden = true
    }
}
//Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json();
        console.log(photosArray)
        displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load getPhotos
window.addEventListener('scroll', (event) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }
})


// On Load
getPhotos();
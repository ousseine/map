import './bootstrap.js';
import 'leaflet/dist/leaflet.min.css'
import './styles/app.css';
import L from 'leaflet'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const southWest = L.latLng(41.3337, -5.1406); // Sud-Ouest
const northEast = L.latLng(51.124, 9.6625); // Nord-Est
const bounds = L.latLngBounds(southWest, northEast);
const options = {
    maxBounds: bounds,
    maxBoundsViscosity: 1.0
}

const map = L.map('map', options).setView([43.2965, 5.3698], 14)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attributes: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    minZoom: 14,
    maxZoom: 19
}).addTo(map);

const markerIcon = L.icon({
    iconUrl: 'images/marker-icon.png',
    iconSize: [38, 41]
})
const provider = new OpenStreetMapProvider();
const searchControl = new GeoSearchControl({
    notFoundMessage: 'Sorry, that address could not be found.',
    provider: provider,
    style: 'bar',
    marker: {
        icon: markerIcon,
        draggable: true
    }
})

map.addControl(searchControl)

const moveMarker = (lat, lng, marker) => {
    if (marker) {
        map.removeLayer(marker)
    }

    // Nouveau marker
    const newMarker = L.marker([lat, lng], {
        icon: markerIcon,
        draggable: true
    })
    newMarker.addTo(map)

    // Centrer la carte
    map.setView([lat, lng], 14)

    newMarker.on('moveend', e => {
        const { lat, lng } = e.target.getLatLng()

        console.log(lat, lng)
    })
}

map.on('geosearch/showlocation', (result) => {
    
    const lat = result.location.y
    const lng = result.location.x
    
    // Déplacer le marker
    map.on('click', (e) => moveMarker(lat, lng, result.marker))
})



// let marker = null;

// Trouvé vos coordonnées à l'aide du double click
map.on('click', e => {
    if (bounds.contains(e.latlng)) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        const marker = L.marker([lat, lng])

        if (bounds.contains(L.latLng(lat, lng))) {
            if (marker) {
                map.removeLayer(marker)
            }

            L.marker([lat, lng]).addTo(map)
            map.setView([lat, lng], 14)

            console.log(lat, lng);
        } else {
            alert('La localisation recherchée est en dehors de la France.')
        }
    }
});


// Récupère la marker
// const getMarker = (lat, lng, marker) => {
//     // const mapIcon = L.icon({
//     //     iconUrl: 'images/marker-icon.png',
//     //     iconSize: [38, 41],
//     // });
//
//     const newLatLng = L.latLng(lat, lng)
//
//     // Vérifier si les coordonnées recherchées sont en dehors de la France
//     if (bounds.contains(newLatLng)) {
//         if (marker) {
//             map.removeLayer(marker)
//         }
//
//         marker = L.marker([lat, lng]).addTo(map)
//         map.setView([lat, lng], 14)
//
//         console.log(lat, lng);
//     } else {
//         alert('La localisation recherchée est en dehors de la France.')
//     }
// }

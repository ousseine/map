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
    iconUrl: 'marker-icon.png',
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

let marker;

map.on('geosearch/showlocation', (result) => {
    marker = result.marker
})

function getMarker(lat, lng) {
    marker = L.marker([lat, lng], {
        icon: markerIcon,
        draggable: true,
        title: 'salut les gens'
    }).addTo(map)

    console.log(marker)

    // TODO :: Ajouter les infos dans le marker si on le clique et ne rien faire
}

map.on('click', e => {
    if (bounds.contains(e.latlng)) {
        let lat = e.latlng.lat
        let lng = e.latlng.lng

        if (marker) {
            // Supprimer le marker
            map.removeLayer(marker)

            // Créer un nouveau marker
            getMarker(lat, lng)
        } else {
            // Créer un marker
            getMarker(lat, lng)
        }
    }
})


// Supprimer le marker si on clique sur le bouton close
document.querySelector('form').querySelector('button').addEventListener('click', e => {
    if (marker) {
        map.removeLayer(marker)
    }
})




// const moveMarker = (lat, lng, marker) => {
//     if (marker) {
//         map.removeLayer(marker)
//     }
//
//     // Nouveau marker
//     const newMarker = L.marker([lat, lng], {
//         icon: markerIcon,
//         draggable: true
//     })
//     newMarker.addTo(map)
//
//     // Centrer la carte
//     map.setView([lat, lng], 14)
//
//     newMarker.on('moveend', e => {
//         const { lat, lng } = e.target.getLatLng()
//
//         console.log(lat, lng)
//     })
// }

// let marker = null;

// Trouvé vos coordonnées à l'aide du double click
// map.on('click', e => {
//     if (bounds.contains(e.latlng)) {
//         const lat = e.latlng.lat;
//         const lng = e.latlng.lng;
//
//         const marker = L.marker([lat, lng])
//
//         if (bounds.contains(L.latLng(lat, lng))) {
//             if (marker) {
//                 map.removeLayer(marker)
//             }
//
//             L.marker([lat, lng]).addTo(map)
//             map.setView([lat, lng], 14)
//
//             console.log(lat, lng);
//         } else {
//             alert('La localisation recherchée est en dehors de la France.')
//         }
//     }
// });

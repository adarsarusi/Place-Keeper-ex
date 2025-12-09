'use strict'

var gMap
var gMarkers
var gCoords

function onInit() {
    renderPlaces()
    renderUserColorsPrefs()
    initMap()
}



function renderPlaces() {
    const places = getPlaces()

    let strHtmls = ''

    strHtmls = places.map(place => `
        <li>
        ${place.name}
        <button onclick="onRemovePlace('${place.id}')">X</button>
        <button onclick="onPanToPlace('${place.id}')">Go!</button>
        </li>
        `)

    const elList = document.querySelector('.placeList')
    elList.innerHTML = strHtmls.join('')
}

function onRemovePlace(id) {
    removePlace(id)
    renderPlaces()
}

// <button onclick="onRemovePlace()">X</button>
//    <button onclick="onPanToPlace()">Go!</button>

async function initMap() {
    const defaultLoc = { lat: 29.557669, lng: 34.951923 }

    gMap = new google.maps.Map(document.querySelector('.map-container'), {
        zoom: 14,
        center: defaultLoc,
        mapId: 'DEMO_MAP_ID',
    })

    gMap.addListener('click', ev => {
        const elDialog = document.querySelector('.modal')
        elDialog.showModal()
        const lat = ev.latLng.lat()
        const lng = ev.latLng.lng()
        gCoords = { lat, lng }
    })
    // renderMarkers()
}

function onAddPlace(ev) {
    ev.preventDefault()
    const elInput = ev.target.querySelector('input')
    const { lat, lng } = gCoords
    if (lat && lng) {
        addPlace(elInput.value, lat, lng, gMap.getZoom())
        renderPlaces()
        // renderMarkers()
    }
    document.querySelector('.modal').close()
}

function onPanToPlace(id) {
    const place = getPlaceById(id)
    gMap.setCenter({ lat: place.lat, lng: place.lng })
    gMap.setZoom(place.zoom)
}

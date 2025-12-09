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
    renderMarkers()
}

function onAddPlace(ev) {
    ev.preventDefault()
    const elInput = ev.target.querySelector('input')
    const { lat, lng } = gCoords
    if (lat && lng) {
        addPlace(elInput.value, lat, lng, gMap.getZoom())
        renderPlaces()
        renderMarkers()
    }
    document.querySelector('.modal').close()
}

function onPanToPlace(id) {
    const place = getPlaceById(id)
    gMap.setCenter({ lat: place.lat, lng: place.lng })
    gMap.setZoom(place.zoom)
}

function showCurrentUserLocation() {
    if (!navigator.geolocation) {
        console.error('Geolocation is not available on this device')
        return
    }
    navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
}

function showLocation(position) {
    const lat = position.coords.latitude
    const lng = position.coords.longitude

    const { AdvancedMarkerElement, PinElement } = google.maps.marker

    gMap.panTo({ lat, lng })

    const pinBackground = new PinElement({
        background: '#fb4604ff',
        borderColor: '#137333',
        glyph: '🙋‍♂️'
    })

    new AdvancedMarkerElement({
        position: { lat, lng },
        map: gMap,
        title: 'Your Location',
        content: pinBackground.element
    })
}

function handleLocationError(err) {
    let errMsg = ''
    switch (err.code) {
        case 1:
            errMsg = `The user didn\'t allow this page to retrieve a location`
            break
        case 2:
            errMsg = 'Unable to determine your location: ' + err.message
            break
        case 3:
            errMsg = 'Timed out before retrieving the location.'
            break
    }
    console.error(errMsg)
}

function renderMarkers() {
    const places = getPlaces()
    if (gMarkers) gMarkers.forEach(marker => marker.setMap(null))

    // Every place is creating a marker
    gMarkers = places.map(place => {
        return new google.maps.marker.AdvancedMarkerElement({
            position: place,
            map: gMap,
            title: place.name
        })
    })
}

function onDownloadCSV(elLink) {
    const csvContent = getPlacesAsCSV()
    if (!csvContent) return
    elLink.href = 'data:text/csv;charset=utf-8,' + csvContent
}

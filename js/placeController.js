'use strict'

function onInit() {
    renderPlaces()
    renderUserColorsPrefs()
}

function renderPlaces() {
    const places = getPlaces()

    let strHtmls = ''

    strHtmls = places.map(place => `
        <li> Place: ${place.name}, Latitude: ${place.lat}, Longitude: ${place.lng}</li>
        `)

    const elList = document.querySelector('.placeList')
    elList.innerHTML = strHtmls.join('')
}

function onRemovePlace(id) {
    removePlace(id)
    renderPlaces()
}
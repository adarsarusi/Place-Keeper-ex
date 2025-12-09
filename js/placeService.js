'use strict'

const PLACE_STORAGE_KEY = 'placesDB'

var gPlaces
_createPlaces()

function getPlaces() {
    return gPlaces
}

function removePlace(id) {
    const placeToRemove = gPlaces.findIndex(place => place.id === id)
    gPlaces.splice(placeToRemove, 1)
    _savePlaces()
}

function addPlace(name, lat, lng, zoom) {
    const place = { id: makeId(3), name, lat, lng, zoom }
    gPlaces.push(place)
    _savePlaces()
}

function getPlaceById(id) {
    const place = gPlaces.find(place => place.id === id)
    return place
}

function _createPlace(name, lat, lng, zoom) {
    return { id: makeId(3), name, lat, lng, zoom }
}

function _createPlaces() {
    gPlaces = loadFromStorage(PLACE_STORAGE_KEY)

    if (!gPlaces || !gPlaces.length) {
       gPlaces =[ _createPlace('Eilat', 29.555901, 34.949108, 14),
                 _createPlace('Home', 29.564008, 34.946525, 15)] 
        
    }

    _savePlaces()
}

function _savePlaces() {
    saveToStorage(PLACE_STORAGE_KEY, gPlaces)
}


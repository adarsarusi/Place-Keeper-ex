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
    
    if (!gPlaces || !gPlaces.length) {
       gPlaces =[ _createPlace('eilat', 32.1416, 34.831213, 0),
                 _createPlace('eilat2', 35.1416, 37.831213, 0)] 
        
    }

    _savePlaces()
}

function _savePlaces() {
    saveToStorage(PLACE_STORAGE_KEY, gPlaces)
}


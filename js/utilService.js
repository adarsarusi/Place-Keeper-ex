'use strict'

function loadFromStorage(key) {
    const json = localStorage.getItem(key)
    return JSON.parse(json)
}

function saveToStorage(key, value) {
    const json = JSON.stringify(value)
    localStorage.setItem(key, json)
}

function updateUser(updates) {
    let userData = loadFromStorage('user') || {};
    userData = { ...userData, ...updates };
    saveToStorage('user', userData);
}
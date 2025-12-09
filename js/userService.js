'use strict'

const user = {
    email: ''
    ,
    txtColor: ''
    ,
    bgColor: ''
    ,
    age: ''
    ,
    birthDate: ''
    ,
    birthTime: ''
}

// window.addEventListener('DOMContentLoaded', () => {
//     renderUserSettings()
// })

function onInitSettings() {
    renderUserSettings()
}

function onInitMain() {
    renderUserTime()
    renderUserColorsPrefs()
}

function showAge(newVal) {
    const el = document.querySelector("span#age")
    el.innerHTML = newVal
}

function onResetColors() {
    const user = loadFromStorage('user') || {}

    // default colors
    user.bgColor = '#d1f8ff'
    user.txtColor = '#67f89c'

    saveToStorage('user', user)

    document.body.style.backgroundColor = user.bgColor
    document.body.style.color = user.txtColor

    renderUserSettings()
}


function onSaveSettings(ev) {
    ev.preventDefault()

    const email = document.querySelector('#email').value
    const age = document.querySelector('#age').value
    const bgColor = document.querySelector('#bgColor').value
    const txtColor = document.querySelector('#txtColor').value
    const birthDate = document.querySelector('#birthDate').value
    const birthTime = document.querySelector('#birthTime').value

    updateUser({
        email,
        age,
        bgColor,
        txtColor,
        birthDate,
        birthTime
    })

    renderUserSettings()
}

function renderUserColorsPrefs() {
    const user = loadFromStorage('user')

    if (user.bgColor) document.body.style.backgroundColor = user.bgColor
    if (user.txtColor) document.body.style.color = user.txtColor
}

function renderUserSettings() {
    const user = loadFromStorage('user')
    if (!user) return

    if (user.email) document.querySelector('#email').value = user.email
    if (user.age) {
        document.querySelector('#age').value = user.age
        document.querySelector('span#age').innerHTML = user.age
    }
    if (user.bgColor) document.querySelector('#bgColor').value = user.bgColor
    if (user.txtColor) document.querySelector('#txtColor').value = user.txtColor
    if (user.birthDate) document.querySelector('#birthDate').value = user.birthDate
    if (user.birthTime) document.querySelector('#birthTime').value = user.birthTime

    if (user.bgColor) document.body.style.backgroundColor = user.bgColor
    if (user.txtColor) document.body.style.color = user.txtColor
}

function renderUserTime() {
    const user = loadFromStorage('user')
    let userTime = ''
    const elDate = document.querySelector('p.displayDate')

    if (!user.birthDate || !user.birthTime) {
        elDate.classList.add('hidden')
        return
    }

    elDate.classList.remove('hidden')

    if (user.birthDate) userTime += user.birthDate + ' '
    if (user.birthTime) userTime += user.birthTime

    document.querySelector('p span').innerHTML = userTime
}
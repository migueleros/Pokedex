const menuItems = document.querySelectorAll('.menu-item')
const pages = document.querySelectorAll('.page')
const searchBar = document.getElementById('pokeName')
const submitButton = document.getElementById('submitPokemon')
const resultPage = document.querySelector('.result-page-wrapper')
const closeButton = document.querySelector('.close-button')
const barWrapper = document.querySelector('.search-bar')
const errorMessage = document.querySelector('.errorMessage')
const loadingMessage = document.querySelector('.loading-content')
const dexHeader = document.querySelector('.result-background')
const resultInfo = document.querySelector('.result-info')
const shinyButton = document.querySelector('.shiny-button')
const resultBackgroundImage = document.querySelector('.result-background-image')
const dexPage = document.querySelector('.pokedex-info')

const types = {
    'water': 'url(assets/water_background.gif)', 
    'grass': 'url(assets/bug_background.webp)',
    'fire': 'url(assets/fire_background.png)',
    'ground': 'url(assets/rock-background.png)',
    'rock': 'url(assets/rock-background.png)',
    'psychic': 'url(assets/psychic_background.png)',
    'dark': 'url(assets/dark_background.gif)',
    'ghost': 'url(assets/dark_background.gif)',
    'bug': 'url(assets/poke-background.jpg)',
    'flying': 'url(assets/flying_background.gif)',
    'electric': 'url(assets/poke-background.jpg)',
    'dragon': 'url(assets/flying_background.gif)',
    'fairy': 'url(assets/poke-background.jpg)',
    'fighting': 'url(assets/fighting_background.webp)',
    'poison': 'url(assets/poke-background.jpg)',
    'steel': 'url(assets/poke-background.jpg)',
    'ice': 'url(assets/ice_background.gif)',
    'normal':'url(assets/poke-background.jpg)'
}
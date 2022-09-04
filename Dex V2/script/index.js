menuItems.forEach((item,i) => {
    item.addEventListener('click', (event) => {
        event.preventDefault()
        menuItems.forEach(item => {item.classList.remove('active')})
        item.classList.add('active') 

        resultPage.style.transform = 'translateY(-700px)'
        setTimeout(() => {
            resultPage.classList.remove('page-open')
        },1000)
        
        pages.forEach(page => {page.classList.remove('activePage')})
        pages[i].classList.add('activePage')
    })
})

function callAPI(){
    let pokeInputValue = searchBar.value.toLowerCase()
    let dataEndPoint = `https://pokeapi.co/api/v2/pokemon/${pokeInputValue}`
    let speciesEndPoint = `https://pokeapi.co/api/v2/pokemon-species/${pokeInputValue}`

    fetch(dataEndPoint).then(response => {
        response.json().then(pokemonData => {
            fetch(speciesEndPoint).then(speciesResponse => {
                speciesResponse.json().then(speciesData => {
                    makeCard(pokemonData,speciesData)
                    shinySwitch(pokemonData)
                    pageDown()
                    console.log(pokemonData)
                })
            })
        })
        .catch(() => {
            printError()
        })
    })
}

const pageDown = () => { 
    resultPage.classList.add('page-open')
    resultPage.style.transform = 'translateY(0)'
    document.querySelector('.errorMessage').style.display = 'none'
    loadingMessage.style.display = 'none'
}

const makeCard = (pokemonData,speciesData) => {
    switch (pokemonData.types[0].type.name){
        case 'grass':
            dexHeader.style.backgroundImage = "url('assets/bug_background.webp')"
            break
        case 'rock','ground':
            dexHeader.style.backgroundImage = "url('assets/rock-background.png')";
            break
        case 'water':
            dexHeader.style.backgroundImage = "url('assets/water_background.gif')"
            break
        case 'flying':
            dexHeader.style.backgroundImage = "url('assets/flying_background.gif')"
            break
        case 'dark':
            dexHeader.style.backgroundImage = "url('assets/dark_background.gif')"
            break
        case 'psychic':
            dexHeader.style.backgroundImage = "url('assets/psychic_background.png')"
            break
        case 'fire':
            dexHeader.style.backgroundImage = "url('assets/fire_background.png')"
            break
        default:
            dexHeader.style.backgroundImage = "url('assets/poke-background.jpg')"
            break
    }

    resultInfo.innerHTML = `    
        <h1>${pokemonData.name} <span>Nº${pokemonData.id}</span></h1>   

        <p class='pokemon-description'>${speciesData.flavor_text_entries[1].flavor_text}</p>

        <div class="pokemon-types">  
            <h2>Type</h2>
            <div class='pokemon-type'>${pokemonData.types[0].type.name}</div>
        </div>

        <div class='pokemon-general'>
            <div class='general-column'>
                <div class='attribute-title'>
                    Ability
                </div>  
                
                <div class='attribute-info'>
                    ${pokemonData.abilities[0].ability.name}
                </div>

                <div class='attribute-title'>
                    Egg Group
                </div>  
                
                <div class='attribute-info'>
                    ${speciesData.egg_groups[0].name}
                </div>

                <div class='attribute-title'>
                    Generation
                </div>   

                <div class='attribute-info'>
                    ${speciesData.generation.name}
                </div>

                <div class='attribute-title'>
                    Growth Rate
                </div>   

                <div class='attribute-info'>
                    ${speciesData.growth_rate.name} 
                </div>
            </div>

            <div class='general-column'>
                <div class='attribute-title'>
                    Height
                </div>   

                <div class='attribute-info'>
                    ${pokemonData.height} M
                </div>

                <div class='attribute-title'>
                    Weight
                </div>   

                <div class='attribute-info'>
                    ${pokemonData.weight} Kg
                </div>
            </div>
        </div>
    `

    resultBackgroundImage.innerHTML = `
        <div class='result-image'>
            <img src='${pokemonData.sprites.front_default}' class='pokemon-sprite'></img>       
        </div>
    `
}
    
const shinySwitch = (pokemonData) => {
    shinyButton.addEventListener('click', () => {
        resultBackgroundImage.innerHTML = `
            <div class='result-image'>
                <img src='${pokemonData.sprites.front_shiny}' class='pokemon-sprite'></img>       
            </div>
        `
    })
}

const printError = () => {
    barWrapper.classList.add('invalid')
    setTimeout(() => {
        barWrapper.classList.remove('invalid')
    },500)
    loadingMessage.style.display = 'none'
    errorMessage.style.display = 'block'
}

submitButton.addEventListener('click', () => {
    loadingMessage.style.display = 'block'
    callAPI()
})

document.body.addEventListener('keydown', (e) => {
    if (e.key == "Enter" && searchBar === document.activeElement){
        callAPI()
        loadingMessage.style.display = 'block'
        searchBar.blur()
    }else if (e.key == "Escape" && resultPage.classList.contains('page-open')){
        resultPage.style.transform = 'translateY(-700px)'

        setTimeout(() => {
            resultPage.classList.remove('page-open')
        },1000)
    }
})  

closeButton.addEventListener('click', () => {
    resultPage.style.transform = 'translateY(-700px)'

    setTimeout(() => {
        resultPage.classList.remove('page-open')
    },1000)
})

barWrapper.addEventListener('input', () => {
    errorMessage.style.display = 'none'
})
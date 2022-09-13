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

const dexCardFetch = async (num) => {
    let pokeEndPoint = `https://pokeapi.co/api/v2/pokemon/${num}`;
    const response = await fetch(pokeEndPoint);
    const data = await response.json();
    return data;
};

const buildDex = async () => {
    for (i = 1; i < 10; i++) {
        let api = await dexCardFetch(i);

        dexPage.insertAdjacentHTML('beforeend', `
            <div class='pokedex-card'>
                <div class='pokedex-card-header'>
                    <img src='assets/poke-background.jpg' class='pokedex-card-background'></img>
                    <img src='${api.sprites.front_default}' class='pokedex-card-image'></img>
                </div>

                <div class='pokedex-card-body'>
                    <h1>${api.name}<span> Nº${api.id}</span></h1>
                </div>
            </div>
        `)
    }
};

buildDex();

function searchCardFetch(){
    let pokeInputValue = searchBar.value.toLowerCase()
    let dataEndPoint = `https://pokeapi.co/api/v2/pokemon/${pokeInputValue}`

    fetch(dataEndPoint).then(response => {
        response.json().then(pokemonData => {
            fetch(pokemonData.species.url).then(speciesResponse => {
                speciesResponse.json().then(speciesData => {
                    makeCard(pokemonData,speciesData)
                    shinySwitch(pokemonData)
                    pageDown()
                    console.log(pokemonData)
                })
                .catch(() => {
                    printError()
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
    dexHeader.style.backgroundImage = types[pokemonData.types[0].type.name]
    
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

document.body.addEventListener('keydown', (e) => {
    if (e.key == "Enter" && searchBar === document.activeElement){
        searchCardFetch()
        loadingMessage.style.display = 'block'
        searchBar.blur()
    }else if (e.key == "Escape" && resultPage.classList.contains('page-open')){
        resultPage.style.transform = 'translateY(-2000px)'

        setTimeout(() => {
            resultPage.classList.remove('page-open')
        },1000)
    }
})  

closeButton.addEventListener('click', () => {
    resultPage.style.transform = 'translateY(-1400px)'

    setTimeout(() => {
        resultPage.classList.remove('page-open')
    },1000)
})

barWrapper.addEventListener('input', () => {
    errorMessage.style.display = 'none'
})
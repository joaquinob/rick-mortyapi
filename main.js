const init = async () => {
    let data = await getCharacters();
    showCharacters(data.results);
    
};

const getCharacters = async () => {
    let characters = await fetch('https://rickandmortyapi.com/api/character');
    let data = await characters.json();
    return data;
};

const showCharacters = (data) => {
    let main$ = document.querySelector('main');

    for (let character of data){
        let characters$ = document.createElement('div');
        characters$.innerHTML = ` 
        <div class="flexbox">
            <div class="flexbox-img">
                <img src="${character.image}" alt="Img del personaje">
            </div>
            <div class="flexbox-name">${character.name}</div>
            <div>
                <div class="flexbox-features1">${character.status}</div>
                <div class="flexbox-features2">${character.species}</div>
            </div>
        </div>
        `
        main$.appendChild(characters$)
}

};






init();
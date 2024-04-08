const init = async () => {
    let data = await getCharacters();
    showCharacters(data.results);
    refreshPag();
    changePag();
};

const getCharacters = async (url = 'https://rickandmortyapi.com/api/character', page = 1) => {
    let currentPage$ = document.querySelector('#current');
    currentPage$.textContent = page;
    let characters = await fetch(url);
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

const refreshPag = (info) => {
    let currentPage$ = document.querySelector('#current');
    let currentPage = parseInt(currentPage$.textContent);

    let prevBtn$ = document.querySelector('#prevPag');
    let nextBtn = document.querySelector('#nextPag');
    if(info){ 
        if (info.prev === null){
            prevBtn$.removeAttribute('data-goToPage')
        } else{
            prevBtn$.attributes.removeAttribute('disabled');
            prevBtn$.setAttribute('data-url', info.prev);
            prevBtn$.setAttribute('data-goToPage', currentPage -1);
        };
        
        if (info.next === null){
            nextBtn$.removeAttribute('data-goToPage')
        } else{
            nextBtn$.attributes.removeAttribute('disabled');
            nextBtn$.setAttribute('data-url', info.next);
            nextBtn$.setAttribute('data-goToPage', currentPage +1);
        };
    };   
};

const changePag = () => {
    let prevBtn$ = document.querySelector('#prevPag');
    let nextBtn$ = document.querySelector('#nextPag');
    prevBtn$.addEventListener('click', goToPage);
    nextBtn$.addEventListener('click', goToPage);
    

}

function goToPage() {
    let url = this.getAttribute('data-url');
    let newPage = this.getAttribute('data-goToPage');
    console.log(url, newPage);
}



init();
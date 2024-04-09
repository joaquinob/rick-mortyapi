const init = async () => {
    let data = await getCharacters();
    
    showCharacters(data.results);
    refreshPag(data.info);
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
    main$.innerHTML='';

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
        main$.appendChild(characters$);
        
}

};

const refreshPag = (info) => {
    let currentPage$ = document.querySelector('#current');
    let currentPage = parseInt(currentPage$.textContent);
    let nextBtn$ = document.querySelector('#nextPag');
    let prevBtn$ = document.querySelector('#prevPag');

    if(info){ 
        if (info.prev === null && info.prev === 'https://rickandmortyapi.com/api/character?page=1'){
            prevBtn$.removeAttribute('data-goToPage');
            prevBtn$.setAttribute('disabled');
        };
        if (info.prev){
            prevBtn$.removeAttribute('disabled');
            prevBtn$.setAttribute('data-url', info.prev);
            prevBtn$.setAttribute('data-goToPage', currentPage -1);
        };
        if (info.next === null && info.next === 'https://rickandmortyapi.com/api/character?page=42'){
            nextBtn$.removeAttribute('data-goToPage');
            nextBtn$.setAttribute('disabled');
        };
        if (info.next){
            nextBtn$.removeAttribute('disabled');
            nextBtn$.setAttribute('data-url', info.next);
            nextBtn$.setAttribute('data-goToPage', currentPage +1);
        }; };
        console.log(nextBtn$);
        console.log(prevBtn$)
};

const changePag = () => {
    let prevBtn$ = document.querySelector('#prevPag');
    let nextBtn$ = document.querySelector('#nextPag');
    prevBtn$.addEventListener('click', goToPage);
    nextBtn$.addEventListener('click', goToPage);
    

}

async function goToPage() {
    let newUrl = this.getAttribute('data-url');
    let newPage = this.getAttribute('data-goToPage');
    let data = await getCharacters(newUrl, newPage);
    showCharacters(data.results);
    refreshPag(data.info);
    console.log(newUrl);
    console.log(newPage);
};

init();
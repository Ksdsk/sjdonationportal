const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.category.toLowerCase().includes(searchString) ||    
            character.demographic.toLowerCase().includes(searchString) ||
            character.alias.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        const res = await fetch('/donation/charities-search.txt');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <a class="grid-item"> <!--target="_blank" rel="noopener" TARGET-->
            <div class="overlay-top">
              <h1>${character.name}</h1>
            </div>
            <div class="logocontainer">
              <img src="${character.image}" alt="${character.alt}" />
            </div>
            <div class="overlay-bot">
                <p>${character.desc}</p>
              <section class="buttons">
                    <div class="containerbutton" onclick="${character.onclick}">
                      <div class="btn btn-1">
                        <svg>
                          <rect x="0" y="0" fill="none" width="100%" height="100%"/>
                        </svg>
                       See More & Donate
                    </div>
                    </div>
                  </section>
            </div>
            </a>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();


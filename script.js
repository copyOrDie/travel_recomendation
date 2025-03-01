//set up variables
let searchResult = document.getElementById("search-result");
let inputSearch = document.getElementById("search-input");
const btnSearch = document.getElementById("search-button");
const btnReset = document.getElementById("reset-button");
const btnContact = document.getElementById("contact-button");
const btnBook = document.getElementById("book");


// Reset results
function resetSearchResult() {
    searchResult.innerHTML = ''
};

//Update DOM
function updateDom(data) {
    resetSearchResult();
    for (city of data) {
        searchResult.innerHTML +=
            `<div class="mb-4">
                    <div class="card">
                        <img src="${city.imageUrl}" class="card-img-top" alt="${city.name}">
                        <div class="card-body">
                            <h5 class="card-title text-muted">${city.name}</h5>
                            <p class="card-text"><small class="text-muted">${city.description}</small></p>
                        </div>
                    </div>
                </div>`;
    };
};

// fetch api
async function fetchTravelData() {

    try {
        const response = await fetch('travel_recommendation_api.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        };
        const data = await response.json();
        // Let's process the data here and update the DOM
        let inputData = inputSearch.value.trim().toLowerCase();

        //search for countries
        for (let i = 0; i < data.countries.length; i++) {
            if (data.countries[i].name.toLowerCase() === inputData) {
                const countryCities = data.countries[i].cities;

                //update DOM
                updateDom(countryCities);
                return
            };

        };

        // other searches
        if (data.hasOwnProperty(inputData)) {
            const cities = data[inputData];
            //Update DOM
            updateDom(cities);
        } else {
            //Update DOM with not found message
            searchResult.innerHTML =
                `<div class="mb-4">
                    <div class="card">
                        <img src="./assets/cities/tryagain.jpg" class="card-img-top" alt="Try again">
                        <div class="card-body">
                            <h5 class="card-title text-muted">We can't give you any recommendation</h5>
                            <p class="card-text"><small class="text-muted">Maybe you mistype some char or something like that</small></p>
                        </div>
                    </div>
                </div>`;
        };



    } catch (error) {
        console.error('Error fetching travel data:', error);
    };
};

btnSearch.addEventListener('click', fetchTravelData);
btnReset.addEventListener('click', resetSearchResult);
btnBook.addEventListener('click', function () { alert("Thanks for Booking!!!"); });

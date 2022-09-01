const loadCocktail =async (searchText, dataLimits) =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res = await fetch(url)
    const data = await res.json()
    displayCocktail(data.drinks, dataLimits);
}
const displayCocktail = (cocktails, dataLimits) =>{
    const cocktailContainer = document.getElementById('card-container');
    const showAll = document.getElementById('show');
    cocktailContainer.innerHTML = '';
    //show all display
    if(dataLimits && cocktails.length > 9){
        cocktails = cocktails.slice(0,9);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    cocktails.forEach(cocktail =>{
        console.log(cocktail);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${cocktail.strDrink}</h5>
                    <p class="card-text">${cocktail.strInstructions.slice(0,200)}</p>
                    <button onclick="loadCocktailDetails(${cocktail.idDrink})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                    </button>
                </div>
            </div>
        `;
        cocktailContainer.appendChild(div);
    })
}
const processSearch = (dataLimits) =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadCocktail(searchText,dataLimits);
}
document.getElementById('search-btn').addEventListener('click',function(){
    processSearch(9);
    
})
//show all
document.getElementById('show-all').addEventListener('click',function(){
    processSearch();
})
//modal load
const loadCocktailDetails = (cocktailId) =>{
    // console.log("object");
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
    .then(res => res.json())
    .then(data => displayCocktailDetails(data.drinks[0]))
}
const displayCocktailDetails = (cocktail) =>{
    console.log(cocktail);
    const title = document.getElementById('exampleModalLabel');
    title.innerText = cocktail.strDrink;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Category: ${cocktail.strCategory}, ${cocktail.strAlcoholic}</h5>
            <p class="card-text">Instructions: ${cocktail.strInstructions}</p>
        </div>
    `;
    modalBody.appendChild(div);
}

loadCocktail("a");
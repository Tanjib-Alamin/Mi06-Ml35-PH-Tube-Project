

function loadCatagories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then((data) =>  displayCategories(data.categories))
}




function displayCategories(categories) {
    const categoriesContainer = document.getElementById('catagory-container');

    for (let cat of categories) {
        console.log(cat)
        const catagoryDiv = document.createElement('div');
        catagoryDiv.innerHTML = `

         <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>

        `

        categoriesContainer.appendChild(catagoryDiv)
    }
}

loadCatagories();
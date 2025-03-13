
const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden")
    document.getElementById("videos_container").classList.add("hidden")
}
const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden")
    document.getElementById("videos_container").classList.remove("hidden")
}




function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (let btn of activeButtons) {
        btn.classList.remove("active");
    }

}


// fetch api

function loadCatagories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then((data) =>  displayCategories(data.categories))
}

function loadVideos(searchtext = '') {
    showLoader()
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchtext}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            document.getElementById("btn_all").classList.add("active")
            displayVideos(data.videos)
        })
}

const loadCatagoriesVideos = (id) => {
    showLoader();
    
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    console.log(url)
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const clickedButton = document.getElementById(`btn-${id}`)
            clickedButton.classList.add("active");
            console.log(clickedButton)
            displayVideos(data.category)
        })
}

const loadVideoDetails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    fetch(url)
        .then(res => res.json())
    .then(data=> displayVideoDetails(data.video))
}

const displayVideoDetails = (video) => {
    document.getElementById("video_details").showModal()
    const detailsContainer = document.getElementById("details_container");
    detailsContainer.innerHTML = `
       
        <div class="card bg-base-100 image-full  shadow-sm">
            <figure>
                <img
                src="${video.thumbnail}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${video.title}</h2>
                <h3 class="card-title">${video.verified}</h3>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-end">
                </div>
            </div>
        </div>
    `
    
}


function displayCategories(categories) {
    const categoriesContainer = document.getElementById('catagory-container');

    for (let cat of categories) {
        
        const catagoryDiv = document.createElement('div');
        catagoryDiv.innerHTML = `

         <button id="btn-${cat.category_id}" onclick="loadCatagoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>

        `

        categoriesContainer.appendChild(catagoryDiv)
    }
}



// authors
// : // {profile_picture: 'https://i.ibb.co/XVHM7NP/kevin.jpg', profile_name: 'Kevin Hart', verified: false}
// [{…}]
// category_id
// : 
// "1001"
// description
// : 
// "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// others
// : 
// {views: '100K', posted_date: '16278'}
// thumbnail
// : 
// "https://i.ibb.co/L1b6xSq/shape.jpg"
// title
// : 
// "Shape of You"
// video_id
// : 
// "aaaa"

const displayVideos = (videos) => {

    const videoContainer = document.getElementById("videos_container");
    videoContainer.innerHTML = "";
    if (videos.length == 0) {
        videoContainer.innerHTML = `
        <div class=" py-24 col-span-full flex flex-col justify-center items-center">
                <img class="w-[120px]" src="images/Icon.png" alt="">
                <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
            </div>
        `;
        hideLoader()
        return;
    }

    videos.forEach(video => {
        console.log(video)

        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
            <div class="card bg-base-100 ">
            <figure class="relative">
                <img class="w-full h-[250px] object-cover" src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white bg-black px-2 py-1 rounded-sm text-sm">3hrs 56 min ago</span>
            </figure>
          
            <div class=" flex gap-3 px-0 py-5">

                    <div class="profile">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100  rounded-full w-10 ring ring-offset-2">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>

                    <div class="intro">
                        <h2 class="text-sm font-semibold">Midnight Serenade</h2>
                        <p class="text-sm text-gray-400 flex gap-3">
                        ${video.authors[0].profile_name}
                        ${video.authors[0].verified == true ? ` <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">`: ``}
                        
                         </p>
                        <p class="text-sm text-gray-400">${video.others.views}</p>
                    </div>
                
            </div>
            <button onclick=loadVideoDetails("${video.video_id}") class="btn btn-block">Show Details</button>
        </div>
            
        `

        videoContainer.appendChild(videoCard);
    })

    hideLoader()
}

document.getElementById("search_input").addEventListener("keyup", (e) => {
    const input = e.target.value;
    loadVideos(input);

}
)








loadCatagories();

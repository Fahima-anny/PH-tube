const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then( res => res.json() )
    .then( data => displayData(data.categories) )
    .catch(error => console.log(error))
}

function displayCategoryVideos(id){
// alert(id)
fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
.then( res => res.json() )
.then( data => {
    displayVideo(data.category)
    activeBtn(id)
} )
.catch(error => console.log(error))

}


const displayData = (catagories) => {
    let buttonContainer = document.getElementById('buttonContainer') ;
    // console.log(catagories)
    for(let item of catagories){
// console.log(item.category_id)
let buttonDiv = document.createElement("div") ;
buttonDiv.innerHTML = `
<button id='btn-${item.category_id}' onClick='displayCategoryVideos(${item.category_id})' class='btn category-btn'>${item.category}</button>
` ;
buttonContainer.appendChild(buttonDiv) ;
    }

}


const loadVideo = (searchTxt='') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchTxt}`)
    .then( res => res.json() )
    .then( data => displayVideo(data.videos) )
    .catch(error => console.log(error))
}

const displayVideo = (videos) => {
    let videoContainer = document.getElementById('videoContainer') ;
    videoContainer.innerHTML = ''

if(videos.length === 0){
    videoContainer.classList.remove('grid')
    videoContainer.innerHTML = `  <section class="flex gap-5 flex-col justify-center items-center">
    <img src="./IMAGES/Icon.png" alt="">
    <h2 class="font-bold text-3xl text-center">OOPS!! Sorry is no <br>
    content here .
    </h2>
</section>  `
return ;
}
else{
    videoContainer.classList.add('grid')

}

    // console.log(catagories)
    for(let video of videos){
// console.log(video)
let card = document.createElement("div") ;
card.innerHTML = `
  <figure class='h-[200px] rounded relative'>
    <img
       src=${video.thumbnail}
        class="w-full h-full object-cover"
      alt="Shoes" />
       ${video.others.posted_date?.length == 0 ? '' : `<span class='absolute text-[10px] right-2 bottom-2 bg-black px-1 text-white'> ${getTime(video.others.posted_date)} </span>`}
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture}>
    </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class=' flex items-center gap-4'>
    <p class="text-gray-400">${video.authors[0].profile_name}</p>
    ${video.authors[0].verified ? `<img class='w-4' src='https://img.icons8.com/?size=40&id=41638&format=png'  >` : ''}
    
    </div>
    <p>
    <button onclick="loadVideoDetails('${video.video_id}')" class='btn btn-error btn-sm'>  Details
    </button>
    </p>
    </div>

  </div>
` 
card.classList = 'card card-compact' ;
videoContainer.append(card) ;
    }
}

async function loadVideoDetails(videoId) {
    // console.log(videoId)
    let url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}` 
    const res = await fetch(url) ;
    const data = await res.json() ;
    displayDetails(data.video)
}

function displayDetails(video){
    console.log(video) ;
    const modalContainer = document.getElementById('modalContainer') ;
    modalContainer.innerHTML = `
    <img src=${video.thumbnail} alt="">
<p>${video.description}</p>
    `
    document.getElementById('categoryModal').showModal() ;
}


function activeBtn(id){
    // console.log(id)
let categoryBtn = document.getElementsByClassName('category-btn')
for(let btn of categoryBtn){
    btn.classList.remove('bg-red-600','text-white')
    btn.classList.add('text-black')
}
 let button = document.getElementById(`btn-${id}`)
//  console.log(button)
 button.classList.add('text-white','bg-red-600')
 button.classList.remove('text-black')

}


function getTime(time){
    let hour = parseInt(time / 3600) ;
    let remainingSeconds = time % 3600 ;
    let minute = parseInt(remainingSeconds / 60) ;
    remainingSeconds = remainingSeconds % 60 ;
    return `${hour}hr ${minute}min ${remainingSeconds}s ago`
}
// console.log(getTime(16278))


document.getElementById("searchInp").addEventListener("keyup",(e)=>{
    loadVideo(e.target.value)
})

loadVideo()
loadData()
const cl = console.log;

const toggleModalBtns = document.querySelectorAll('.toggleModal');
const movieModal = document.getElementById('movieModal');
const backDrop = document.getElementById('backDrop');
const display = document.getElementById('display');

const movieForm = document.getElementById('movieForm');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');

const movieNameControl = document.getElementById('movieName');
const posterurlControl = document.getElementById('posterurl');
const overviewControl = document.getElementById('overview');
const ratingControl = document.getElementById('rating');

const dataArray = [
    {
        movieName: 'Ghajini',
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjk3ZmQyYjAtZTgwZS00YjliLTljZmEtMDU1Nzk1Y2NhYmRlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        overview: "Hit by an iron rod, Sanjay suffers from a condition that prevents him from remembering anything beyond fifteen minutes. With notes tattooed on his body, he sets out to find his fiancee's killer.",
        rating: 4,
        id: uuid()
    },
    {
        movieName: 'Zero',
        posterUrl: 'https://stat4.bollywoodhungama.in/wp-content/uploads/2016/08/Zero-001-1.jpg',
        overview: 'Bauua, a person of short stature, falls in love with Aafia, a scientist suffering from cerebral palsy, but soon breaks up with her. Later, what he learns of Aafia changes his life forever.',
        rating: 2,
        id: uuid()
    },
    {
        movieName: 'Rocky Aur Rani Kii Prem Kahaani',
        posterUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ69CKZwY4DN_aX--vUq95HgrqY2_jT7DtrEufUBIZjrwBFQ-V9iXCJIQqrcCODiajuEI8jhANa8Crn7OXjHGJL7dFwzCcxWFGDdxF8aA',
        overview: "Flamboyant Punjabi Rocky and intellectual Bengali journalist Rani fall in love despite their differences. After facing family opposition, they decide to live with each other's relatives for three months before getting married.",
        rating: 3,
        id: uuid()
    },
    {
        movieName: 'Adipurush',
        posterUrl: 'https://www.bollywoodhungama.com/wp-content/uploads/2020/08/WhatsApp-Image-2023-06-15-at-1.28.59-PM.jpeg',
        overview: 'Raghava, the prince of Ayodhya, lives in exile alongside his wife Janaki and brother Shesh. When the king of Lanka kidnaps Janaki, Raghava and his allies set out to rescue her.',
        rating: 1,
        id: uuid()
    },
    {
        movieName: 'Chhaava',
        posterUrl: 'https://m.media-amazon.com/images/I/61-lNA-rD5L.jpg',
        overview: "Shivaji Maharaj's death sparks the Maratha-Mughal conflict. His son Sambhaji Maharaj leads resistance against Aurangzeb's forces. Amid battles and intrigue, both sides face challenges in a struggle for power.",
        rating: 5,
        id: uuid()
    }
];

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const ratingColor = (rating) => {
    if(rating == 1){
        return `#ff4545`
    }
    else if(rating == 2){
        return `#ffa534`
    }
    else if(rating == 3){
        return `#ffe234`
    }
    else if(rating == 4){
        return `#b7dd29`
    }
    else if(rating == 5){
        return `#57e32c`
    }
};

const templating = (arr) => {
    let result = ``
    arr.forEach(obj => {
        result += `<div class="col-md-3 mb-4" id="${obj.id}">
        <div class="card text-white movieCard">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="mb-0">${obj.movieName}</h4>
                <span class="badge p-0">${obj.rating}
                    <i style="color: ${ratingColor(obj.rating)}" class="fa-solid fa-star"></i>
                </span>
            </div>
            <div class="card-body pt-0 pb-0">
                <div class="content">
                    <img src="${obj.posterUrl}" alt="${obj.movieName}" title="${obj.movieName}">
                    <div class="caption p-2">
                        <h5>${obj.movieName}</h5>
                        <p class="mb-0 text-justify">${obj.overview}</p>
                    </div>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between">
                <button type="button" onClick="onEdit(this)" class="secBtn btn btn-sm">Edit</button>
                <button type="button" onClick="onRemove(this)" class="priBtn btn btn-sm">Remove</button>
            </div>
        </div>
    </div>`
    })

    display.innerHTML = result
};

templating(dataArray);

const showNewCard = (obj) => {
    let newCard = document.createElement('div')

    newCard.innerHTML = `<div class="card text-white movieCard">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h4 class="mb-0">${obj.movieName}</h4>
        <span class="badge p-0">${obj.rating}
            <i style="color: ${ratingColor(obj.rating)}" class="fa-solid fa-star"></i>
        </span>
    </div>
    <div class="card-body pt-0 pb-0">
        <div class="content">
            <img src="${obj.posterUrl}" alt="${obj.movieName}" title="${obj.movieName}">
            <div class="caption p-2">
                <h5>${obj.movieName}</h5>
                <p class="mb-0 text-justify">${obj.overview}</p>
            </div>
        </div>
    </div>
    <div class="card-footer d-flex justify-content-between">
        <button type="button" onClick="onEdit(this)" class="secBtn btn btn-sm">Edit</button>
        <button type="button" onClick="onRemove(this)" class="priBtn btn btn-sm">Remove</button>
    </div>
</div>`

    newCard.id = obj.id
    newCard.className = `col-md-3 mb-4`

    display.prepend(newCard)  
};

const showUpdatedCard = (obj) => {
    let updateCard = document.getElementById(`${editId}`)
    updateCard.innerHTML = `<div class="card text-white movieCard">
    <div class="card-header d-flex justify-content-between align-items-center">
        <h4 class="mb-0">${obj.movieName}</h4>
        <span class="badge p-0">${obj.rating}
            <i style="color: ${ratingColor(obj.rating)}" class="fa-solid fa-star"></i>
        </span>
    </div>
    <div class="card-body pt-0 pb-0">
        <div class="content">
            <img src="${obj.posterUrl}" alt="${obj.movieName}" title="${obj.movieName}">
            <div class="caption p-2">
                <h5>${obj.movieName}</h5>
                <p class="mb-0 text-justify">${obj.overview}</p>
            </div>
        </div>
    </div>
    <div class="card-footer d-flex justify-content-between">
        <button type="button" onClick="onEdit(this)" class="secBtn btn btn-sm">Edit</button>
        <button type="button" onClick="onRemove(this)" class="priBtn btn btn-sm">Remove</button>
    </div>
</div>`
};

const onToggleModal = () => {
    backDrop.classList.toggle('active');
    movieModal.classList.toggle('active');

    movieForm.reset()
    addBtn.classList.remove('d-none')
    updateBtn.classList.add('d-none')
};

const onMovieAdd = (eve) => {
    eve.preventDefault()

    let newObj = {
        movieName: movieNameControl.value,
        posterUrl: posterurlControl.value,
        overview: overviewControl.value,
        rating: ratingControl.value,
        id: uuid()
    }

    dataArray.unshift(newObj)

    onToggleModal()

    showNewCard(newObj)

    Swal.fire({
        title: "Movie added successfully !!!",
        icon: "success"
      })
};

let editId;
const onEdit = (ele) => {
    editId = ele.closest('.col-md-3').id
    let editObj = dataArray.find(x => x.id === editId)

    onToggleModal()

    movieNameControl.value = editObj.movieName
    posterurlControl.value = editObj.posterUrl
    overviewControl.value = editObj.overview
    ratingControl.value = editObj.rating

    addBtn.classList.add('d-none')
    updateBtn.classList.remove('d-none')
}

const onMovieUpdate = () => {
    let updateId = editId

    if(movieNameControl.value && posterurlControl.value && overviewControl.value && ratingControl.value){
        let updateObj = {
            movieName: movieNameControl.value,
            posterUrl: posterurlControl.value,
            overview: overviewControl.value,
            rating: ratingControl.value,
            id: updateId
        }
    
        let updateObjInd = dataArray.findIndex(x => x.id === updateId)

        dataArray[updateObjInd] = updateObj

        showUpdatedCard(updateObj)
    
        onToggleModal()

        Swal.fire({
            title: "Movie updated successfully !!!",
            icon: "success"
          })
    }else{
        Swal.fire({
            title: "Field can't be empty !!!",
            icon: "warning"
          })
    }
};

const onRemove = (ele) => {

    Swal.fire({
        title: "Are you sure to remove this Movie?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Remove"
      }).then((result) => {
        if (result.isConfirmed) {
            let removeId = ele.closest('.col-md-3').id
    let removeObjInd = dataArray.findIndex(x => x.id === removeId)

    dataArray.splice(removeObjInd, 1)

    ele.closest('.col-md-3').remove()

    Swal.fire({
        title: "Movie deleted successfully !!!",
        icon: "success"
      })
        }
      });    
}; 

toggleModalBtns.forEach(btn => btn.addEventListener('click', onToggleModal));
movieForm.addEventListener('submit', onMovieAdd);
updateBtn.addEventListener('click', onMovieUpdate);
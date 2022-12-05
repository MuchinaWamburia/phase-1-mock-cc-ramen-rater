// write your code here
let ramenMenu = document.querySelector("#ramen-menu");
getAllRamen();
formEventListener();

function getAllRamen(){
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(ramenItems)
}
//helper function to create image
function ramenItems(ramenArray){
    ramenArray.forEach(ramen => {
               renderImage(ramen);
    })
}

function renderImage(ramen){
    let img = document.createElement("img")
    img.src = ramen.image 
    img.alt = ramen.name 
    img.dataset.id = ramen.id 
    ramenMenu.append(img)

    img.addEventListener("click", function(event){
                getRamen(event.target.dataset.id);
    })
}

function getRamen(ramenId){
    fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then(response => response.json())
    .then(ramen => {
        renderDetails(ramen)
    })
}

function renderDetails(ramen){
      let img = document.querySelector(".detail-image");
    let h2 = document.querySelector(".name");
    let h3 = document.querySelector(".restaurant");
    let ratingInput = document.querySelector("#rating")
    ratingInput.value = ramen.rating 
    let commentInput = document.querySelector("#comment")
    commentInput.value = ramen.comment
    img.src = ramen.image;
    img.alt = ramen.name; 
    h2.textContent = ramen.name
    h3.textContent = ramen.restaurant 
    let ramenForm = document.querySelector("#ramen-rating")
    ramenForm.dataset.id = ramen.id;
}

function formEventListener(){

    let ramenForm = document.querySelector("#ramen-rating")
    ramenForm.addEventListener("submit", function(event) {
        e.preventDefault();
    
        let newRating = document.querySelector("#rating").value
        let newComment = document.querySelector("#comment").value
            let updatedObj = {
            id: parseInt(ramenForm.dataset.id),
            rating: newRating,
            comment: newComment
        }

        updateRamen(updatedObj);
        event.target.reset();
    })
}

function updateRamen(updatedObj){

    fetch(`http://localhost:3000/ramens/${updatedObj.id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedObj),
})
.then(response => response.json())
.then(updatedObj => {
    let ratingInput = document.querySelector("#rating")
    let commentInput = document.querySelector("#comment")
    ratingInput.value = updatedObj.rating
    commentInput.value = updatedObj.comment
    
})

}
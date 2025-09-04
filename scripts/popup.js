let content = document.querySelector(".content");
let profileName = content.querySelector(".profile__name");
let profileDescription = content.querySelector(".profile__description");
let profileEditPopup = document.querySelector (".popup");
let profileEditForm = profileEditPopup.querySelector(".popup__container__form");
let profileEditButton = content.querySelector(".profile__button-edit");
let profileEditCloseButton = profileEditPopup.querySelector(".popup__button__close");
let profileEditInputName = profileEditPopup.querySelector(".popup__container__form_name");
let profileEditInputAbout = profileEditPopup.querySelector(".popup__container__form_about");
let likeButtons = content.querySelectorAll(".button_heart");

function openPopup (popup){
    popup.classList.add("popup__show")
}
function closePopup (popup){
    popup.classList.remove("popup__show")
}

profileEditButton.addEventListener("click", ()=>{
    profileEditInputName.value = profileName.textContent;
    profileEditInputAbout.value = profileDescription.textContent;
    openPopup(profileEditPopup)
})

profileEditForm.addEventListener("submit", (evt)=>{
    evt.preventDefault();
    profileName.textContent = profileEditInputName.value;
    profileDescription.textContent = profileEditInputAbout.value;
    closePopup(profileEditPopup);
})

profileEditCloseButton.addEventListener("click", ()=>{
    closePopup(profileEditPopup)
})
document.addEventListener("keydown", (evt)=>{
    if(evt.key == "Escape"){
        closePopup(profileEditPopup)
    }
})

function heartLiked (heart){
    heart.classList.add("button_heart__liked")
}

function heartDisliked (heart){
    heart.classList.remove("button_heart__liked")
}

likeButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        button.classList.toggle("button_heart__liked")
    })
})

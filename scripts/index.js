const initialCards = [
  { name: "Valle de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"},
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"},
  { name: "Montañas Calvas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"},
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"},
  { name: "Parque Nacional de la Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"},
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"},
];

const content = document.querySelector(".content");
const addCardButton = content.querySelector(".profile__button-add");
const gallery = document.querySelector(".gallery");
const profileEditButton = content.querySelector(".profile__button-edit");
const profileName = content.querySelector(".profile__name");
const profileDescription = content.querySelector(".profile__description");

const profileEditPopup = document.querySelector(".popup__edit");
const profileEditForm = profileEditPopup.querySelector(".popup__form-edit");
const profileEditInputName = profileEditPopup.querySelector(".popup__input-name");
const profileEditInputAbout = profileEditPopup.querySelector(".popup__input-about");
const profileEditCloseButton = profileEditPopup.querySelector(".popup__button-close");

const addCardPopup = document.querySelector (".popup__add");
const addCardForm = addCardPopup.querySelector(".popup__form-add");
const addCardCloseButton = addCardPopup.querySelector(".popup__button-close");

const imagePopup = document.querySelector(".popup__image");
const imagePopupBig = imagePopup.querySelector(".popup__picture");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__button-close");

const likeButtons = content.querySelectorAll(".gallery__button-heart");

function openPopup (popup){
    popup.classList.add("popup__show")
}
function closePopup (popup){
    popup.classList.remove("popup__show")
}

function addCard(name, link) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("gallery__frame");

    cardElement.innerHTML = `
        <img src="${link}" alt="${name}" class="gallery__image"/>
        <button class="gallery__button-delete"></button>
        <div class="gallery__footer">
            <p class="gallery__text">${name}</p>
            <button type="button" class="gallery__button-heart"></button>
        </div>
    `;

const likeButton = cardElement.querySelector(".gallery__button-heart");
likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("gallery__button-heart_liked");
})

const deleteButton = cardElement.querySelector(".gallery__button-delete");
deleteButton.addEventListener("click", () => {
    cardElement.remove();
});

const image = cardElement.querySelector(".gallery__image");
image.addEventListener("click", () => {
    imagePopupBig.src = link;
    imagePopupBig.alt = name;
    imagePopupCaption.textContent = name;
    openPopup(imagePopup);
});

return cardElement;

}

initialCards.forEach(card => {
    const cardElement = addCard(card.name, card.link);
    gallery.append(cardElement);
})

addCardButton.addEventListener("click", () => {
    openPopup(addCardPopup);
});

addCardCloseButton.addEventListener("click", () => {
    closePopup(addCardPopup);
});

addCardForm.addEventListener("submit", (evt) =>{
    evt.preventDefault();
    const titleInput = addCardForm.querySelector(".popup__input-title");
    const linkInput = addCardForm.querySelector(".popup__input-link");

    const newCard = addCard(titleInput.value, linkInput.value);
    gallery.prepend(newCard);

    addCardForm.reset();
    closePopup(addCardPopup);
});

imagePopupCloseButton.addEventListener("click", () => {
    closePopup(imagePopup);
});

profileEditButton.addEventListener("click", ()=>{
    profileEditInputName.value = profileName.textContent;
    profileEditInputAbout.value = profileDescription.textContent;
    openPopup(profileEditPopup)
});

profileEditForm.addEventListener("submit", (evt)=>{
    evt.preventDefault();
    profileName.textContent = profileEditInputName.value;
    profileDescription.textContent = profileEditInputAbout.value;
    closePopup(profileEditPopup);
});

profileEditCloseButton.addEventListener("click", ()=>{
    closePopup(profileEditPopup)
});

document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target === popup) {
            closePopup(popup)
        }
    });
});

document.addEventListener("keydown", (evt)=>{
    if(evt.key == "Escape"){
        closePopup(profileEditPopup)
    }
});


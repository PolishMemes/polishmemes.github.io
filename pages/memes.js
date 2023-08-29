window.addEventListener("load", async () => {
   const memesData = await fetchMemes();
   const language = localStorage.getItem('language') || 'en'; // Pobierz aktualny język z local storage

   const memeContainer = document.getElementById("memeContainer");
   const body = document.body;

   memesData.forEach(memeData => {
      const memeCard = createMemeCard(memeData, language); // Przekazuj język do funkcji tworzącej kartę mema
      memeContainer.appendChild(memeCard);
   });

   memeContainer.addEventListener("click", (event) => {
      const memeTitle = event.target.closest(".meme-title");
      if (memeTitle) {
         const fullTitle = memeTitle.dataset.fullTitle;

         const overlay = document.createElement("div");
         overlay.classList.add("overlay");
         body.appendChild(overlay);

         const memeModal = document.createElement("div");
         memeModal.classList.add("meme-modal");
         memeModal.innerHTML = `
            <div class="meme-modal-content">
               <span class="meme-modal-close">&times;</span>
               <h2 class="meme-modal-title">${fullTitle}</h2>
            </div>
         `;
         body.appendChild(memeModal);

         memeModal.addEventListener("click", (e) => {
            if (e.target.classList.contains("meme-modal") || e.target.classList.contains("meme-modal-close")) {
               body.removeChild(memeModal);
            }
         });
      }

      const memeImage = event.target.closest(".meme-thumbnail");
      if (memeImage) {
         const originalImageSrc = memeImage.src;

         const memeModal = document.createElement("div");
         memeModal.classList.add("meme-modal");
         memeModal.innerHTML = `
            <div class="meme-modal-content">
               <span class="meme-modal-close">&times;</span>
               <img class="full-image" src="${originalImageSrc}" alt="Full Meme Image">
            </div>
         `;
         body.appendChild(memeModal);

         memeModal.addEventListener("click", (e) => {
            if (e.target.classList.contains("meme-modal") || e.target.classList.contains("meme-modal-close")) {
               body.removeChild(memeModal);
            }
         });
      }
   });
});

async function fetchMemes() {
   const response = await fetch("/data/memes.json");
   const memesData = await response.json();
   return memesData;
}

function createMemeCard(memeData, language) {
   const memeCard = document.createElement("div");
   memeCard.classList.add("meme-card");

   const memeFrame = document.createElement("div");
   memeFrame.classList.add("meme-frame");
   memeFrame.innerHTML = `<h2 class="meme-title" data-full-title="${memeData.title}">${truncateTitle(memeData.title)}</h2>`;
   memeCard.appendChild(memeFrame);

   const memeDetails = document.createElement("div");
   memeDetails.classList.add("meme-details");

   const memeMedia = memeData.mediaType === "video"
      ? createVideoElement(memeData.mediaUrl)
      : createImageElement(memeData.mediaUrl);

   memeDetails.appendChild(memeMedia);

   const memeInfo = document.createElement("div");
   memeInfo.classList.add("meme-info");

   const memeDate = document.createElement("p");
   memeDate.classList.add("meme-date");
   memeDate.textContent = `${memeData.date}`;
   memeInfo.appendChild(memeDate);
   
   const memeAuthor = document.createElement("p");
   memeAuthor.classList.add("meme-author");
   memeAuthor.textContent = `${memeData.author}`;
   memeInfo.appendChild(memeAuthor);
   
   memeDetails.appendChild(memeInfo);

   memeCard.appendChild(memeDetails);

   return memeCard;
}

function translate(language, key) {
   const translations = {
      // Wklej tutaj tłumaczenia z pliku /data/translations.json
   };

   return translations[language] && translations[language][key] ? translations[language][key] : key;
}

function createVideoElement(src) {
   const memeVideo = document.createElement("video");
   memeVideo.classList.add("meme-video");
   memeVideo.src = src;
   memeVideo.type = "video/mp4";
   memeVideo.controls = true;
   return memeVideo;
}

function createImageElement(src) {
   const memeImage = document.createElement("img");
   memeImage.classList.add("meme-thumbnail"); // Zastosuj tę klasę dla obrazka również
   memeImage.src = src;
   return memeImage;
}

function truncateTitle(title) {
   const maxLength = 15;
   if (title.length > maxLength) {
      return title.substring(0, maxLength) + "...";
   }
   return title;
}

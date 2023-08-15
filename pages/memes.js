// Przykładowa lista memów (możesz zastąpić własnymi danymi)
const memes = [
    "meme1.jpg",
    "meme2.jpg",
    "meme3.jpg",
    // ... (kontynuuj z listą memów)
 ];
 
 let displayedMemes = 0;
 
 function loadMoreMemes() {
    const memesContainer = document.getElementById("memesContainer");
    const loadMoreButton = document.getElementById("loadMoreButton");
 
    const batchSize = 50;
    for (let i = displayedMemes; i < Math.min(displayedMemes + batchSize, memes.length); i++) {
       const memeUrl = "/memes/" + memes[i];
 
       const memeElement = document.createElement("img");
       memeElement.src = memeUrl;
       memeElement.alt = "Meme";
       memesContainer.appendChild(memeElement);
    }
 
    displayedMemes += batchSize;
 
    if (displayedMemes >= memes.length) {
       loadMoreButton.style.display = "none";
    }
 }
 
 loadMoreMemes();
 
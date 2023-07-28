// Przykładowa funkcja do przesyłania mema i jego nazwy do serwera
function uploadMeme(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const filename = document.getElementById("filename").value;
    const fileInput = document.getElementById("image");
  
    if (fileInput.files.length === 0) {
      alert("Please select a file to upload.");
      return;
    }
  
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("title", title);
    formData.append("filename", filename);
    formData.append("image", file);
  
    // Tutaj dodaj logikę do wysłania mema na serwer
    // np. używając Axios lub innej biblioteki HTTP do wywołania odpowiedniego endpointu
    // na serwerze w celu przeniesienia mema do katalogu "/memes/memes_pending"
    // oraz wyświetlenia powiadomienia użytkownikowi o pomyślnym przesłaniu
  
    axios.post("/upload_meme", formData)
      .then(response => {
        console.log(response.data.message);
        showNotification("Meme successfully submitted for verification.");
      })
      .catch(error => {
        console.error("Error uploading meme:", error);
        showNotification("Error uploading meme. Please try again later.");
      });
  }
  
  function showNotification(message) {
    const notificationMessage = document.getElementById("notificationMessage");
    notificationMessage.textContent = message;
    notificationMessage.style.display = "block";
  
    setTimeout(() => {
      notificationMessage.style.display = "none";
    }, 5000); // Powiadomienie zniknie po 5 sekundach
  }
  
  // Pozostały kod...
  
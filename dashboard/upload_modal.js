function showUploadModal() {
    const uploadModal = document.getElementById('uploadModal');
    if (uploadModal) {
      uploadModal.style.display = 'block';
    }
  }
  
  function cancelUpload() {
    const uploadModal = document.getElementById('uploadModal');
    if (uploadModal) {
      uploadModal.style.display = 'none';
    }
  }
  
  function uploadMeme(event) {
    event.preventDefault();
  
    const titleInput = document.getElementById('title');
    const imageInput = document.getElementById('image');
  
    const title = titleInput.value;
    const image = imageInput.files[0];
  
    if (!title || !image) {
      return;
    }
  
    // Przykładowe żądanie do serwera, aby przesłać dane mema
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
  
    axios.post('/dashboard/upload', formData)
      .then(response => {
        console.log(response.data);
        // Tutaj możesz dodać obsługę odpowiedzi od serwera po przesłaniu mema
        // Na przykład, wyświetlenie komunikatu sukcesu lub odświeżenie strony
      })
      .catch(error => {
        console.error(error);
        // Tutaj możesz dodać obsługę błędów, np. wyświetlenie komunikatu o błędzie
      });
  }
  
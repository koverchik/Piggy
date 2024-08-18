import './bootstrap';

const fileInput = document.getElementById('avatarImageUpload');
const uploadForm = document.getElementById('avatarImageUploadForm');

fileInput.addEventListener('change', function() {
     if (this.files.length > 0) {
         uploadForm.submit();
     }
 });

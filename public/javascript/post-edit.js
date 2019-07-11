let postEditForm = document.getElementById('postEditForm');
postEditForm.addEventListener('submit', function (event) {
    let imageUploads = document.getElementById('image-upload').files.length;
    let existingImages = document.querySelectorAll('.image-delete').length;
    let imgDeletions = document.querySelectorAll('.image-delete:checked').length;
    let newTotal = existingImages - imgDeletions + imageUploads;
    if(newTotal > 4) {
        event.preventDefault();
        let removalAmt = newTotal - 4;
        alert(`You need to remove at least ${removalAmt} (more) image${removalAmt > 1 ? 's' : ''}!`)
    }
});

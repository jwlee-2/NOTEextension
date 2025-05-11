document.addEventListener('DOMContentLoaded', () => {
    const newNoteButton = document.querySelector('button:nth-of-type(1)'); // Select the "new note" button

    newNoteButton.addEventListener('click', () => {
        // Open a new window with popup.html
        const popupWindow = window.open(
            '../popups/popup.html', // Path to popup.html
            '_blank', // Open in a new tab or window
            'width=400,height=500,top=100,left=100,resizable=no,scrollbars=no'
        );

        // Check if the popup was blocked
        if (!popupWindow) {
            alert('Popup blocked! Please allow popups for this website.');
        }
    });
});

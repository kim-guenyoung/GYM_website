document.addEventListener("DOMContentLoaded", function () {
    var titles = document.querySelectorAll('.th-title');
    titles.forEach(function (title) {
        title.addEventListener('click', function () {
            var content = title.parentNode.nextElementSibling;
            if (content.style.display === 'none' || content.style.display === '') {
                content.style.display = 'table-row';
            } else {
                content.style.display = 'none';
            }
        });
    });
});



const eventLink = document.getElementById('eventLink');
const eventImage = document.getElementById('eventImage');

// Add a click event listener to the link
eventLink.addEventListener('click', function(event) {
// Prevent the default behavior of the link
event.preventDefault();

// Toggle the visibility of the event image
if (eventImage.style.display === 'none') {
    eventImage.style.display = 'block';
} else {
    eventImage.style.display = 'none';
}
});
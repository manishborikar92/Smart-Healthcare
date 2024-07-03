document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('result').innerHTML = 'Predicted Class: ' + data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
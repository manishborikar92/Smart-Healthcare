document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var formData = new FormData();
    formData.append('file', document.getElementById('fileInput').files[0]);
    
    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        var resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<p>Predicted Class: ${data.class_name}</p>`;
        resultDiv.innerHTML += `<p>Probabilities: ${data.probabilities}</p>`;
    })
    .catch(error => console.error('Error:', error));
});

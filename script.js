const form = document.getElementById('applicationForm');
const result = document.getElementById('result');
const displayData = document.getElementById('displayData');
const photoInput = document.getElementById('photo');
const fileNameDisplay = document.getElementById('fileName');

photoInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        fileNameDisplay.textContent = '✓ ' + this.files[0].name;
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        fullName: document.getElementById('fullName').value,
        studentId: document.getElementById('studentId').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value,
        program: document.getElementById('program').value,
        year: document.getElementById('year').value,
        submittedAt: new Date().toISOString()
    };

    // Save to JSON file (download)
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `application_${formData.studentId}_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    // Display the data
    let html = '';
    for (let key in formData) {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        html += `
            <div class="result-item">
                <div class="result-label">${label}</div>
                <div class="result-value">${formData[key]}</div>
            </div>
        `;
    }

    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            html += `
                <div class="result-item">
                    <div class="result-label">Profile Photo</div>
                    <img src="${e.target.result}" alt="Profile" class="photo-preview">
                </div>
            `;
            displayData.innerHTML = html;
            result.style.display = 'block';
            result.scrollIntoView({ behavior: 'smooth' });
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        displayData.innerHTML = html;
        result.style.display = 'block';
        result.scrollIntoView({ behavior: 'smooth' });
    }
});
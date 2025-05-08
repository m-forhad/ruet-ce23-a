let studentEmail = "";

function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);
  studentEmail = data.email;

  document.getElementById('form-section').style.display = 'block';
  document.getElementById('login-section').style.display = 'none';

  // Fetch existing data
  fetch(`https://script.google.com/macros/s/AKfycbyYiuZv0DIi8dOIdAJfQMBKzQS0xY9GV7_8dMFyBoMm-OIyZkqvE0SGYMWTSZ6yUJRvlA/exec?email=${encodeURIComponent(studentEmail)}`)
    .then(res => res.json())
    .then(data => {
      if (data?.Name) {
        document.querySelector('[name="Name"]').value = data.Name;
        document.querySelector('[name="Roll"]').value = data.Roll;
        document.querySelector('[name="School"]').value = data.School;
        document.querySelector('[name="College"]').value = data.College;
        document.querySelector('[name="Hometown"]').value = data.Hometown;
        document.querySelector('[name="Facebook"]').value = data.Facebook;
        document.querySelector('[name="Instagram"]').value = data.Instagram;
        document.querySelector('[name="WhatsApp"]').value = data.WhatsApp;
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
    });
}

// Submit form handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("student-form");

  form?.addEventListener("submit", async (e) => {
    //e.preventDefault();

    document.getElementById('loader').style.width = '100%';
    
    const formData = new FormData(form);
    const file = formData.get("Photo");

    const reader = new FileReader();
    reader.onload = async function () {
      const base64String = reader.result.split(',')[1];

      const payload = {
        Email: studentEmail,
        Name: formData.get("Name"),
        Roll: formData.get("Roll"),
        School: formData.get("School"),
        College: formData.get("College"),
        Hometown: formData.get("Hometown"),
        Facebook: formData.get("Facebook"),
        Instagram: formData.get("Instagram"),
        WhatsApp: formData.get("WhatsApp"),
        PhotoBase64: base64String
      };

      const res = await fetch("https://script.google.com/macros/s/AKfycbyYiuZv0DIi8dOIdAJfQMBKzQS0xY9GV7_8dMFyBoMm-OIyZkqvE0SGYMWTSZ6yUJRvlA/exec", {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });

      if (res.ok) {
        window.location.href = "https://ruet-ce-23-a.netlify.app/";
      } else {
        alert("Error submitting.");
      }
    };

    reader.readAsDataURL(file);
  });
});


// Convert uploaded file to base64
let base64Photo = "";
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    base64Photo = reader.result.split(",")[1];
    document.getElementById("photoUrlPreview").src = reader.result;
  };
  reader.readAsDataURL(file);
}

// This function is called after Google Sign-In
function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  const email = profile.getEmail();
  document.getElementById("userEmail").value = email;

  // Call the backend to get existing data for this user
  fetch(`https://script.google.com/macros/s/AKfycbz_ZQYWBch81acPqa5yf0RkpMwJO8IZDyDb3pGNbamlmnewUGSohUnruaNXJa9U1keaPg/exec?email=${email}`)
    .then(res => res.json())
    .then(data => {
      if (data.Name) {
        document.getElementById("Name").value = data.Name;
        document.getElementById("Roll").value = data.Roll;
        document.getElementById("School").value = data.School;
        document.getElementById("College").value = data.College;
        document.getElementById("Hometown").value = data.Hometown;
        document.getElementById("Facebook").value = data.Facebook;
        document.getElementById("Instagram").value = data.Instagram;
        document.getElementById("Whatsapp").value = data.WhatsApp;
        document.getElementById("photoUrlPreview").src = data.PhotoURL;
      }
    })
    .catch(err => console.error("Error fetching user data:", err));
}

// Submit form handler
function submitForm() {
  const email = document.getElementById("userEmail").value;
  const formData = {
    Email: email,
    Name: document.getElementById("Name").value,
    Roll: document.getElementById("Roll").value,
    School: document.getElementById("School").value,
    College: document.getElementById("College").value,
    Hometown: document.getElementById("Hometown").value,
    Facebook: document.getElementById("Facebook").value,
    Instagram: document.getElementById("Instagram").value,
    WhatsApp: document.getElementById("Whatsapp").value,
    PhotoBase64: base64Photo // set elsewhere during upload
  };

  fetch("https://script.google.com/macros/s/AKfycbz_ZQYWBch81acPqa5yf0RkpMwJO8IZDyDb3pGNbamlmnewUGSohUnruaNXJa9U1keaPg/exec", {
    redirect: "follow",
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => alert("Data submitted successfully!"))
    .catch(err => alert("Error submitting data:" + err));
}

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

let studentEmail = "";

function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);
  studentEmail = data.email;

  document.getElementById('form-section').style.display = 'block';
  document.getElementById('login-section').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("student-form");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

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

      const res = await fetch("https://script.google.com/macros/s/AKfycbz_ZQYWBch81acPqa5yf0RkpMwJO8IZDyDb3pGNbamlmnewUGSohUnruaNXJa9U1keaPg/exec", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });

      if (res.ok) {
        alert("Success!");
        form.reset();
      } else {
        alert("Error submitting.");
      }
    };

    reader.readAsDataURL(file);
  });
});

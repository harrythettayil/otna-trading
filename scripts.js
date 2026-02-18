// Parallax Effect for Hero Section
window.addEventListener("scroll", function () {
  const hero = document.querySelector(".hero");
  let scrollPosition = window.pageYOffset;

  hero.style.backgroundPositionY = scrollPosition * 0.7 + "px";
});

// Scroll Animations
const animatedElements = document.querySelectorAll(".animated");

const checkScroll = () => {
  animatedElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add("fadeIn");
    }
  });
};

window.addEventListener("scroll", checkScroll);
window.addEventListener("load", checkScroll);

document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".menu-items li a");
  const menuToggle = document.querySelector(
    ".navbar-container input[type='checkbox']"
  );
  const form = document.getElementById("form");
  const popup = document.getElementById("popup");
  const submitButton = document.getElementById("submit");
  const closePopupButton = document.getElementById("closePopup");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Disable button and change text
    submitButton.disabled = true;
    submitButton.textContent = "Please wait...";

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          showPopup();
        } else {
          alert(json.message);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong!");
      })
      .finally(() => {
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = "Send";
      });
  });

  function showPopup() {
    popup.style.display = "block";
  }

  function closePopup() {
    popup.style.display = "none";
  }

  closePopupButton.addEventListener("click", closePopup);

  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      menuToggle.checked = false;
    });
  });
});

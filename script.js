const nav = document.querySelector(".nav"),
  searchIcon = document.querySelector("#searchIcon"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");


navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
  nav.classList.remove("openSearch");
  searchIcon.classList.replace("uil-times", "uil-search");
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});




//producr slider
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

// Show the current slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
  document.querySelector('.slides').style.transform = `translateX(-${index * 100}%)`;
}

// Previous Button
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
  showSlide(currentIndex);
});

// Next Button
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
  showSlide(currentIndex);
});

// Auto Slide
setInterval(() => {
  nextButton.click();
}, 3000);




//review section
document.addEventListener("DOMContentLoaded", () => {
  const reviewForm = document.getElementById("reviewForm");
  const reviewsContainer = document.getElementById("reviewsContainer");

  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const review = document.getElementById("customerReview").value.trim();
    const rating = document.getElementById("rating").value;

    if (name && review) {
      addReview(name, review, rating);
      reviewForm.reset();
    }
  });

  function addReview(name, review, rating) {
    const reviewDiv = document.createElement("div");
    reviewDiv.classList.add("review");

    reviewDiv.innerHTML = `
      <div class="name">${name}</div>
      <div class="rating">${'★'.repeat(rating)} ${rating} Star(s)</div>
      <div class="content">${review}</div>
      <div class="menu">
        ⋮
        <div class="menu-options">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      </div>
    `;

    reviewDiv.querySelector(".menu").addEventListener("click", (e) => {
      const menuOptions = reviewDiv.querySelector(".menu-options");
      menuOptions.style.display =
        menuOptions.style.display === "block" ? "none" : "block";
    });

    reviewDiv.querySelector(".edit").addEventListener("click", () => {
      const newReview = prompt("Edit your review:", review);
      if (newReview) {
        reviewDiv.querySelector(".content").textContent = newReview;
      }
    });

    reviewDiv.querySelector(".delete").addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this review?")) {
        reviewsContainer.removeChild(reviewDiv);
      }
    });

    reviewsContainer.appendChild(reviewDiv);
  }
});


//payment and order
document.addEventListener("DOMContentLoaded", () => {
  const orderForm = document.getElementById("orderForm");
  const paymentMethod = document.getElementById("paymentMethod");
  const gpayDetails = document.getElementById("gpayDetails");
  const payNowButton = document.getElementById("payNow");
  const ordersLink = document.getElementById("ordersLink");
  const ordersList = document.getElementById("ordersList");
  const myOrdersSection = document.getElementById("myOrders");

  let orders = [];

  // Show GPay Details if Selected
  paymentMethod.addEventListener("change", () => {
    if (paymentMethod.value === "gpay") {
      gpayDetails.classList.remove("hidden");
    } else {
      gpayDetails.classList.add("hidden");
    }
  });

  // Mock Payment Request with GPay
  payNowButton.addEventListener("click", () => {
    alert(
      "Redirecting to Google Pay... Please complete the payment to proceed."
    );
    window.location.href = `upi://pay?pa=9342534538@ibl&pn=Host&mc=0000&tid=123456789012345&tr=uniqueTransactionId&tn=Payment+for+order&am=100&cu=INR`;
  });

  // Submit Order Form
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const payment = paymentMethod.value;

    if (payment === "gpay") {
      const paymentConfirmed = confirm(
        "Have you completed the payment on Google Pay?"
      );

      if (!paymentConfirmed) {
        alert("Payment not completed. Please try again.");
        return;
      }
    }

    // Add Order to Orders List
    const order = {
      name,
      email,
      phone,
      address,
      payment,
      date: new Date().toLocaleString(),
    };
    orders.push(order);

    alert("Order Confirmed!");
    addOrderToList(order);
    orderForm.reset();
  });

  // Display Orders in Orders Section
  function addOrderToList(order) {
    const orderItem = document.createElement("li");
    orderItem.textContent = `Order by ${order.name} on ${order.date}`;
    ordersList.appendChild(orderItem);
  }

  // Navigate to My Orders
  ordersLink.addEventListener("click", (e) => {
    e.preventDefault();
    myOrdersSection.classList.remove("hidden");
  });
});


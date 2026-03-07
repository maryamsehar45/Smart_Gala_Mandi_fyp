// Active navigation auto-set
document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav a");
    
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});
// Admin dashboard
function showSection(id) {
  document.querySelectorAll('.section').forEach(sec =>
    sec.classList.remove('active')
  );
  document.getElementById(id).classList.add('active');
}

function deleteRow(btn) {
  btn.closest("tr").remove();
  updateCounts();
}

function updateCounts() {
  document.getElementById("sellersCount").innerText =
    document.querySelectorAll("#sellers table tr").length - 1;

  document.getElementById("buyersCount").innerText =
    document.querySelectorAll("#buyers table tr").length - 1;

  document.getElementById("productsCount").innerText =
    document.querySelectorAll("#products table tr").length - 1;
}

updateCounts();

/* ANALYTICS */
new Chart(document.getElementById("dailyVisits"), {
  type: "line",
  data: {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [{
      label: "Daily Visits",
      data: [120,200,150,300,250,400,380],
      borderColor: "#43c45f",
      borderWidth: 2
    }]
  }
});

new Chart(document.getElementById("monthlyVisits"), {
  type: "bar",
  data: {
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],
    datasets: [{
      label: "Monthly Visits",
      data: [1200,1800,2400,2100,3000,3500],
      backgroundColor: "#43c45f"
    }]
  }
});
/* ======================
   LOGIN PAGE SCRIPT
====================== */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // ✅ Fake seller object (demo)
    const seller = {
      email: email,
      name: email.split("@")[0]   // name auto
    };

    // ✅ Save fake login session
    localStorage.setItem("loggedSeller", JSON.stringify(seller));

    // ✅ Redirect to dashboard
    window.location.href = "dashboard.html";
  });
}


/* ======================
   SIGNUP PAGE SCRIPT
====================== */
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Signup successful (demo)");
    window.location.href = "login.html";
  });
}

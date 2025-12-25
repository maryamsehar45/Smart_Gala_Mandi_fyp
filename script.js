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

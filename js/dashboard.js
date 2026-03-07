/* =======================================================
   SECTION TOGGLE (SIDEBAR NAVIGATION)
   ======================================================= */
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.style.display = "none";
    sec.classList.remove("active");
  });

  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.style.display = "block";
    activeSection.classList.add("active");
  }

  document.querySelectorAll("#sidebar .nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("onclick")?.includes(sectionId)) {
      link.classList.add("active");
    }
  });
}


/* =======================================================
   CURRENT TIME (HH:MM only – NO SECONDS)
   ======================================================= */
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getCurrentDate() {
  return new Date().toLocaleDateString();
}


/* =======================================================
   SAMPLE PRODUCTS
   ======================================================= */
let products = [
  {
    name: "Fresh Apples",
    price: 1200,
    category: "Fruits",
    image: "assets/apple.jpeg",
    addedDate: getCurrentDate(),
    addedTime: getCurrentTime()
  },
  {
    name: "Red Tomatoes",
    price: 50,
    category: "Vegetables",
    image: "assets/potato.jpeg",
    addedDate: getCurrentDate(),
    addedTime: getCurrentTime()
  }
];


/* =======================================================
   RENDER LISTINGS TABLE  ✅ FIXED
   ======================================================= */
function renderListings() {
  const tbody = document.querySelector("#listingsTable tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  products.forEach((p, idx) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <img src="${p.image}" style="width:60px;height:45px;object-fit:cover;border-radius:8px">
      </td>
      <td>${p.name}</td>
      <td>Rs. ${p.price}</td>
      <td>${p.category}</td>
      <td>${p.addedDate}<br><small>${p.addedTime}</small></td>
      <td>
        <button class="btn btn-sm btn-success me-1" onclick="openEdit(${idx})">
          Update
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteListing(${idx})">
          Delete
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  document.getElementById("totalProducts").innerText = products.length;
  document.getElementById("activeListings").innerText = products.length;
}


/* =======================================================
   EDIT PRODUCT
   ======================================================= */
function openEdit(idx) {
  showSection("addProductSection");

  const p = products[idx];
  document.getElementById("productName").value = p.name;
  document.getElementById("productCategory").value = p.category;
  document.getElementById("productImage").value = p.image;
  document.getElementById("productPrice").value = p.price;

  document.getElementById("saveProduct").dataset.edit = idx;
}


/* =======================================================
   DELETE PRODUCT
   ======================================================= */
function deleteListing(idx) {
  if (confirm("Delete this product?")) {
    products.splice(idx, 1);
    renderListings();
  }
}


/* =======================================================
   SAVE PRODUCT (ADD / UPDATE)
   ======================================================= */
document.getElementById("saveProduct")?.addEventListener("click", () => {
  const name = document.getElementById("productName").value.trim();
  const category = document.getElementById("productCategory").value;
  const price = Number(document.getElementById("productPrice").value) || 0;
  const image = document.getElementById("productImage").value || "assets/hero.png";

  if (!name) {
    alert("Product name required");
    return;
  }

  const editIdx = document.getElementById("saveProduct").dataset.edit;

  if (editIdx !== undefined) {
    products[editIdx] = {
      ...products[editIdx],
      name,
      category,
      price,
      image
    };
    delete document.getElementById("saveProduct").dataset.edit;
  } else {
    products.push({
      name,
      category,
      price,
      image,
      addedDate: getCurrentDate(),
      addedTime: getCurrentTime()
    });
  }

  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productImage").value = "";

  showSection("listingsSection");
  renderListings();
});


/* =======================================================
   PROVINCE → CITY DROPDOWN
   ======================================================= */
const citiesByProvince = {
  punjab: ["Lahore", "Faisalabad", "Multan"],
  sindh: ["Karachi", "Hyderabad", "Sukkur"],
  kpk: ["Peshawar", "Mardan", "Abbottabad"],
  balochistan: ["Quetta", "Gwadar"],
  gilgit: ["Gilgit", "Skardu"],
  ajk: ["Muzaffarabad", "Mirpur"]
};

const province = document.getElementById("province");
const city = document.getElementById("city");

province?.addEventListener("change", function () {
  city.innerHTML = `<option disabled selected>Select City</option>`;
  citiesByProvince[this.value]?.forEach(c => {
    const opt = document.createElement("option");
    opt.textContent = c;
    city.appendChild(opt);
  });
});


/* =======================================================
   INITIAL LOAD
   ======================================================= */
document.addEventListener("DOMContentLoaded", () => {
  showSection("dashboardSection");
  renderListings();
});

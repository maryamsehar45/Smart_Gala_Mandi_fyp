/* =======================================================
   SECTION SWITCHING (SIDEBAR NAVIGATION)
   ======================================================= */
function showSection(sectionId) {
  
  document.querySelectorAll(".section").forEach(sec => {
    sec.style.display = "none";
    sec.classList.remove("active");
  });

  // Sirf selected section show karo
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.style.display = "block";
    activeSection.classList.add("active");
  }

  // Sidebar me active link highlight karo
  document.querySelectorAll("#sidebar .nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("onclick")?.includes(sectionId)) {
      link.classList.add("active");
    }
  });
}


/* =======================================================
   DATE & TIME FUNCTIONS
   ======================================================= */

// Current time (HH:MM)
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

// Current date
function getCurrentDate() {
  return new Date().toLocaleDateString();
}


/* =======================================================
   PRODUCTS ARRAY (FRONTEND STORAGE)
   ======================================================= */


let products = [
  {
    name: "Fresh Apples",
    price: 1200,
    quantity: 10,
    category: "Fruits",
    image: "assets/apple.jpeg",
    addedDate: getCurrentDate(),
    addedTime: getCurrentTime()
  },
  {
    name: "Red Tomatoes",
    price: 50,
    quantity: 25,
    category: "Vegetables",
    image: "assets/potato.jpeg",
    addedDate: getCurrentDate(),
    addedTime: getCurrentTime()
  }
];


/* =======================================================
   RENDER TABLE (LISTINGS SHOW KARNA)
   ======================================================= */
function renderListings() {
  const tbody = document.querySelector("#listingsTable tbody");
  if (!tbody) return;

  tbody.innerHTML = ""; // purani rows remove

  // Har product ko table row me convert karo
  products.forEach((p, idx) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <img src="${p.image}" style="width:60px;height:45px;object-fit:cover;border-radius:8px">
      </td>
      <td>${p.name}</td>
      <td>Rs. ${p.price}</td>
      <td>${p.quantity}</td>
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

  // Dashboard stats update
  document.getElementById("totalProducts").innerText = products.length;
  document.getElementById("activeListings").innerText = products.length;
}


/* =======================================================
   EDIT PRODUCT
   ======================================================= */
function openEdit(idx) {
  showSection("addProductSection");

  const p = products[idx];

  // Form me data fill karo
  document.getElementById("productName").value = p.name;
  document.getElementById("productCategory").value = p.category;
  document.getElementById("productPrice").value = p.price;
  document.getElementById("productQuantity").value = p.quantity;

  // Image preview 
  const preview = document.getElementById("imagePreview");
  if (preview) {
    preview.src = p.image;
    preview.style.display = "block";
  }

  // edit mode 
  document.getElementById("saveProduct").dataset.edit = idx;
}


/* =======================================================
   DELETE PRODUCT
   ======================================================= */
function deleteListing(idx) {
  if (confirm("Delete this product?")) {
    products.splice(idx, 1); // array se remove
    renderListings(); // table refresh
  }
}


/* =======================================================
   IMAGE PREVIEW
   ======================================================= */
document.getElementById("productImage")?.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const preview = document.getElementById("imagePreview");
    preview.src = URL.createObjectURL(file); // temporary image URL
    preview.style.display = "block";
  }
});


/* =======================================================
   SAVE PRODUCT (ADD / UPDATE)
   ======================================================= */
document.getElementById("saveProduct")?.addEventListener("click", () => {

  // Form values read karo
  const name = document.getElementById("productName").value.trim();
  const category = document.getElementById("productCategory").value;
  const price = Number(document.getElementById("productPrice").value) || 0;
  const quantity = Number(document.getElementById("productQuantity").value) || 0;

  const imageInput = document.getElementById("productImage");

  let image = "assets/hero.png"; // default image

  // Agar user ne file select ki hai
  if (imageInput.files && imageInput.files[0]) {
    image = URL.createObjectURL(imageInput.files[0]);
  }

  // Validation
  if (!name) {
    alert("Product name required");
    return;
  }

  if (quantity <= 0) {
    alert("Enter valid quantity");
    return;
  }

  const editIdx = document.getElementById("saveProduct").dataset.edit;

  // UPDATE case
  if (editIdx !== undefined) {
    products[editIdx] = {
      ...products[editIdx],
      name,
      category,
      price,
      quantity,
      image
    };

    delete document.getElementById("saveProduct").dataset.edit;
  }

  // ADD case
  else {
    products.push({
      name,
      category,
      price,
      quantity,
      image,
      addedDate: getCurrentDate(),
      addedTime: getCurrentTime()
    });
  }

  // Form reset
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productQuantity").value = "";
  document.getElementById("productImage").value = "";

  const preview = document.getElementById("imagePreview");
  if (preview) preview.style.display = "none";

  // Listings page par jao
  showSection("listingsSection");

  // Table update karo
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

// Province change → cities load
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
  showSection("dashboardSection"); // default page
  renderListings(); // empty table
});
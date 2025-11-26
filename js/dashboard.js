function getCurrentTime() {
 const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 → 12

  return `${hours}:${minutes} ${ampm}`;
}

/* =======================================================
   SAMPLE PRODUCTS WITH TIMESTAMPS INCLUDED
   ======================================================= */
let products = [
  {
    name: 'Fresh Apples',
    price: 1200,
    category: 'Fruits',
    image: 'assets/apple.jpeg',
    addedAt:  getCurrentTime()
  },
  {
    name: 'Red Tomatoes',
    price: 50,
    category: 'Vegetables',
    image: 'assets/potato.jpeg',
    addedAt:  getCurrentTime()
  }
];


/* =======================================================
   RENDER LISTINGS TABLE
   ======================================================= */
function renderListings() {
  const tbody = document.querySelector('#listingsTable tbody');
  tbody.innerHTML = '';

  products.forEach((p, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${p.image}" style="width:56px;height:40px;object-fit:cover;border-radius:8px"></td>
      <td>${p.name}</td>
      <td>Rs. ${p.price}</td>
      <td>${p.category}</td>
      <td>${p.addedAt || "—"}</td>
      <td>
        <button class="btn btn-sm btn-success me-1" onclick="openEdit(${idx})">
          <i class='bi bi-pencil'></i> Update
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteListing(${idx})">
          <i class='bi bi-trash'></i> Delete
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('totalProducts').textContent = products.length;
  document.getElementById('activeListings').textContent = products.length;
}


/* =======================================================
   COPY LISTING FOR QUICK EDIT
   ======================================================= */
function copyListing(idx) {
  const p = products[idx];
  document.getElementById('productName').value = p.name;
  document.getElementById('productCategory').value = p.category;
  document.getElementById('productImage').value = p.image;
  document.getElementById('productPrice').value = p.price;
  document.getElementById('productQuantity').value = '1';
  document.getElementById('productDescription').value = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* =======================================================
   OPEN EDIT MODE
   ======================================================= */
function openEdit(idx) {
  const p = products[idx];
  document.getElementById('productName').value = p.name;
  document.getElementById('productCategory').value = p.category;
  document.getElementById('productImage').value = p.image;
  document.getElementById('productPrice').value = p.price;
  document.getElementById('productQuantity').value = '1';
  document.getElementById('productDescription').value = '';
  document.getElementById('saveProduct').dataset.edit = idx;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* =======================================================
   DELETE LISTING
   ======================================================= */
function deleteListing(idx) {
  if (confirm('Delete this listing?')) {
    products.splice(idx, 1);
    renderListings();
  }
}


/* =======================================================
   SAVE PRODUCT (ADD OR UPDATE)
   ======================================================= */
document.getElementById('saveProduct').addEventListener('click', function () {

  const name = document.getElementById('productName').value.trim();
  const category = document.getElementById('productCategory').value;
  const image = document.getElementById('productImage').value || 'assets/hero.png';
  const price = Number(document.getElementById('productPrice').value) || 0;

  if (!name) {
    alert('Please enter product name');
    return;
  }

  const editIdx = this.dataset.edit;

  if (editIdx !== undefined) {
    // UPDATE MODE
    products[editIdx] = {
      ...products[editIdx],
      name,
      category,
      image,
      price
    };
    delete this.dataset.edit;
  } else {
    // ADD NEW PRODUCT
    products.push({
      name,
      price,
      category,
      image,
      addedAt: getCurrentTime()

    });
  }

  // Reset form
  document.getElementById('productName').value = '';
  document.getElementById('productImage').value = '';
  document.getElementById('productPrice').value = '';

  renderListings();
});


/* =======================================================
   CANCEL SAVE
   ======================================================= */
document.getElementById('cancelSave').addEventListener('click', function () {
  document.getElementById('productName').value = '';
  document.getElementById('productImage').value = '';
  document.getElementById('productPrice').value = '';
  delete document.getElementById('saveProduct').dataset.edit;
});


/* Scroll to Add Form */
document.getElementById('showAddForm').addEventListener('click', () => {
  document.getElementById('addProductCard').scrollIntoView({ behavior: 'smooth' });
});


/* =======================================================
   PROVINCE → CITY DROPDOWN
   ======================================================= */
const citiesByProvince = {
  punjab: ["Lahore", "Faisalabad", "Multan", "Rawalpindi", "Gujranwala", "Sialkot", "Bahawalpur", "Sargodha"],
  sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Mirpur Khas", "Badin"],
  kpk: ["Peshawar", "Abbottabad", "Mardan", "Swat", "Kohat", "Charsadda"],
  balochistan: ["Quetta", "Gwadar", "Turbat", "Khuzdar", "Zhob"],
  gilgit: ["Gilgit", "Skardu", "Hunza", "Nagar"],
  ajk: ["Muzaffarabad", "Mirpur", "Kotli", "Bhimber"]
};

const provinceDropdown = document.getElementById("province");
const cityDropdown = document.getElementById("city");

provinceDropdown.addEventListener("change", function () {
  const selectedProvince = this.value;
  cityDropdown.innerHTML = `<option disabled selected>Select City</option>`;

  citiesByProvince[selectedProvince].forEach(function (city) {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    cityDropdown.appendChild(option);
  });
});


/* INITIAL RENDER */
renderListings();


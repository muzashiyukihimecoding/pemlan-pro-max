import { Ebook } from "./ebook.js";
import { PrintedBook } from "./printedbook.js";

const bookList = [];
let editIndex = null;

const form = document.getElementById("bookForm");
const tbody = document.getElementById("bookTableBody");
const totalEl = document.getElementById("totalBooks");
// const searchTitle = document.getElementById("searchTitle");
const filterAuthor = document.getElementById("filterAuthor");
const filterCategory = document.getElementById("filterCategory");
const infoUpdate = document.getElementById("infoUpdate");
const cancelBtn = document.getElementById("batalUpdate");

function generateUniqueId() {
   let id;
   do {
      id = Math.floor(10000 + Math.random() * 90000).toString();
   } while (bookList.some((book) => book.id === id));
   return id;
}

form.addEventListener("submit", (e) => {
   e.preventDefault();

   const titleEl = document.getElementById("title");
   const authorEl = document.getElementById("author");
   const categoryEl = document.getElementById("category");
   const type = document.getElementById("type").value;

   const title = titleEl.value.trim();
   const author = authorEl.value.trim();
   const category = categoryEl.value.trim();
   const id = editIndex === null ? generateUniqueId() : bookList[editIndex].id;

   [titleEl, authorEl, categoryEl].forEach((el) => (el.style.borderColor = ""));
   let errorMsg = "";
   if (!title) {
      titleEl.style.borderColor = "red";
      errorMsg += "Judul tidak boleh kosong\n";
   }
   if (!author) {
      authorEl.style.borderColor = "red";
      errorMsg += "Penulis tidak boleh kosong\n";
   }
   if (!category) {
      categoryEl.style.borderColor = "red";
      errorMsg += "Kategori tidak boleh kosong\n";
   }
   if (!type) {
      errorMsg += "Anda Wajib Mengisi Tipe Buku";
   }

   if (errorMsg) {
      alert("Input tidak valid:\n" + errorMsg);
      return;
   }

   const book =
      type === "ebook"
         ? new Ebook(id, title, author, category)
         : new PrintedBook(id, title, author, category);

   if (editIndex !== null) {
      bookList[editIndex] = book;
      form.querySelector("button").textContent = "Tambah Buku";
      infoUpdate.style.display = "none";
      editIndex = null;
   } else {
      bookList.push(book);
   }

   form.reset();
   renderTable();

   // setTimeout(() => {
   //    document
   //       .getElementById("totalPrinted")
   //       .scrollIntoView({ behavior: "smooth" });
   // }, 50);
});

// Form Result
function renderTable() {
   // const searchT = searchTitle.value.trim().toLowerCase();
   const filterA = filterAuthor.value.trim().toLowerCase();
   const filterC = filterCategory.value.trim().toLowerCase();

   tbody.innerHTML = "";
   let total = 0;
   let totalEbooks = 0;
   let totalPrinted = 0;

   bookList.forEach((book, index) => {
      if (
         // (!searchT || book.title.toLowerCase().includes(searchT)) &&
         (!filterA || book.author.toLowerCase().includes(filterA)) &&
         (!filterC || book.category.toLowerCase().includes(filterC))
      ) {
         const tr = document.createElement("tr");
         tr.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.category}</td>
        <td>${book.type}</td>
        <td>
          <div class="action-buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Hapus</button>
          </div
        </td>
      `;

         tr.querySelector(".edit-btn").onclick = () => {
            document.getElementById("title").value = book.title;
            document.getElementById("author").value = book.author;
            document.getElementById("category").value = book.category;
            document.getElementById("type").value = book.type
               .toLowerCase()
               .includes("ebook")
               ? "ebook"
               : "printed";

            form.querySelector("button").textContent = "Simpan Perubahan";
            infoUpdate.style.display = "block";
            editIndex = index;

            // Smooth scroll to form for editing book informations
            setTimeout(() => {
               document
                  .getElementById("editAlert")
                  .scrollIntoView({ behavior: "smooth" });
            }, 50);
         };

         tr.querySelector(".delete-btn").onclick = () => {
            const confirmDelete = confirm(
               `Apakah Anda yakin ingin menghapus buku dengan ID ${book.id}?`
            );
            if (confirmDelete) {
               bookList.splice(index, 1);
               renderTable();
            }
         };

         tbody.appendChild(tr);
         total++;

         if (book.type === "E-book") totalEbooks++;
         if (book.type === "Printed Book") totalPrinted++;
      }
   });

   totalEl.textContent = bookList.length;
   document.getElementById("totalEbooks").textContent = totalEbooks;
   document.getElementById("totalPrinted").textContent = totalPrinted;
}

filterAuthor.addEventListener("input", renderTable);
filterCategory.addEventListener("input", renderTable);
cancelBtn.addEventListener("click", () => {
   form.reset();
   editIndex = null;
   form.querySelector("button").textContent = "Tambah Buku";
   infoUpdate.style.display = "none";
});

// Function untuk Pencarian Buku (Filter)
const toggleButton = document.getElementById("toggleFilter");
const filterSection = document.querySelector(".filter");

toggleButton.addEventListener("click", () => {
   // const isVisible = filterSection.classList.contains("active");
   // filterSection.style.display = isVisible ? "none" : "block";
   const isVisible = filterSection.style.display === "flex";
   filterSection.style.display = isVisible ? "none" : "flex";
});

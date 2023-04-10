let input = document.getElementById("inputTag");
let imageName = document.getElementById("imageName");
let profilePic = document.querySelector(".avatar-img");
let labelForm = document.getElementById("add-friend-modal-label");
const addButtonModal = document.getElementById("addBtn");

let userData = [
  {
    id: 0,
    profilePicture: "img/avatar.png",
    name: "Rick Sanchez",
    state: "California",
    company: "Cotsco",
    job: "Bagger",
    contact: "11234567",
  },
  {
    id: 1,
    profilePicture: "img/avatar.png",
    name: "Eric Cartman",
    state: "Colorado",
    company: "Home Center",
    job: "Security",
    contact: "12345678",
  },
  {
    id: 2,
    profilePicture: "img/avatar.png",
    name: "Bart Simpson",
    state: "Oregon",
    company: "Cotsco",
    job: "Security",
    contact: "13456789",
  },
  {
    id: 3,
    profilePicture: "img/avatar.png",
    name: "Jane Doe",
    state: "California",
    company: "Wallmart",
    job: "Cashier",
    contact: "15699891",
  },
  {
    id: 4,
    profilePicture: "img/avatar.png",
    name: "John Doe",
    state: "Colorado",
    company: "Target",
    job: "Greeter",
    contact: "15699891",
  },
  {
    id: 5,
    profilePicture: "img/avatar.png",
    name: "John Smith",
    state: "Oregon",
    company: "Wallmart",
    job: "Cashier",
    contact: "15699891",
  },
  {
    id: 6,
    profilePicture: "img/avatar.png",
    name: "Jane Smith",
    state: "Oregon",
    company: "Target",
    job: "Bagger",
    contact: "15699891",
  },
];

/*Globals*/
const nameEl = document.getElementById("name-input");
const stateEl = document.getElementById("state-input");
const companyEl = document.getElementById("company-input");
const jobEl = document.getElementById("job-input");
const contactEl = document.getElementById("contact-input");
const addFriendBtn = document.getElementById("addFriend-btn");
const updateFriendBtn = document.getElementById("update-btn");
const registerForm = document.getElementById("register-form");
const tableData = document.getElementById("table-data");
const stateFilters = document.querySelectorAll(".state-filter");
const companyFilters = document.querySelectorAll(".company-filter");
let imgURL;
/*END Globals*/
// Load data from localStorage
if (localStorage.getItem("friendData") != null) {
  userData = JSON.parse(localStorage.getItem("friendData"));
}

// Function to apply filter based on selected checkboxes
const applyFilter = () => {
  let selectedCompanies = Array.from(
    document.querySelectorAll('input[name="company"]:checked')
  ).map((checkbox) => checkbox.value);
  let selectedStates = Array.from(
    document.querySelectorAll('input[name="state"]:checked')
  ).map((checkbox) => checkbox.value);

  // Filter the table rows based on selected companies and states
  let allRows = document.querySelectorAll("table tbody tr");
  allRows.forEach((row) => {
    let company = row.querySelector("td:nth-child(4)").textContent;
    let state = row.querySelector("td:nth-child(3)").textContent;
    if (
      (selectedCompanies.length === 0 || selectedCompanies.includes(company)) &&
      (selectedStates.length === 0 || selectedStates.includes(state))
    ) {
      row.style.display = ""; // Show the row if it matches the selected filters
    } else {
      row.style.display = "none"; // Hide the row if it does not match the selected filters
    }
  });
};
//Search by input
const searchEl = document.getElementById("searchInput");
searchEl.addEventListener("input", () => {
  searchData();
});
const searchData = () => {
  let tr = tableData.querySelectorAll("tr");
  let filter = searchEl.value.toLowerCase();
  let i;
  for (i = 0; i < tr.length; i++) {
    let name = tr[i].getElementsByTagName("td")[1].innerHTML;
    let state = tr[i].getElementsByTagName("td")[2].innerHTML;
    let company = tr[i].getElementsByTagName("td")[3].innerHTML;
    let job = tr[i].getElementsByTagName("td")[4].innerHTML;
    let contact = tr[i].getElementsByTagName("td")[5].innerHTML;
    if (name.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (state.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (company.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (job.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (contact.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
};
// Function to populate select options dynamically
function populateSelectOptions() {
  const select = document.getElementById("sortSelect");
  select.innerHTML = "";
  // Add default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = "Sort By";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  select.add(defaultOption);
  // Add sorting options
  const sortingOptions = [
    "A-Z Name",
    "Z-A Name",
    "A-Z State",
    "Z-A State",
    "A-Z Job",
    "Z-A Job",
    "Contact ASC",
    "Contact DESC",
  ];
  sortingOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.text = option;
    select.add(optionElement);
  });
}
populateSelectOptions();
// Function to sort data based on selected option
const sortData = () => {
  const select = document.getElementById("sortSelect");
  const selectedOption = select.value;
  switch (selectedOption) {
    case "A-Z Name":
      userData.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Z-A Name":
      userData.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "A-Z State":
      userData.sort((a, b) => a.state.localeCompare(b.state));
      break;
    case "Z-A State":
      userData.sort((a, b) => b.state.localeCompare(a.state));
      break;
    case "A-Z Job":
      userData.sort((a, b) => a.job.localeCompare(b.job));
      break;
    case "Z-A Job":
      userData.sort((a, b) => b.job.localeCompare(a.job));
      break;
    case "Contact ASC":
      userData.sort((a, b) => a.contact.localeCompare(b.contact));
      break;
    case "Contact DESC":
      userData.sort((a, b) => b.contact.localeCompare(a.contact));
      break;
    default:
      break;
  }
  getDataFromLocalStorage();
};
/*Return Data from localStorage*/
const getDataFromLocalStorage = () => {
  tableData.innerHTML = "";
  let companies = new Set(); // Use a Set to store unique company names
  let states = new Set(); // Use a Set to store unique state names
  userData.forEach((data, index) => {
    const row = document.createElement("tr");
    row.setAttribute("index", index);
    const profilePicTd = document.createElement("td");
    const profilePicImg = document.createElement("img");
    profilePicImg.classList.add("img-friend");
    profilePicImg.src = data.profilePicture;
    profilePicImg.width = 50;
    profilePicImg.height = 50;
    profilePicTd.appendChild(profilePicImg);
    row.appendChild(profilePicTd);

    const nameTd = document.createElement("td");
    nameTd.textContent = data.name;
    row.appendChild(nameTd);

    const stateTd = document.createElement("td");
    stateTd.textContent = data.state;
    row.appendChild(stateTd);

    const companyTd = document.createElement("td");
    companyTd.textContent = data.company;
    row.appendChild(companyTd);

    const jobTd = document.createElement("td");
    jobTd.textContent = data.job;
    row.appendChild(jobTd);

    const contactTd = document.createElement("td");
    contactTd.textContent = data.contact;
    row.appendChild(contactTd);

    const actionTd = document.createElement("td");
    const updateBtn = document.createElement("button");
    updateBtn.className = "btn btn-primary mr-2 update-btn";
    updateBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    actionTd.appendChild(updateBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger delete-btn";
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    actionTd.appendChild(deleteBtn);
    row.appendChild(actionTd);
    tableData.appendChild(row);

    companies.add(data.company);
    states.add(data.state);
  });

  // Create dynamic checkboxes for companies
  let companyFilterDiv = document.getElementById("company-filter");
  companyFilterDiv.innerHTML = ""; // Clear previous checkboxes
  companies.forEach((company) => {
    let checkbox = document.createElement("input");
    let checkBoxwp = document.createElement("div");
    checkbox.classList.add("mr-2");
    checkbox.type = "checkbox";
    checkbox.value = company;
    checkbox.id = `company-${company}`;
    checkbox.name = "company";
    let label = document.createElement("label");
    label.textContent = company;
    label.setAttribute("for", `company-${company}`);
    checkBoxwp.appendChild(checkbox);
    checkBoxwp.appendChild(label);
    companyFilterDiv.appendChild(checkBoxwp);
  });

  // Create dynamic checkboxes for states
  let stateFilterDiv = document.getElementById("state-filter");
  stateFilterDiv.innerHTML = ""; // Clear previous checkboxes
  states.forEach((state) => {
    let checkbox = document.createElement("input");
    let checkBoxwp = document.createElement("div");
    checkbox.classList.add("mr-2");
    checkbox.type = "checkbox";
    checkbox.value = state;
    checkbox.id = `state-${state}`;
    checkbox.name = "state";
    let label = document.createElement("label");
    label.textContent = state;
    label.setAttribute("for", `state-${state}`);
    checkBoxwp.appendChild(checkbox);
    checkBoxwp.appendChild(label);
    stateFilterDiv.appendChild(checkBoxwp);
  });

  // Add event listeners for filtering based on checkboxes
  let allCompanyCheckboxes = document.querySelectorAll('input[name="company"]');
  let allStateCheckboxes = document.querySelectorAll('input[name="state"]');
  allCompanyCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", applyFilter);
  });
  allStateCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", applyFilter);
  });

  //Delete
  let i;
  let allDeleteBtn = document.querySelectorAll(".delete-btn");
  for (i = 0; i < allDeleteBtn.length; i++) {
    allDeleteBtn[i].addEventListener("click", (event) => {
      let tr = event.currentTarget.parentElement.parentElement; // Use 'event.currentTarget'
      let id = tr.getAttribute("index");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary friend!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          userData.splice(id, 1);
          localStorage.setItem("friendData", JSON.stringify(userData));
          tr.remove();
          swal("Oops! Your imaginary Friend has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary friend is safe!");
        }
      });
    });
  }
  //Update
  let allUpdateBtn = document.querySelectorAll(".update-btn");
  for (i = 0; i < allUpdateBtn.length; i++) {
    allUpdateBtn[i].addEventListener("click", (event) => {
      console.log("update btn");
      labelForm.innerHTML = "Update Friend";
      let tr = event.currentTarget.parentElement.parentElement;
      let td = tr.getElementsByTagName("td");
      let index = tr.getAttribute("index");
      let imgTag = td[0].getElementsByTagName("img");
      let profilePicture = imgTag[0].src;
      let name = td[1].innerHTML;
      let state = td[2].innerHTML;
      let company = td[3].innerHTML;
      let job = td[4].innerHTML;
      let contact = td[5].innerHTML;
      showModal();
      addFriendBtn.disabled = true;
      updateFriendBtn.disabled = false;
      nameEl.value = name;
      profilePic.src = profilePicture;
      stateEl.value = state;
      companyEl.value = company;
      jobEl.value = job;
      contactEl.value = contact;
      updateFriendBtn.addEventListener("click", (e) => {
        let name = nameEl.value;
        let state = stateEl.value;
        let company = companyEl.value;
        let job = jobEl.value;
        let contact = contactEl.value;
        if (!validateForm(name, state, company, job, contact)) {
          return;
        }
        e.preventDefault();
        userData[index] = {
          id: userData.length,
          profilePicture: input.value == "" ? profilePicture : imgURL,
          name: nameEl.value,
          state: stateEl.value,
          company: companyEl.value,
          job: jobEl.value,
          contact: contactEl.value,
        };
        hideModal();
        localStorage.setItem("friendData", JSON.stringify(userData));
        getDataFromLocalStorage();
      });
    });
  }
};
getDataFromLocalStorage();
const registerNewFriend = () => {
  userData.push({
    id: userData.length,
    profilePicture: input.value == "" ? "img/avatar.png" : imgURL,
    name: nameEl.value,
    state: stateEl.value,
    company: companyEl.value,
    job: jobEl.value,
    contact: contactEl.value,
  });
  let friendString = JSON.stringify(userData);
  localStorage.setItem("friendData", friendString);
  hideModal();
  swal("Good job!", "Registration Success!", "success");
};
const validateForm = (name, state, company, job, contact) => {
  if (name.trim() === "") {
    swal({
      text: "Please enter a valid name!",
      icon: "warning",
    });
    return false;
  }
  if (state.trim() === "") {
    swal({
      text: "Please enter a valid state!",
      icon: "warning",
    });
    return false;
  }
  if (company.trim() === "") {
    swal({
      text: "Please enter a valid company!",
      icon: "warning",
    });
    return false;
  }
  if (job.trim() === "") {
    swal({
      text: "Please enter a valid job!",
      icon: "warning",
    });
    return false;
  }
  if (contact.trim() === "") {
    swal({
      text: "Please enter a valid contact!",
      icon: "warning",
    });
    return false;
  }
  if (!/^[0-9]+$/.test(contact)) {
    swal({
      text: "Please enter a valid numbers!",
      icon: "warning",
    });
    return false;
  }
  return true;
};
//ADD
addFriendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let name = nameEl.value;
  let state = stateEl.value;
  let company = companyEl.value;
  let job = jobEl.value;
  let contact = contactEl.value;
  // Perform form validation
  if (!validateForm(name, state, company, job, contact)) {
    return; // If form is not valid, return without submitting
  } else {
    registerNewFriend();
    getDataFromLocalStorage();
    registerForm.reset("");
  }
});
addButtonModal.addEventListener("click", () => {
  console.log("Add button clicked");
  labelForm.innerHTML = "Add Friend";
  registerForm.reset("");
  addFriendBtn.disabled = false;
  updateFriendBtn.disabled = true;
  showModal();
});
function showModal() {
  $("#add-friend-modal").modal("show");
}
function hideModal() {
  $("#add-friend-modal").modal("hide");
}
/*Image Upload*/
input.addEventListener("change", () => {
  let inputImage = document.querySelector("input[type=file]").files[0];
  if (input.files[0].size < 1000000) {
    imageName.innerText = inputImage.name;
    const fReader = new FileReader();
    fReader.onload = function (e) {
      imgURL = e.target.result;
      profilePic.src = imgURL;
    };
    fReader.readAsDataURL(input.files[0]);
  } else {
    alert("File is too large");
  }
});

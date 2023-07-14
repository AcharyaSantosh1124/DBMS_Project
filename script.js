document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission to a server
  console.log("Form submitted");

  var name = document.getElementById("name").value;
  var roll = document.getElementById("roll").value;
  var age = document.getElementById("age").value;
  var address = document.getElementById("address").value;
  var score = document.getElementById("score").value;

  // Create a data object with the form input values
  var data = {
    name: name,
    roll: roll,
    age: age,
    address: address,
    score: score
  };

  // Send the data to the server for updating the database
  fetch("http://localhost:3000/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(responseData => {
      // Process the response from the server
      console.log(responseData);
      alert("Form submitted and data updated in the database!");
      document.getElementById("myForm").reset();
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      console.error("Error:", error);
      alert("An error occurred while updating the data. Please try again later.");
    });
});

// Add event listener to the "Show Student Data" button
document.getElementById("showDataButton").addEventListener("click", function () {
  // Call a function to retrieve and display the student data
  fetchStudentData();
});

// Function to retrieve and display student data
function fetchStudentData() {
  fetch("http://localhost:3000/view")
    .then(response => response.json())
    .then(data => {
      displayStudentData(data);
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred while fetching student data. Please try again later.");
    });
}

// Function to display the student data on the webpage
function displayStudentData(data) {
  // Get a reference to the element where you want to display the data
  var dataContainer = document.getElementById("studentDataContainer");

  // Clear any existing data
  dataContainer.innerHTML = "";

  // Create a table element
  var table = document.createElement("table");
  table.classList.add("data-table");

  // Create the table header row
  var headerRow = document.createElement("tr");
  headerRow.innerHTML = `
    
    <th>Name</th>
    <th>Roll</th>
    <th>Age</th>
    <th>Address</th>
    <th>Entrance_Score</th>
  `;
  table.appendChild(headerRow);

  // Iterate through the data and create table rows for each student
  data.forEach(student => {
    var row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.roll}</td>
      <td>${student.age}</td>
      <td>${student.address}</td>
      <td>${student.score}</td>
    `;
    row.style.border = "1px solid black";
    row.style.padding = "8px";
    row.style.textAlign = "left";
    table.appendChild(row);
  });

  table.style.borderCollapse = "collapse";
  var cells = table.getElementsByTagName("td");
  for (var i = 0; i < cells.length; i++) {
    cells[i].style.border = "1px solid black";
    cells[i].style.padding = "8px";
    cells[i].style.textAlign = "left";
  }
  

  // Append the table to the data container
  dataContainer.appendChild(table);
}



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
  fetch("http://localhost:3001/update", {
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

// Add event listener to the Show Student Data button
document.getElementById("showDataButton").addEventListener("click", function() {
  // Call a function to retrieve and display the student data
  fetchStudentData();
});

// Function to retrieve and display student data
function fetchStudentData() {
  // Send a GET request to the server to fetch the student data
  fetch("http://localhost:3001/students") // Update the endpoint to "/students"
    .then(response => response.json())
    .then(data => {
      // Process the response and display the student data
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

  // Iterate through the data and create HTML elements to display each student's details
  data.forEach(student => {
    var studentDiv = document.createElement("div");
    studentDiv.innerHTML = `
      <h3>Name: ${student.name}</h3>
      <p>Roll: ${student.roll}</p>
      <p>Age: ${student.age}</p>
      <p>Address: ${student.address}</p>
      <p>Entrance Score: ${student.score}</p>
      <hr>
    `;
    dataContainer.appendChild(studentDiv);
  });
}

var maxID = 0


function updateMaxID() {
    console.log("Max ID:", maxID)
    const rows = document.querySelectorAll("tr[data-id]");
      const editableCells =             document.querySelectorAll('td[contenteditable="true"]');
        editableCells.forEach(cell => {
      cell.addEventListener('blur', cellEdited)    
  });
    // Max ID for generating unique IDs
    const ids = Array.from(rows).map(row => {
        const id = row.getAttribute("data-id");
        return parseInt(id, 10);
    }).filter(id => !isNaN(id)); 

    const findMaxId = ids.length > 0 ? Math.max(...ids) : undefined;

    if (findMaxId !== undefined) {
        maxID = findMaxId;

    } else {
        console.log("No <tr> elements with valid data-id found.");
    }
}


function createPosition() {
  fetch('/create_position', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: maxID+1})
  })
  .then(response => response.json())
  .then(data => {
    console.log("Updated on server:", data);
    maxID += 1;
  })
  .catch(error => {
    console.error("Error:", error);
  });
  
  const tbody = document.querySelector("#positionsTable tbody");
  const row = document.createElement("tr");
  tbody.appendChild(row);
  for (let i = 0; i < 2; i++) {
    const cell = row.insertCell(i)
    cell.contentEditable = true
    cell.innerHTML = ""
    cell.addEventListener('blur', cellEdited)
    cell.setAttribute('data-id', maxID)
  }

  let button = row.insertCell(2)
  button.innerHTML = `<td><button data-id="${maxID}"><img src="/static/remove-icon.png" alt="Remove Icon" width="30" height="30"></button></td>`
  button.querySelector('button').addEventListener('click', () => deletePosition(button.querySelector('button')))
}

function deletePosition(button) {

  fetch('/delete_position', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: button.getAttribute('data-id')})
  })
  .then(response => response.json())
  .then(data => {
    const row = button.closest("tr");
    const id = row.getAttribute("data-id");
    row.remove();
    console.log("Updated on server:", data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

function cellEdited() {
    job_status = "None";
    department = "None";
    console.log("Edited")
    const row = this.closest('tr');
    if (row) {
        console.log('Changed row:', row);
        // Optional: get text content of each cell in the row
        const rowData = Array.from(row.cells).map(td => td.textContent);

        job_status = rowData[0];
        departament = rowData[1];
        id = this.getAttribute('data-id');
        console.log('Row data:', rowData, id);
    }


    fetch('/update_position', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({job_status: job_status, departament: departament, id: id})
    })
    .then(response => response.json())
    .then(data => {
        console.log("Updated on server:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
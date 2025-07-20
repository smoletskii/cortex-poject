
var maxID = 0;
function addRow() {
    fetch('/create_person', {
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

    
    const table = document.getElementById("employees");
    const headerRow = table.querySelector("thead tr");
    const columnCount = headerRow ? headerRow.querySelectorAll("th, td").length : 0;
    const rows = table.insertRow(-1)
    for (let i = 0; i < columnCount; i++) {
        const cell = rows.insertCell(i)
        cell.contentEditable = true
        cell.innerHTML = "None"
        cell.addEventListener('blur', cellEdited)
        cell.setAttribute('data-id', maxID)
    }

        
}


function deleteRow(button) {
    const row = button.closest('tr');
    if (row)
        row.remove();
    console.log(button.getAttribute('data-id') + " deleted")
    fetch('/delete_person', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: button.getAttribute('data-id')})
    })
    .then(response => response.json())
    .then(data => {
        console.log("Updated on server:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const rows = document.querySelectorAll("tr[data-id]");

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
    //*****************************************************************
    
    const editableCells = document.querySelectorAll('td[contenteditable="true"]');
    editableCells.forEach(cell => {
        cell.addEventListener('blur', cellEdited)    
    });
});

function cellEdited() {
    name = "None";
    surname = "None";
    patronymic = "None";
    job_status = "None";
    work_status = "None";
    id = "None";

    const row = this.closest('tr');
    if (row) {
        console.log('Changed row:', row);
        // Optional: get text content of each cell in the row
        const rowData = Array.from(row.cells).map(td => td.textContent);

        name = rowData[0];
        surname = rowData[1];
        patronymic = rowData[2];
        job_status = rowData[3];
        work_time = rowData[4];
        id = this.getAttribute('data-id');
        console.log('Row data:', rowData, id);
    }

    
    fetch('/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, surname: surname, patronymic: patronymic, job_status: job_status, work_time: work_time, id: id})
    })
    .then(response => response.json())
    .then(data => {
        console.log("Updated on server:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

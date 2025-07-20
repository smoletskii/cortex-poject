var maxID = 0;
var selectedID = 0;
function updateMaxID() {
    const rows = document.querySelectorAll("tr[data-id]");
    console.log(rows)
    rows.forEach (row => {
        const id = row.getAttribute("data-id");
        if (parseInt(id, 10) > maxID) {
            maxID = parseInt(id, 10);
        }
    });
}



function addRow() {
    updateMaxID()
    fetch('/create_person', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: maxID+1})
    })
    .then(response => response.json())
    .then(data => {
        maxID += 1;
        console.log("Updated on server:", data);
        const table = document.getElementById("employees");
        const headerRow = table.querySelector("thead tr");
        const columnCount = headerRow ? headerRow.querySelectorAll("th, td").length : 0;
        const row = table.insertRow(-1)
        for (let i = 0; i < columnCount; i++) {
            const cell = row.insertCell(i)
            if (i != 3) {
                cell.contentEditable = true
                cell.innerHTML = ""
                cell.addEventListener('blur', cellEdited)
                cell.setAttribute('data-id', maxID)
            }
            else {
                select = document.createElement("select");
                cell.setAttribute('data-id', maxID)
                cell.appendChild(select);
                select.classList.add("positionSelect");
                positions.forEach(position => {
                    const option = document.createElement("option");
                    option.value = position["id"];
                    option.text = position["Position_name"];
                    select.appendChild(option);
                });


            }
        }



        button = row.insertCell(columnCount)
        button.innerHTML = `<td><button data-id="${maxID}"><img src="/static/remove-icon.png" alt="Remove Icon" width="30" height="30"></button></td>`
        button.querySelector('button').addEventListener('click', () => deleteRow(button.querySelector('button')))
    })
    .catch(error => {
        console.error("Error:", error);
    });
    
    



        
}


function deleteRow(button) {
    const row = button.closest('tr');
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
        if (row) {
            row.remove();
            updateMaxID();
        }

    })
    .catch(error => {
        console.error("Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const rows = document.querySelectorAll("tr[data-id]");
    //*****************************************************************
    
    const editableCells = document.querySelectorAll('td[contenteditable="true"]');
    editableCells.forEach(cell => {
        cell.addEventListener('blur', cellEdited)    
    });
});

function cellEdited(element = null) {
    name = "";
    surname = "";
    patronymic = "";
    job_status = "";
    work_status = "";
    id = "";

    if (element instanceof FocusEvent) {
        console.log(1)
        row = this.closest('tr');
    } else {
        console.log(element)
        row = element.closest('tr');
    }


    
    if (row) {
        console.log('Changed row:', row);
        // Optional: get text content of each cell in the row
        const rowData = Array.from(row.cells).map(td => td.textContent);

        name = rowData[0];
        surname = rowData[1];
        patronymic = rowData[2];
        job_status = selectedID;
        work_time = rowData[4];


        if (element instanceof FocusEvent) {
            id = this.getAttribute('data-id');
        } else {
            console.log(element)
            id = element.getAttribute('data-id');
        }
        
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




document.addEventListener("DOMContentLoaded", function () {
  const selects = document.querySelectorAll('select.positionSelect');

  if (!selects) {
    console.error("Dropdown element not found!");
    return;
  }

    selects.forEach (select => {
        minID = 100000
        positions.forEach(position => {
            if (position["id"] < minID) {
                minID = position["id"]
            }
            const option = document.createElement("option");
            option.value = position["id"];
            console.log(option.value, "ACTUAL VALUE")
            option.text = position["Position_name"];
            select.appendChild(option);
        });
        
        
        
        console.log(select.getAttribute("selected-id"), "SELECTED VALUE")
        select.value = parseInt(select.getAttribute("selected-id"))
        if (select.value == 0) {
            select.value = minID
        }



        
        select.addEventListener("change", function () {
            selectedID = parseInt(this.value);
            const selectedName = this.options[this.selectedIndex].text;
            console.log(`Selected Position ID: ${selectedID}, Name: ${selectedName}`);
            cellEdited(event.target)
          });
    });
});




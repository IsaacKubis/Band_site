
let shows = [
    {
        Date: "Mon Sept 06 2021",
        Venue: "Ronald Lane",
        Location: "San Francisco, CA"
    },
    {
        Date: "Tue Sept 21 2021",
        Venue: "Pier 3 East",
        Location: "San Francisco, CA"
    },
    {
        Date: "Fri Oct 15 2021",
        Venue: "View Lounge",
        Location: "San Francisco, CA" 
    },
    {
        Date: "Sat Nov 06 2021",
        Venue: "Hyatt Agency",
        Location: "San Francisco, CA" 
    },
    {
        Date: "Fri Nov 26 2021",
        Venue: "Moscow Center",
        Location: "San Francisco, CA" 
    },
    {
        Date: "Wed Dec 15 2021",
        Venue: "Press Club",
        Location: "San Francisco, CA" 
    },
]
const tablet = 768;

window.onload = function() {
    insert_array_data();
}
window.onresize = function() {
    if(screen.availWidth = tablet){
        insert_array_data();
    }
    
}
function insert_array_data() {
        document.getElementById("shows").innerHTML = "";
        const target = document.getElementById("shows");
        let showHeader = document.createElement("h2");
        showHeader.textContent = "Shows";
        showHeader.classList.add("shows__header")
        document.getElementById("shows").appendChild(showHeader);

        if(screen.availWidth < tablet) { //mobile layout
            for (let show of shows) { //sets loop for amount of objects in array
                const newDiv = document.createElement("div")
                newDiv.classList.add("shows__div")
                for(const[key, value] of Object.entries(show)) { //loops through each object and creates each key value on the page
                    const itemKey = document.createElement("p");
                    const itemValue = document.createElement("p");

                    itemKey.textContent = key;
                    itemValue.textContent = value;

                    itemKey.classList.add("shows__label");
                    itemValue.classList.add("shows__item");
                    
                    if (key == "Date") { 
                        itemValue.classList.add("shows__item--date");
                    }

                    newDiv.appendChild(itemKey);
                    newDiv.appendChild(itemValue);
                }
                const tdButton = document.createElement("button");
                tdButton.textContent = "Buy Tickets";
                tdButton.classList.add("shows__button");
                newDiv.appendChild(tdButton);
                target.appendChild(newDiv);
            }

        } else { //Desktop from here on 

            var i = 0;
            const newTable = document.createElement("table");
            newTable.innerHTML = "";
            newTable.setAttribute("id","tableId");
            newTable.classList.add("shows__table");
            for(let show of shows) { //creates table top data key
                const newRow = document.createElement("tr");
                if (i == 0) {
                    newTable.appendChild(newRow);
                }
                for (const [key] of Object.entries(show)) {
                    if (i < Object.keys(show).length) { // will create a top row for each key entry in the first object
                        const tdTop = document.createElement("td")
                        tdTop.textContent = key;
                        tdTop.classList.add("shows__table-header")
                        newRow.appendChild(tdTop);
                        i++
                    }
                }
            }
            for(let show of shows) { //creates table rows with the required values
                const newRow = document.createElement("tr");
                newRow.classList.add("shows__table-row");
                for(const [key, value] of Object.entries(show)) { //loops through each objects data
                    const tdContent = document.createElement("td");
                    tdContent.textContent = value;
                    tdContent.classList.add("shows__item");
                    if (key == "Date") { 
                        tdContent.classList.add("shows__item--date");
                    }
                    newRow.appendChild(tdContent);
                }
                const tdButtonCell = document.createElement("td");
                const tdButton = document.createElement("button");
                tdButton.textContent = "Buy Tickets";
                tdButton.classList.add("shows__button");
                tdButtonCell.appendChild(tdButton);
                newRow.appendChild(tdButtonCell);
                newTable.appendChild(newRow);
            }
            target.appendChild(newTable);
        }


        document.onclick = rowSelector();
        function rowSelector(){
            let rows = document.querySelectorAll('.shows__table-row')
            for (let i = 0; i < rows.length; i++) {
                if( screen.availWidth >= tablet) {
                    rows[i].onclick = function() {
                    highlightTableRow(this);
                    }
                };
            }
        }
        function highlightTableRow(row) {
            let prevRow = document.querySelector(".shows__table-row--table-row-active");
            if (prevRow) {
                prevRow.classList.remove("shows__table-row--table-row-active");
            }
            row.classList.add("shows__table-row--table-row-active");
        }
}



// nvidia a100 (memory speed of ~2tb/s)
// chatgpt went from ~45tb to ~1 petabyte (still extremely small dataset, google processes around 2.5exabytes a day)

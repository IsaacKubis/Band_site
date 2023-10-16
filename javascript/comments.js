let comments = [
    {
        Name: "Connor Walton",
        Date: "10/12/2023",
        Comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        Name: "Emilie Beach",
        Date: "02/17/2023",
        Comment: "This is art. This is inexplicable magic, expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        Name: "Miles Acosta",
        Date: "12/20/2018",
        Comment: "I can t stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can t get enough."
    }
]
const form = document.getElementById("comments__form");
form.addEventListener("submit", newComment);

window.onload = (createComments);
function newComment() {
    let name = document.getElementById("form-uname").value;
    let comment = document.getElementById("form-comment").value;
    let date = new Date().toISOString().slice(0, 10)
    let userObject = {Name: name, Date: date, Comment: comment};
    if (name == "" || comment == ""){
        if(name =="") {
            document.getElementById("form-uname").classList.add("comments__form-name--empty")
        } else {
            document.getElementById("form-comment").classList.add("comments__form-textarea--empty")
            console.log("empty");
        }
    } else{
        document.querySelector("input", ".comments__form-name--empty").classList.remove("comments__form-name--empty")
        document.querySelector("textarea", ".comments__form-textarea--empty").classList.remove("comments__form-textarea--empty")
        comments.unshift(userObject);
        console.log(userObject);
        document.getElementById("form-comment").value = "";
        document.getElementById("form-uname").value = "";
        createComments();
    }
    
}
function createComments() {
    let i = 0
    const target = document.getElementById("comments");
    target.innerHTML = "";
        for(comment of comments){
                const newDiv = document.createElement("div");
                const imageContainer = document.createElement("div");
                const commentDiv = document.createElement("div");
                newDiv.classList.add("comments__flex-div");
                imageContainer.classList.add("comments__image-container","comments__image-container--grey");
                commentDiv.classList.add("comments__comment-div");
                newDiv.appendChild(imageContainer);
                for(const[key, value] of Object.entries(comment)) {
                    let p = document.createElement("p");
                    p.textContent = value;
                    if(key == "Name"){
                        p.classList.add("comments__name");
                    } else if(key == "Date") {
                        p.classList.add("comments__date");
                        dateComparison(value);
                        p.textContent = "posted "+days+unitOfTime
                    } else {
                        p.classList.add("comments__comment");
                    }
                    commentDiv.appendChild(p);
                }
                newDiv.appendChild(commentDiv);
                target.appendChild(newDiv);
        }
}
let days = "";
let unitOfTime = "";
function dateComparison(value) {
    let date = new Date();
    let oldDate = new Date(value);
    let compareDate = date.getTime() - oldDate.getTime();
    let compareDateDays = compareDate / (1000 * 3600 * 24);
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;
    if (compareDate > year) {
        let years = compareDate/year;
        days = Math.floor(years);
        unitOfTime = " years ago."
    } else if (compareDate > day*30.437 && compareDate < year) {
        let hours = compareDate/hour;
        let months = hours/24/30.437;
        days = Math.floor(months);
        unitOfTime = " months ago."
    } else if (compareDate > day && compareDate > hour) {
        let hours = compareDate/hour;
        let dayNum = hours/24;
        days = Math.floor(dayNum);
        unitOfTime = " Days ago."
    } else if (compareDate < hour && compareDate > minute) {
        let minutes = compareDate/minute;
        days = math.floor(minute)
        unitOfTime = " Minutes ago."
    } else {
        let seconds = compareDate/minute/60;
        days = Math.floor(seconds);
        unitOfTime = " Seconds ago."
    }
    
}
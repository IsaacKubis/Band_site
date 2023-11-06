
const apiUrlComments = 'https://project-1-api.herokuapp.com/comments?api_key=1f801dad-9c1c-4a9f-a98a-8c566c228b86'

window.onload = getComments();
function getComments() {
    axios.get(apiUrlComments).then(response => {
        createComments(response.data);
    });
}

function pushToApi(userObject) {
    axios.post(apiUrlComments, userObject).then(response => {
        getComments();
    });
}

const form = document.getElementById("comments__form");
form.addEventListener("submit", newComment, false);

function newComment(event) {
    event.preventDefault();
    let name = document.getElementById("form-uname").value;
    let comment = document.getElementById("form-comment").value;
    let userObject = {name: name, comment: comment};
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
        document.getElementById("form-comment").value = "";
        document.getElementById("form-uname").value = "";
        pushToApi(userObject);
    }
}
function createComments(data) {
    let i = 0
    const target = document.getElementById("comments");
    target.innerHTML = "";
    const sortedArray = data.sort((objA, objB) => Number(objB.timestamp) - Number(objA.timestamp));
        for(comment of data){
                const newDiv = document.createElement("div");
                const imageContainer = document.createElement("div");
                const commentDiv = document.createElement("div");
                newDiv.classList.add("comments__flex-div");
                imageContainer.classList.add("comments__image-container","comments__image-container--grey");
                commentDiv.classList.add("comments__comment-div");
                newDiv.appendChild(imageContainer);
                for(const[key, value] of Object.entries(comment)) {
                    let p = document.createElement("p");
                    if(key == "name"){
                        p.classList.add("comments__name");
                        p.textContent = value;
                    } else if(key == "timestamp") {
                        p.classList.add("comments__date");
                        dateComparison(value);
                        p.textContent = "posted "+days+unitOfTime
                    } else if (key == 'id'){
                        continue;
                    } else if (key == 'comment'){
                        p.classList.add("comments__comment");
                        p.textContent = value;
                    } else if (key == 'likes'){
                        p.textContent = value + ' likes';
                        p.classList.add("comments__likes")
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
    } else if(compareDate > hour && compareDate < day) {
        let hours = compareDate/hour;
        days = Math.floor(hours);
        unitOfTime = " Hours ago."
    } else if (compareDate < hour && compareDate > minute) {
        let minutes = compareDate/minute;
        days = Math.floor(minutes)
        unitOfTime = " Minutes ago."
    } else {
        days = ' ';
        unitOfTime = "just now"
    }

}
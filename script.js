let todoInput = document.getElementById("todoUserInput");
let addButton = document.getElementById("addTodoButton");
let ulElement = document.getElementById("todoItemsContainer");
let data = [];
function render() {
    if (JSON.parse(localStorage.getItem("todos")) === null) {
        return;
    } else {
        data = JSON.parse(localStorage.getItem("todos"));
        data.map((ele) => {
            let liElementid = "li" + ele.id;
            let checkBoxId = "check" + ele.id;
            let labelId = "label" + ele.id;
            let li = document.createElement("li");
            li.id = liElementid;
            let check = document.createElement("input");
            check.type = "checkbox";
            check.id = checkBoxId;
            check.checked = ele.status;
            let div = document.createElement("div");
            let label = document.createElement("label");
            label.id = labelId;
            if (ele.status === true) {
                label.classList.add("checked");
            }
            label.setAttribute("for", checkBoxId);
            label.innerText = ele.taskvalue;
            let icon = document.createElement("i");
            icon.classList.add("fa-solid", "fa-trash");
            li.appendChild(check);
            let div2 = li.appendChild(div);
            div2.appendChild(label);
            div2.appendChild(icon);
            ulElement.appendChild(li);

            check.onclick = function () {
                changeStatus(labelId, liElementid, checkBoxId);
            };
            icon.onclick = function () {
                deletetask(liElementid);
            };
        });
    }
}

render();

addButton.onclick = function () {
    Addtask();
};

function Addtask() {
    let newTaskValue = todoInput.value;
    if(newTaskValue===""){
        alert("enter todo please")
        return
    }
    let newtask = {
        id: Math.floor(new Date().getTime() * Math.random()),
        taskvalue: newTaskValue,
        status: false,
    };
    data.push(newtask);
    localStorage.setItem("todos", JSON.stringify(data));
    ulElement.innerHTML = "";
    render(data);
    console.log(data);
}
function changeStatus(labelid, liElementid, checkBoxId) {
    let box = document.getElementById(checkBoxId);
    let box2 = document.getElementById(labelid);
    console.log(box, box.checked);
    if (!box.checked) {
        data.forEach((ele) => {
            let eleid = "li" + ele.id;
            if (eleid === liElementid) {
                ele.status = false;
            }
        });
      
    } else {
      
        data.forEach((ele) => {
            let eleid = "li" + ele.id;
            if (eleid === liElementid) {
                ele.status = true;
            }
        });
    }

    localStorage.setItem("todos", JSON.stringify(data));
    ulElement.innerHTML = "";
    render();
}

function deletetask(liElementid) {
    let deleteElement = document.getElementById(liElementid);
    ulElement.removeChild(deleteElement);
    let deleteElementIndex = data.findIndex(function (eachTodo) {
        let eachTodoId = "li" + eachTodo.id;
        if (eachTodoId === liElementid) {
            return true;
        } else {
            return false;
        }
    });

    
    data.splice(deleteElementIndex, 1);
    localStorage.setItem("todos", JSON.stringify(data));
    ulElement.innerHTML = "";
    render();
}

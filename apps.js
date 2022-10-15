const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const alert = document.querySelector(".alert");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
const container = document.querySelector(".grocery-container");
const submitBtn = document.querySelector(".submit-btn");

form.addEventListener("submit", addItem);
clearBtn.addEventListener("click",clearItem);

let editFlag =false;

function addItem(e){
    e.preventDefault();
    const value= grocery.value;
    const id = new Date().getTime().toString();
    if(value && !editFlag)
    {
       const element = document.createElement("article");
       const attr = document.createAttribute("data-id");
       attr.value = id
        element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
          const deleteBtn = element.querySelector(".delete-btn");
          const editBtn =element.querySelector(".edit-btn");

          deleteBtn.addEventListener("click",delItem);
          
          list.appendChild(element);
          container.classList.add("show-container");
          grocery.value="";
          displayAlert(`${value} is added`, "success");
          
    }
    else if (value && editFlag)
    {

    }
    else
    {
       displayAlert();
    }
}

 function displayAlert(text,action)
{
    alert.textContent = text;
       alert.classList.add(`alert-${action}`);

       setTimeout(function(){
      alert.textContent="";
      alert.classList.remove(`alert-${action}`);
       },1500);
}

function clearItem()
{
   const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
//   setBackToDefault();
//   localStorage.removeItem("list");
}

function delItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  
  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");

}
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-9651a-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endoListInDB = ref(database, "endorsements")

const inputEl = document.getElementById("input-el")
const publishBtn = document.getElementById("publish-btn")
const endoList = document.getElementById("endo-list")

publishBtn.addEventListener("click",function(){
    let inputValue = inputEl.value
    push(endoListInDB, inputValue)
    clearinputEl()
    
})

onValue(endoListInDB, function(snapshot){
    if(snapshot.exists())
    {   let current = Object.entries(snapshot.val())
        clearendoList()
        for(let i = 0;i < current.length; i++){
        let endors = current[i]
        render(endors)
        }
    }else {
        endoList.innerHTML = "<p>Nothing to see here</p>"
    }
    
})

function clearinputEl() {
    inputEl.value = ""
}

function render(display) {
    let displayID = display[0]
    let displayValue = display[1]
    endoList.innerHTML += `<li>${displayValue}</li>`
    //<button id="likeButton"> ❤️ </button> <span id="likeCount">0</span></li>`
    //const likeButton = document.getElementById('likeButton');
//    const likeCount = document.getElementById('likeCount');
  //  let count = 0;
    //likeButton.addEventListener("click" ,function(){
//    count++;
  //  likeCount.textContent = count;
    //});
}

function clearendoList() {
    endoList.textContent = ""
}
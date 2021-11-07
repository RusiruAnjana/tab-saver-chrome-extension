let myLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")


tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads()
    })
    
})

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads()
}

let inputButton = document.getElementById("input-btn")
inputButton.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads()

})

let deleteButton = document.getElementById("delete-btn")
deleteButton.addEventListener("dblclick", function () {
    localStorage.clear()

    myLeads = []
    renderLeads()
})

function renderLeads() {
    let listItems = ""

    for (let i = 0; i < myLeads.length; i++) {
        listItems += '<li><a href="' + myLeads[i] + '" target="_blank">' + myLeads[i] + '</a></li>'
    }

    ulEl.innerHTML = listItems
}
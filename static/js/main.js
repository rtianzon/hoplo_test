async function allPost(url, data){
    const reqData = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const resData = await reqData.json()
    if(reqData.ok){
      return {"okay": true, "data": resData}
    } else {
      return {"okay": false, "data": resData}
    }
}

async function allAirportCodes(){
    return [
        "MOB",
        "TUS",
        "PHX",
        "JFK",
        "LAX"
    ]
}

async function allModeOfTransit(){
    return [
        "Land",
        "Air",
        "Sea"
    ]
}

async function createLoadingAlert(){
    const alertDiv = document.getElementById("alertDiv")
    const loadingAlertDiv = document.createElement("div")
    loadingAlertDiv.classList.add(
      "alert",
      "alert-primary",
      "bg-primary",
      "text-light", 
      "border-0",
      "alert-dismissible",
      "fade",
      "align-items-center",
      "loadingDiv",
      "d-flex",
      "show"
    )
    loadingAlertDiv.setAttribute("role", "alert")
    loadingAlertDiv.innerHTML = `
      <div class="spinner-border text-light me-2" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <span>Loading...</span>
    `
  
    alertDiv.appendChild(loadingAlertDiv)
}

async function hideLoadingAlert(){
    const loadingDiv = document.querySelector(".loadingDiv")
    loadingDiv.remove()
}

async function createErrorAlert(message){
    const alertDiv = document.getElementById("alertDiv")
    const errorAlertDiv = document.createElement("div")
    errorAlertDiv.classList.add("alert", "alert-danger", "bg-danger", "text-light", "border-0", "alert-dismissible", "fade", "show", "errorAlert")
    errorAlertDiv.setAttribute("role", "alert")
    errorAlertDiv.innerHTML = `
      <span>${message}</span>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
    `
  
    alertDiv.appendChild(errorAlertDiv)
}

async function createSuccessAlert(message){
    const alertDiv = document.getElementById("alertDiv")
    const successAlertDiv = document.createElement("div")
    successAlertDiv.classList.add("alert", "alert-success", "bg-success", "text-light", "border-0", "alert-dismissible", "fade", "show", "successAlert")
    successAlertDiv.setAttribute("role", "alert")
    successAlertDiv.innerHTML = `
      <span>${message}</span>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
    `
  
    alertDiv.appendChild(successAlertDiv)
}
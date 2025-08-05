(async function init(){
    await createForm()
    await showAllAirportCodes()
    await showMode()
    await eventSubmitData()
})()

async function eventSubmitData(){
    const submitBtn = document.querySelector(".submitBtn")
    submitBtn.addEventListener("click", async () => {
        await createLoadingAlert()

        const fromSelect = document.querySelector(".fromSelect")
        const fromSelectOpt = fromSelect.options[fromSelect.selectedIndex]
        const toSelect = document.querySelector(".toSelect")
        const toSelecOpt = toSelect.options[toSelect.selectedIndex]
        const modeSelect = document.querySelector(".modeSelect")
        const modeSelectOpt = modeSelect.options[modeSelect.selectedIndex]
        const priceInput = document.getElementById("priceInput")

        const fromSelectOptValue = fromSelectOpt.value
        const toSelecOptValue = toSelecOpt.value
        const modeSelectOptValue = modeSelectOpt.value
        const priceInputValue = priceInput.value

        const required = [
            fromSelectOptValue,
            toSelecOptValue,
            modeSelectOptValue,
            priceInputValue
        ]

        for(let item of required){
            if(item == ""){
                await hideLoadingAlert()
                await createErrorAlert("Required item is missing. Please try again")
                return
            }
        }

        const resData = await allPost("/sendData", {
            fromSelectOptValue,
            toSelecOptValue,
            modeSelectOptValue,
            priceInputValue
        })

        console.log(resData)
        console.log("resData^^^")

        if(resData.okay){
            await createSuccessAlert("Data has been saved.")
            for(let item of fromSelect.options){
                if(item.value == ""){
                    item.selected = true
                }
            }

            for(let item of toSelect.options){
                if(item.value == ""){
                    item.selected = true
                }
            }

            for(let item of modeSelect.options){
                if(item.value == ""){
                    item.selected = true
                }
            }

            priceInput.value = ""
        } else {
            await createErrorAlert("There was an error processing the request. Please try again.")
            await hideLoadingAlert()
            return
        }
        



        await hideLoadingAlert()
    })
}

async function showMode(){
    const allMode = await allModeOfTransit()
    const modeSelect = document.querySelector(".modeSelect")

    for(let item of allMode){
        const mainOpt = document.createElement("option")
        mainOpt.innerHTML = item
        mainOpt.value = item

        modeSelect.appendChild(mainOpt)
    }
}

async function showAllAirportCodes(){
    const allAirportcodes = await allAirportCodes()

    const fromSelect = document.querySelector(".fromSelect")
    const toSelect = document.querySelector(".toSelect")
    for(let item of allAirportcodes){
        const fromOpt = document.createElement("option")
        fromOpt.value = item
        fromOpt.innerHTML = item

        const toOpt = document.createElement("option")
        toOpt.value = item
        toOpt.innerHTML = item

        fromSelect.appendChild(fromOpt)
        toSelect.appendChild(toOpt)
    }

    
}

async function createForm(){
    const container = document.querySelector(".container")
    container.classList.add("mt-3")
    const formContainer = document.createElement("div")

    formContainer.innerHTML = `
        <div class="row mb-3">
            <label class="col-sm-2 col-form-label">From:</label>
            <div class="col-sm-10">
                <select class="form-select fromSelect" aria-label="Default select example">
                    <option selected="" value="">Choose</option>
                </select>
            </div>
        </div>

        <div class="row mb-3">
            <label class="col-sm-2 col-form-label">To:</label>
            <div class="col-sm-10">
                <select class="form-select toSelect" aria-label="Default select example">
                    <option selected="" value="">Choose</option>
                </select>
            </div>
        </div>

        <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Mode:</label>
            <div class="col-sm-10">
                <select class="form-select modeSelect" aria-label="Default select example">
                    <option selected="" value="">Choose</option>
                </select>
            </div>
        </div>

        <div class="row mb-3">
            <label for="priceInput" class="col-sm-2 col-form-label">Enter Amount:</label>
            <div class="col-sm-10">
                <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input type="number" id="priceInput" class="form-control" aria-label="Amount">
                    <span class="input-group-text">/kg</span>
                </div>
            </div>
        </div>

        <div class="d-grid gap-2 mt-3">
            <button class="btn btn-primary submitBtn" type="button">Submit</button>
        </div>
    `

    container.appendChild(formContainer)
}
import { setData, getData, removeData } from "./storage.js"; 

const EventBus = (() => { 
 
    const events = {}; 
 
    const subscribe = (eventName, callback) => { 
        if (!events[eventName]) { 
            events[eventName] = []; 
        } 
 
        events[eventName].push(callback); 
    }; 
 
    const publish = (eventName, data) => { 
        if (events[eventName]) { 
            events[eventName].forEach(callback => callback(data)); 
        } 
    }; 
 
    return { 
        subscribe, 
        publish 
    }; 
 
})(); 

// CropModel hides the crop data as well as crop-changing functions. 
// it keeps the data private and allows other parts of the appto use only the functions that are intentionally exposed. 
const CropModel = (() => { 
 
    const savedCrops = getData("agritrackCrops"); 
    const crops = savedCrops || []; 
 
    const saveCrops = () => { 
        setData("agritrackCrops", crops); 
    }; 
 
    const getCrops = () => { 
        return crops; 
    }; 
 
    const addCrop = (name, status) => { 
        crops.push({ 
            name: name, 
            status: status 
        }); 
 
        saveCrops(); 
    }; 
 
    const harvestCrop = (index) => { 
        if (crops[index]) {
            crops[index].status = "Harvested"; 
            saveCrops(); 
        }
    }; 
 
    const removeCrop = (index) => { 
        if (crops[index]) {
            crops.splice(index, 1); 
            saveCrops(); 
        }
    }; 
 
    return { 
        getCrops, 
        addCrop, 
        harvestCrop, 
        removeCrop 
    }; 
 
})(); 

// CropView hides the DOM rendering details. 
// Only the renderCrops function is exposed so the controller can tell the viewer when the crop list needs to be displayed. 
const CropView = (() => { 
 
    const cropList = document.getElementById("crop-list"); 
 
    const renderCrops = (crops) => { 
 
        cropList.innerHTML = ""; 
 
        if (crops.length === 0) { 
            cropList.innerHTML = "<li>No crops have been added yet.</li>"; 
            return; 
        } 
 
        crops.forEach((crop, index) => { 
 
            const listItem = document.createElement("li"); 
 
            listItem.innerHTML = ` 
                <strong>${crop.name}</strong> - ${crop.status} 
                <button class="harvest-button" data-index="${index}"> 
                    Mark as Harvested 
                </button> 
                <button class="remove-button" data-index="${index}"> 
                    Remove 
                </button> 
            `; 
 
            cropList.appendChild(listItem); 
        }); 
    }; 

    return {
        renderCrops
    };
    
})(); 

// CropController hides the event-handling and user-action logic. 
// Only the init function is exposed so the application can start the controller without accessing its internal details. 
const CropController = (() => { 
 
    const init = () => { 
 
        const cropForm = document.getElementById("crop-form"); 
        const cropList = document.getElementById("crop-list"); 
 
        cropForm.addEventListener("submit", (event) => { 
            event.preventDefault(); 
 
            const cropName = document.getElementById("crop-name").value.trim(); 
            const cropStatus = document.getElementById("crop-status").value; 
 
            if (cropName === "") { 
                return; 
            } 
 
            CropModel.addCrop(cropName, cropStatus); 
 
            EventBus.publish("cropAdded", CropModel.getCrops()); 
 
            CropView.renderCrops(CropModel.getCrops()); 
 
            cropForm.reset(); 
        }); 
 
        cropList.addEventListener("click", (event) => { 
 
            const index = Number(event.target.dataset.index); 
 
            if (event.target.classList.contains("harvest-button")) { 
 
                CropModel.harvestCrop(index); 
 
                EventBus.publish("cropHarvested", CropModel.getCrops()); 
 
                CropView.renderCrops(CropModel.getCrops());

            } 
 
            if (event.target.classList.contains("remove-button")) { 
 
                CropModel.removeCrop(index); 
 
                EventBus.publish("cropRemoved", CropModel.getCrops()); 
 
                CropView.renderCrops(CropModel.getCrops());

            } 
 
        }); 
 
        CropView.renderCrops(CropModel.getCrops()); 
    }; 
 
    return { 
        init 
    }; 
 
})(); 

document.addEventListener("DOMContentLoaded", () => { 
    CropController.init(); 
});
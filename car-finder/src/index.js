// Imports your SCSS stylesheet
import './styles/index.scss';
import carData from './data/car-dataset.json';

document.addEventListener("DOMContentLoaded", () => {
    const yearDropdown = document.getElementById('year');
    const makeDropdown = document.getElementById('make');
    const modelDropdown = document.getElementById('model');

    // Ensure dropdowns are disabled at the start
    makeDropdown.disabled = true;
    modelDropdown.disabled = true;

    // Extract unique years and sort them in descending order
    const uniqueYears = [...new Set(carData.map(car => car.year))].sort((a, b) => b - a);

    // Populate Year Dropdown
    uniqueYears.forEach(year => {
        let option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearDropdown.appendChild(option);
    });

    // Enable "Make" dropdown only when a Year is selected
    yearDropdown.addEventListener('change', () => {
        makeDropdown.disabled = false;
        makeDropdown.innerHTML = '<option>Select Make</option>'; // Reset options
        
        let selectedYear = yearDropdown.value;
        let filteredMakes = [...new Set(carData.filter(car => car.year == selectedYear).map(car => car.Manufacturer))];

        // Sort alphabetically
        filteredMakes.sort();

        filteredMakes.forEach(make => {
            let option = document.createElement('option');
            option.value = make;
            option.textContent = make;
            makeDropdown.appendChild(option);
        });

        // Reset and disable model dropdown
        modelDropdown.innerHTML = '<option>Select Model</option>';
        modelDropdown.disabled = true;
    });

    // Enable "Model" dropdown only when a Make is selected
    makeDropdown.addEventListener('change', () => {
        modelDropdown.disabled = false;
        modelDropdown.innerHTML = '<option>Select Model</option>'; // Reset options

        let selectedMake = makeDropdown.value;
        let selectedYear = yearDropdown.value;

        let filteredModels = [...new Set(
            carData.filter(car => car.Manufacturer === selectedMake && car.year == selectedYear)
                .map(car => car.model)
        )];

        // Sort alphabetically
        filteredModels.sort();

        filteredModels.forEach(model => {
            let option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelDropdown.appendChild(option);
        });
    });

    // Log car details once Year, Make, and Model are selected
    modelDropdown.addEventListener('change', () => {
        let selectedYear = yearDropdown.value;
        let selectedMake = makeDropdown.value;
        let selectedModel = modelDropdown.value;

        let selectedCar = carData.find(car => 
            car.year == selectedYear &&
            car.Manufacturer === selectedMake &&
            car.model === selectedModel
        );

        if (selectedCar) {
            console.log("Selected Car Details:", selectedCar);
        } else {
            console.log("No matching car found.");
        }
    });
});
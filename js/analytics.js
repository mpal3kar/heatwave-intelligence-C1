/* 
   JavaScript Climate Analytics Engine
   Student Authors: Mohammad Palekar (16010125167), Gaurav (16010125164), Samarth (16010125161)
*/

// Task 4: Temperature Array Analysis Dataset
const temperatureReadings = [34, 36, 38, 39, 41, 40, 37, 35, 39, 42];
const heatwaveThreshold = 37;

// Function to run temperature array analytics
function runArrayAnalytics() {
    let minTemp = temperatureReadings[0];
    let maxTemp = temperatureReadings[0];
    let sum = 0;
    let aboveThresholdCount = 0;
    let aboveEqual40Count = 0;
    let heatwaveReadings = [];

    for (let i = 0; i < temperatureReadings.length; i++) {
        let temp = temperatureReadings[i];
        sum += temp;

        if (temp < minTemp) minTemp = temp;
        if (temp > maxTemp) maxTemp = temp;
        if (temp > heatwaveThreshold) aboveThresholdCount++;
        if (temp >= 40) {
            aboveEqual40Count++;
            heatwaveReadings.push(temp);
        }
    }

    const avgTemp = (sum / temperatureReadings.length).toFixed(1);

    // Populate UI elements if present
    const elReadings = document.getElementById("statReadings");
    const elMin = document.getElementById("statMin");
    const elMax = document.getElementById("statMax");
    const elAvg = document.getElementById("statAvg");
    const elThreshold = document.getElementById("statThreshold");
    const elAbove40 = document.getElementById("statAbove40");
    const elHwList = document.getElementById("statHwList");

    if (elReadings) elReadings.textContent = temperatureReadings.join("°C, ") + "°C";
    if (elMin) elMin.textContent = minTemp + "°C";
    if (elMax) elMax.textContent = maxTemp + "°C";
    if (elAvg) elAvg.textContent = avgTemp + "°C";
    if (elThreshold) elThreshold.textContent = aboveThresholdCount + " Days";
    if (elAbove40) elAbove40.textContent = aboveEqual40Count + " Days";
    if (elHwList) elHwList.textContent = heatwaveReadings.join("°C, ") + "°C";

    console.log("Array Analysis Completed: Min=" + minTemp + ", Max=" + maxTemp + ", Avg=" + avgTemp);
}

// Task 3: Climate Monitoring Object with Methods
const climateData = {
    location: "Mumbai Coastal Station",
    city: "Mumbai",
    temperature: 39,
    humidity: 65,
    windSpeed: 12,
    forecastTemperature: 41,
    heatwaveThreshold: 37,
    riskLevel: "High",
    alertStatus: "Active",
    monitoringDate: "05 October 2026",

    displayData: function () {
        return `Location: ${this.location} (${this.city})<br>` +
               `Temperature: ${this.temperature}°C | Humidity: ${this.humidity}%<br>` +
               `Wind Speed: ${this.windSpeed} km/h | Forecast: ${this.forecastTemperature}°C<br>` +
               `Current Alert Status: <strong>${this.alertStatus}</strong>`;
    },

    calculateDifference: function () {
        return this.temperature - this.heatwaveThreshold;
    },

    determineRisk: function () {
        if (this.temperature >= 40) {
            this.riskLevel = "Severe";
        } else if (this.temperature >= 38 && this.humidity >= 60) {
            this.riskLevel = "High";
        } else if (this.temperature >= 35) {
            this.riskLevel = "Moderate";
        } else {
            this.riskLevel = "Normal";
        }
        return this.riskLevel;
    },

    displayWarning: function () {
        if (this.riskLevel === "Severe" || this.riskLevel === "High") {
            return "Early Warning Status: Heatwave alert is active. Stay indoors during peak hours (12 PM - 4 PM).";
        } else {
            return "Early Warning Status: Routine monitoring in progress. Safe conditions.";
        }
    },

    updateAlert: function () {
        if (this.riskLevel === "Severe" || this.riskLevel === "High") {
            this.alertStatus = "Active";
        } else {
            this.alertStatus = "Standby";
        }
        return this.alertStatus;
    }
};

// Task 1 & 2: Interactive Threshold Calculator
function checkCustomTemperature() {
    const locInput = document.getElementById("customLocation").value.trim() || "Local Station";
    const tempInput = parseFloat(document.getElementById("customTemp").value);
    const humInput = parseFloat(document.getElementById("customHumidity").value) || 50;
    const threshInput = parseFloat(document.getElementById("customThreshold").value) || 37;
    const resultBox = document.getElementById("customCalcResult");

    if (isNaN(tempInput)) {
        alert("Please enter a valid numeric temperature!");
        return;
    }

    const diff = tempInput - threshInput;
    let risk = "Normal";
    let advisory = "Normal - Continue Routine Monitoring";

    // Task 2 Decision Rules
    if (tempInput >= 40) {
        risk = "SEVERE";
        advisory = "Severe Heatwave Warning - Red Alert! Suspend outdoor activities.";
    } else if (tempInput >= 38 && humInput >= 60) {
        risk = "HIGH";
        advisory = "High Heat Risk - Issue Heatwave Warning & Hydration Advisory.";
    } else if (tempInput >= 35 && tempInput <= 38) {
        risk = "MODERATE";
        advisory = "Moderate Heat Risk - Monitor conditions closely.";
    } else {
        risk = "NORMAL";
        advisory = "Normal Conditions - Keep hydrating.";
    }

    resultBox.innerHTML = `
        <h4>Analysis Result for ${locInput}</h4>
        <p><strong>Current Temperature:</strong> ${tempInput}°C</p>
        <p><strong>Heatwave Threshold:</strong> ${threshInput}°C</p>
        <p><strong>Temperature Difference:</strong> ${diff > 0 ? "+" + diff : diff}°C</p>
        <p><strong>Risk Level:</strong> <span class="status-pill ${risk === 'SEVERE' ? 'severe' : (risk === 'HIGH' || risk === 'MODERATE' ? 'moderate' : 'low')}">${risk}</span></p>
        <p><strong>Early Warning Recommendation:</strong> ${advisory}</p>
    `;
    resultBox.style.display = "block";
}

// Initialise on load
document.addEventListener("DOMContentLoaded", function () {
    runArrayAnalytics();

    const objBox = document.getElementById("objectDemoOutput");
    if (objBox) {
        climateData.determineRisk();
        climateData.updateAlert();
        objBox.innerHTML = `
            ${climateData.displayData()}<br>
            <strong>Threshold Exceedance:</strong> +${climateData.calculateDifference()}°C above baseline.<br>
            <strong>Computed Risk Level:</strong> <span class="status-pill severe">${climateData.riskLevel}</span><br>
            <em>${climateData.displayWarning()}</em>
        `;
    }
});

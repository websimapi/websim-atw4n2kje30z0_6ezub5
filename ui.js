class UIManager {
    constructor() {
        this.conditionEl = document.getElementById('condition');
        this.temperatureEl = document.getElementById('temperature');
        this.changeBtn = document.getElementById('change-weather-btn');
        this.postModeSelect = document.getElementById('post-mode');
    }

    updateUI(weatherData) {
        this.conditionEl.textContent = weatherData.condition;
        this.temperatureEl.textContent = weatherData.temperature;
    }

    onChangeWeather(callback) {
        this.changeBtn.addEventListener('click', callback);
    }
    
    getPostMode() {
        return this.postModeSelect.value;
    }
}

export default UIManager;


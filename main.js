import SceneManager from './scene.js';
import WeatherManager from './weather.js';
import PostMessageManager from './postMessage.js';
import UIManager from './ui.js';

const canvas = document.querySelector('#bg');
const sceneManager = new SceneManager(canvas);
const weatherManager = new WeatherManager();
const postMessageManager = new PostMessageManager(window.parent);
const uiManager = new UIManager();

function updateAndPostWeather() {
    weatherManager.changeWeather();
    const weatherData = weatherManager.getCurrentWeather();
    
    // Update the iframe's own UI and 3D scene
    uiManager.updateUI(weatherData);
    sceneManager.updateWeather(weatherData);

    // Send the weather data to the parent window
    const mode = uiManager.getPostMode();
    const message = weatherManager.createPostMessage(mode);
    postMessageManager.sendMessage(message);
}

// Initial setup
const initialWeather = weatherManager.getCurrentWeather();
uiManager.updateUI(initialWeather);
sceneManager.updateWeather(initialWeather);
uiManager.onChangeWeather(updateAndPostWeather);

function animate() {
    requestAnimationFrame(animate);
    sceneManager.animate();
}

animate();

// Let the parent know the iframe is ready
window.addEventListener('load', () => {
    postMessageManager.sendMessage({ type: 'IFRAME_READY' });
});
const weatherConditions = ['Sunny', 'Rainy', 'Snowy'];

class WeatherManager {
    constructor() {
        this.currentWeather = {
            condition: 'Sunny',
            temperature: 25,
        };
    }

    getCurrentWeather() {
        return this.currentWeather;
    }

    changeWeather() {
        const newCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        let newTemp;

        switch(newCondition) {
            case 'Sunny':
                newTemp = Math.floor(Math.random() * 15) + 20; // 20 to 35
                break;
            case 'Rainy':
                newTemp = Math.floor(Math.random() * 10) + 10; // 10 to 20
                break;
            case 'Snowy':
                newTemp = Math.floor(Math.random() * 10) - 5; // -5 to 5
                break;
        }

        this.currentWeather = {
            condition: newCondition,
            temperature: newTemp,
        };
    }

    createPostMessage(mode) {
        if (mode === 'script') {
            return this.createExecutionScript();
        }
        return this.createRenderData();
    }
    
    createRenderData() {
        const data = this.currentWeather;
        const renderInfo = {
            backgroundColor: '',
            elements: []
        };
        
        switch(data.condition) {
            case 'Sunny':
                renderInfo.backgroundColor = '#87CEEB';
                renderInfo.elements.push({ type: 'sphere', color: '#fdb813', position: [30, 20, -50], scale: [5,5,5], label: 'Sun' });
                break;
            case 'Rainy':
                renderInfo.backgroundColor = '#778899';
                renderInfo.elements.push({ type: 'particles', color: '#ADD8E6', count: 500, label: 'Rain' });
                break;
            case 'Snowy':
                renderInfo.backgroundColor = '#DCDCDC';
                renderInfo.elements.push({ type: 'particles', color: '#FFFFFF', count: 500, label: 'Snow' });
                break;
        }
        renderInfo.elements.push({ type: 'text', content: `Temp: ${data.temperature}°C`, position: [0,0,0]});

        return {
            type: 'WEATHER_DATA',
            payload: renderInfo
        };
    }

    createExecutionScript() {
        const data = this.currentWeather;
        const script = {
            type: 'EXECUTION_SCRIPT',
            payload: {
                description: `Script for ${data.condition} at ${data.temperature}°C`,
                actions: [
                    { command: 'setBackground', args: { color: this.getBackgroundColorForCondition(data.condition) } },
                    { command: 'clearSceneElements', args: {} },
                    ...this.getSceneElementsForCondition(data),
                    { command: 'addText', args: { content: `Temp: ${data.temperature}°C`, position: [-10, 8, 0] } }
                ]
            }
        };
        return script;
    }

    getBackgroundColorForCondition(condition) {
        switch(condition) {
            case 'Sunny': return '#87CEEB';
            case 'Rainy': return '#778899';
            case 'Snowy': return '#DCDCDC';
            default: return '#000000';
        }
    }

    getSceneElementsForCondition(data) {
        switch(data.condition) {
            case 'Sunny':
                return [{ command: 'addElement', args: { type: 'sphere', name: 'sun', color: '#fdb813', position: [30, 20, -50], scale: [5,5,5] } }];
            case 'Rainy':
                return [{ command: 'addParticleSystem', args: { name: 'rain', color: '#ADD8E6', count: 500 } }];
            case 'Snowy':
                return [{ command: 'addParticleSystem', args: { name: 'snow', color: '#FFFFFF', count: 500 } }];
            default:
                return [];
        }
    }
}

export default WeatherManager;
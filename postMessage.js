class PostMessageManager {
    constructor(targetWindow, targetOrigin = '*') {
        this.targetWindow = targetWindow;
        this.targetOrigin = targetOrigin;
    }

    sendMessage(message) {
        if (this.targetWindow) {
            this.targetWindow.postMessage(message, this.targetOrigin);
            console.log('Message sent to parent:', message);
        } else {
            console.warn('No parent window to send message to.');
        }
    }
}

export default PostMessageManager;


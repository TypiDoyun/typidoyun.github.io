export var Keyboard;
(function (Keyboard) {
    const listeners = new Map();
    Keyboard.addEventListener = ({ keyCodes, listener, keyState = "down", withCtrl = false, withAlt = false, withShift = false, useStrict = true }) => {
        const eventName = `key${keyState}`;
        const wrapperListener = (eventData) => {
            // console.log(eventData.key);
            if (!keyCodes.includes(eventData.key))
                return;
            if (withCtrl && !eventData.ctrlKey)
                return;
            if (useStrict && !withCtrl && eventData.ctrlKey)
                return;
            if (withAlt && !eventData.altKey)
                return;
            if (useStrict && !withAlt && eventData.altKey)
                return;
            if (withShift && !eventData.shiftKey)
                return;
            if (useStrict && !withShift && eventData.shiftKey)
                return;
            listener(keyCodes.find(keyCode => keyCode === eventData.key), eventData);
        };
        listeners.set(listener, wrapperListener);
        document.addEventListener(eventName, wrapperListener);
    };
    Keyboard.removeEventListener = (listener) => {
        const wrapperListener = listeners.get(listener);
        if (!wrapperListener)
            return;
        document.removeEventListener("keydown", wrapperListener);
        document.removeEventListener("keyup", wrapperListener);
    };
})(Keyboard || (Keyboard = {}));

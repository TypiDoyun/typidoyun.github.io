export type KeyCode = 
  | "Escape"
  | "Backspace"
  | "Tab"
  | "Enter"
  | "Shift"
  | "Control"
  | "Alt"
  | "Meta"
  | "Pause"
  | "CapsLock"
  | " "
  | "PageUp" | "PageDown"
  | "End" | "Home"
  | "ArrowLeft" | "ArrowUp" | "ArrowRight" | "ArrowDown"
  | "Insert" | "Delete"
  | "`" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" | "-" | "="
  | "~" | "!" | "@" | "#" | "$" | "%" | "^" | "&" | "*" | "(" | ")" | "_" | "+"
  | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"
  | "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"
  | "ㄱ" | "ㄴ" | "ㄷ" | "ㄹ" | "ㅁ" | "ㅂ" | "ㅅ" | "ㅇ" | "ㅈ" | "ㅊ" | "ㅋ" | "ㅌ" | "ㅍ" | "ㅎ" | "ㅏ" | "ㅑ" | "ㅓ" | "ㅕ" | "ㅗ" | "ㅛ" | "ㅜ" | "ㅠ" | "ㅡ" | "ㅣ" | "ㅐ" | "ㅔ"
  | "ㄲ" | "ㄸ" | "ㅃ" | "ㅆ" | "ㅉ" | "ㅒ" | "ㅖ"
  | "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" | "F10" | "F11" | "F12"
  | "NumLock"
  | "ScrollLock"
  | "[" | "]" | "\\" | ";" | "\'" | "," | "." | "/"
  | "{" | "}" | "|" | ":" | "\"" | "<" | ">" | ">"

export type KeyState = "up" | "down";
export type KeyboardEventListener = (keyCode: KeyCode, eventData: KeyboardEvent) => any;
export type Options = {
    keyCodes: KeyCode[],
    listener: KeyboardEventListener,
    keyState?: KeyState,
    withCtrl?: boolean,
    withAlt?: boolean,
    withShift?: boolean,
    useStrict?: boolean
}

export namespace Keyboard {
    const listeners = new Map<KeyboardEventListener, (eventData: KeyboardEvent) => any>();

    export const addEventListener = ({
        keyCodes,
        listener,
        keyState = "down",
        withCtrl = false,
        withAlt = false,
        withShift = false,
        useStrict = true
    }: Options) => {
        const eventName = `key${keyState}` as const;

        const wrapperListener = (eventData: KeyboardEvent) => {
            // console.log(eventData.key);
            if (!keyCodes.includes(eventData.key as KeyCode)) return;
            if (withCtrl && !eventData.ctrlKey) return;
            if (useStrict && !withCtrl && eventData.ctrlKey) return;
            if (withAlt && !eventData.altKey) return;
            if (useStrict && !withAlt && eventData.altKey) return;
            if (withShift && !eventData.shiftKey) return;
            if (useStrict && !withShift && eventData.shiftKey) return;

            listener(keyCodes.find(keyCode => keyCode === eventData.key as KeyCode)!, eventData);
        }

        listeners.set(listener, wrapperListener);

        document.addEventListener(eventName, wrapperListener);
    }

    export const removeEventListener = (listener: KeyboardEventListener) => {
        const wrapperListener = listeners.get(listener);
        if (!wrapperListener) return;

        document.removeEventListener("keydown", wrapperListener);
        document.removeEventListener("keyup", wrapperListener);
    }
}
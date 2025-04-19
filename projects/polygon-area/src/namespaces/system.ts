export namespace System {
    export const runAsyncInterval = async (callback: (clear: () => void) => void, interval: number) => {
        return new Promise<void>(resolve => {
            const clear = () => {
                clearInterval(intervalId);
                resolve();
            }
            const intervalId = setInterval(() => {
                callback(clear);
            }, interval);
        });
    }

    export const runAsyncIntervalWithTime = async (callback: (t: number, clear: () => void) => void, time: number, interval: number) => {
        return new Promise<void>(resolve => {
            const startTime = Date.now();
            const clear = () => {
                clearInterval(intervalId);
                resolve();
            };
            const intervalId = setInterval(() => {
                const t = Date.now() - startTime;
                if (t >= time) {
                    clear();
                }
                else {
                    callback(t, clear);
                }
            }, interval);
        });
    }
}
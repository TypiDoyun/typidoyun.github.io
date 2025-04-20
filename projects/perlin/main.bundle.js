/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "/main.bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			357: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
let imageCreated = false;
let isDrawing = false;
const main = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const createButton = document.getElementById("create");
    const saveButton = document.getElementById("save");
    const progressBar = document.getElementById("progress-bar");
    const progressBarFill = document.getElementById("progress-bar-fill");
    const menuBar = document.getElementById("menu-bar");
    const worker = new Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u(607), __webpack_require__.b), {
        type: undefined
    });
    if (!window.Worker)
        throw new Error("Web Worker is not supported in this browser.");
    if (!ctx)
        throw new Error("Failed to get canvas context");
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        imageCreated = false;
    };
    resizeCanvas();
    addEventListener("resize", resizeCanvas);
    createButton.addEventListener("click", () => {
        if (isDrawing) {
            createButton.classList.add("error-shake");
            createButton.addEventListener("animationend", () => {
                createButton.classList.remove("error-shake");
            }, { once: true });
            return;
        }
        isDrawing = true;
        const seed = +(document.getElementById("seed").value ?? "0");
        const scale = +(document.getElementById("scale").value ?? "1");
        const octaves = +(document.getElementById("octaves").value ?? "4");
        const persistence = +(document.getElementById("persistence").value ?? "0.5");
        const lacunarity = +(document.getElementById("lacunarity").value ?? "2.0");
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        worker.postMessage({
            type: "create",
            data: imageData,
            canvas: {
                width: canvas.width,
                height: canvas.height
            },
            seed,
            scale,
            octaves,
            persistence,
            lacunarity,
        });
    });
    saveButton.addEventListener("click", () => {
        if (!imageCreated) {
            saveButton.classList.add("error-shake");
            saveButton.addEventListener("animationend", () => {
                saveButton.classList.remove("error-shake");
            }, { once: true });
            return;
        }
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "perlin_noise.png";
        link.click();
    });
    worker.onmessage = eventData => {
        const receivedData = eventData.data;
        if (receivedData.type !== "create")
            return;
        switch (receivedData.status) {
            case "succeed":
                imageCreated = true;
                ctx.putImageData(receivedData.data, 0, 0);
                progressBar.style.transform = "translateY(-5px)";
                progressBarFill.style.width = "0%";
                break;
            case "failed":
                console.error("Failed to create image data:", receivedData.message);
                progressBar.style.transform = "translateY(-5px)";
                progressBarFill.style.width = "0%";
                break;
            case "in-progress":
                progressBar.style.transform = "translateY(0)";
                progressBarFill.style.width = `${receivedData.progress * 100}%`;
                break;
        }
        isDrawing = false;
    };
    const checkboxes = document.querySelectorAll('#menu-bar input[type="checkbox"]');
    const handleCheckboxChange = (eventData) => {
        const currentCheckbox = eventData.target;
        if (!(currentCheckbox instanceof HTMLInputElement)) {
            console.error("Event target is not an HTMLInputElement.");
            return;
        }
        // 현재 체크박스가 체크된 경우에만 다른 체크박스 해제 로직 실행
        if (currentCheckbox.checked) {
            checkboxes.forEach((checkbox) => {
                // 현재 클릭된 체크박스가 아니면
                if (checkbox !== currentCheckbox) {
                    checkbox.checked = false; // 다른 체크박스들을 모두 해제합니다.
                }
            });
        }
        // 현재 체크박스가 해제된 경우는 아무것도 하지 않아도 됩니다 (기본 동작).
        // 선택된 값 확인 (옵션)
        let selectedValue = null;
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                selectedValue = checkbox.value;
            }
        });
        console.log("선택된 값:", selectedValue);
    };
    // 각 체크박스에 이벤트 리스너 등록
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });
};
addEventListener("DOMContentLoaded", main);


/******/ })()
;
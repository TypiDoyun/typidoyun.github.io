import { WorkerRequest, WorkerResponse } from "./worker";

let imageCreated = false;
let isDrawing = false;
const main = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const createButton = document.getElementById("create") as HTMLButtonElement;
    const saveButton = document.getElementById("save") as HTMLButtonElement;
    const progressBar = document.getElementById("progress-bar") as HTMLProgressElement;
    const progressBarFill = document.getElementById("progress-bar-fill") as HTMLDivElement;

    const menuBar = document.getElementById("menu-bar") as HTMLDivElement;

    const worker = new Worker(new URL('./worker.js', import.meta.url), {
        type: 'module'
    });

    if (!window.Worker) throw new Error("Web Worker is not supported in this browser.");

    if (!ctx) throw new Error("Failed to get canvas context");

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        imageCreated = false;
    }


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
        const seed = +((document.getElementById("seed") as HTMLInputElement).value ?? "0");
        const scale = +((document.getElementById("scale") as HTMLInputElement).value ?? "1");
        const octaves = +((document.getElementById("octaves") as HTMLInputElement).value ?? "4");
        const persistence = +((document.getElementById("persistence") as HTMLInputElement).value ?? "0.5");
        const lacunarity = +((document.getElementById("lacunarity") as HTMLInputElement).value ?? "2.0");
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
        } satisfies WorkerRequest);
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
        const receivedData = eventData.data as WorkerResponse;
        if (receivedData.type !== "create") return;

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
    }


    const checkboxes = document.querySelectorAll('#menu-bar input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    const handleCheckboxChange = (eventData: Event) => {
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

}

addEventListener("DOMContentLoaded", main);
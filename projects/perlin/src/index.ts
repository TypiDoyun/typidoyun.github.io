import { WorkerRequest, WorkerResponse } from "./worker";


const main = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const createButton = document.getElementById("create") as HTMLButtonElement;
    const saveButton = document.getElementById("save") as HTMLButtonElement;
    const progressBar = document.getElementById("progress-bar") as HTMLProgressElement;
    const progressBarFill = document.getElementById("progress-bar-fill") as HTMLDivElement;
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
    }

    
    resizeCanvas();
    addEventListener("resize", resizeCanvas);

    let isDrawing = false;
    createButton.addEventListener("click", () => {
        if (isDrawing) {
            createButton.classList.add("error-shake");

            createButton.addEventListener("animationend", () => {
                createButton.classList.remove("error-shake");
            }, { once: true });
            return;
        }
        isDrawing = true;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        worker.postMessage({
            type: "create",
            data: imageData,
            canvas: {
                width: canvas.width,
                height: canvas.height
            }
        } satisfies WorkerRequest);
    });
    let imageCreated = false;
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
                progressBar.style.display = "none";
                break;
            case "failed":
                console.error("Failed to create image data:", receivedData.message);
                progressBar.style.display = "none";
                break;
            case "in-progress":
                progressBar.style.display = "block";
                progressBarFill.style.width = `${receivedData.progress * 100}%`;
                break;
        }
        isDrawing = false;
    }

}

addEventListener("DOMContentLoaded", main);
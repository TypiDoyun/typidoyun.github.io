let lastStartElement: HTMLDivElement | undefined;
let lastEndElement: HTMLDivElement | undefined;

const changeStatus = (eventData: MouseEvent) => {
    const blocks = Array.from(document.getElementsByClassName('block') as HTMLCollectionOf<HTMLDivElement>);
    const block = eventData.target as HTMLDivElement;
    const status = getStatus(block);
    if (block.hasAttribute("data-drag-start")) {
        block.toggleAttribute("data-drag-start", false);
        return;
    }
    const nextStatus = (status + 1) % 4;

    if (nextStatus === Status.Start || nextStatus === Status.End) {
        for (const element of blocks) {
            if (element === block) continue;
            const currentStatus = getStatus(element);

            if (currentStatus === nextStatus) element.setAttribute("data-status", `${Status.Path}`);
            if (currentStatus === Status.Start) lastStartElement = element;
            if (currentStatus === Status.End) lastEndElement = element;
        }
    }

    block.setAttribute("data-status", `${nextStatus}`);

    if (blocks.every(element => getStatus(element) !== Status.Start) && lastStartElement) {
        lastStartElement.setAttribute("data-status", `${Status.Start}`);
        lastStartElement = undefined;
    }
    if (blocks.every(element => getStatus(element) !== Status.End) && lastEndElement) {
        lastEndElement.setAttribute("data-status", `${Status.End}`);
        lastEndElement = undefined;
    }
}

let isHolding = false;

const setHolding = (eventData: MouseEvent) => {
    const block = eventData.target as HTMLDivElement;
    changeStatus(eventData);
    block.toggleAttribute("data-draged", true);
    block.toggleAttribute("data-drag-start", true);
    isHolding = true;
}

const onMouseMove = (eventData: MouseEvent) => {
    if (!isHolding) return;
    const block = eventData.target as HTMLDivElement;
    if (block.hasAttribute("data-draged")) {
        eventData.preventDefault();
        return;
    }
    changeStatus(eventData);
    block.toggleAttribute("data-draged", true);
}

window.addEventListener("mouseup", () => {
    isHolding = false;
    const blocks = Array.from(document.getElementsByClassName('block') as HTMLCollectionOf<HTMLDivElement>);
    for (const block of blocks) {
        block.toggleAttribute("data-draged", false);
    }
})

const initMap = () => {
    console.log("map element is initialized");

    const map = document.getElementById("map") as HTMLDivElement;
    const computedStyle = getComputedStyle(map);
    const width = +computedStyle.getPropertyValue("--width");
    const height = +computedStyle.getPropertyValue("--height");

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const block = document.createElement("div");

            block.classList.add("block");
            block.onclick = changeStatus;
            block.onmousedown = setHolding;
            block.onmousemove = onMouseMove;
            block.setAttribute("data-status", `${Status.Path}`);
            block.toggleAttribute("data-draged", false);

            map.appendChild(block);
        }
    }
}
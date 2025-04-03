"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const makeDragable = (element) => {
    let isHolding = false;
    const startPosition = {
        x: 0,
        y: 0
    };
    const deltaPosition = {
        x: 0,
        y: 0
    };
    const onMouseDown = (eventData) => {
        eventData.preventDefault();
        isHolding = true;
        startPosition.x = eventData.clientX;
        startPosition.y = eventData.clientY;
    };
    const onMouseUp = () => {
        isHolding = false;
    };
    const onMouseMove = (eventData) => {
        if (!isHolding)
            return;
        eventData.preventDefault();
        deltaPosition.x = eventData.clientX - startPosition.x;
        deltaPosition.y = eventData.clientY - startPosition.y;
        startPosition.x = eventData.clientX;
        startPosition.y = eventData.clientY;
        const left = Math.min(window.innerWidth - element.clientWidth, Math.max(0, element.offsetLeft + deltaPosition.x));
        const top = Math.min(window.innerHeight - element.clientHeight, Math.max(0, element.offsetTop + deltaPosition.y));
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
    };
    element.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
};

const makeDragable = (element: HTMLElement) => {
    let isHolding = false;

    const startPosition = {
        x: 0,
        y: 0
    };
    const deltaPosition = {
        x: 0,
        y: 0
    }

    const onMouseDown = (eventData: MouseEvent) => {
        eventData.preventDefault();

        isHolding = true;

        startPosition.x = eventData.clientX;
        startPosition.y = eventData.clientY;
    }
    
    const onMouseUp = () => {
        isHolding = false;
    }
    
    const onMouseMove = (eventData: MouseEvent) => {
        if (!isHolding) return;

        eventData.preventDefault();
        
        deltaPosition.x = eventData.clientX - startPosition.x;
        deltaPosition.y = eventData.clientY - startPosition.y;
        startPosition.x = eventData.clientX;
        startPosition.y = eventData.clientY;

        element.style.left = `${element.offsetLeft + deltaPosition.x}px`;
        element.style.top = `${element.offsetTop + deltaPosition.y}px`;
    }

    element.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
}
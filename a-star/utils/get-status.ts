const getStatus = (element: HTMLElement): Status => {
    return +element.getAttribute("data-status")!;
}
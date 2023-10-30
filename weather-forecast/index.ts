const color = "#999";

const createModal = (titleMessage: string, message: string) => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.position = "absolute";
    modal.style.width = "25%";
    modal.style.height = "20%";
    modal.style.backgroundColor = "#fff";
    modal.style.overflow = "hidden";
    modal.style.borderRadius = "5px";
    modal.style.display = "grid";
    modal.style.gridTemplateRows = "40px 4fr";
    modal.style.boxShadow = "1px 1px 20px 0px rgba(0,0,0,0.25)"

    const header = document.createElement("div");
    header.classList.add("modal-header");
    header.style.display = "flex";
    header.style.flexDirection = "row";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.marginLeft = "20px"
    
    const title = document.createElement("span");
    title.innerText = titleMessage;
    title.style.color = color;

    const icons = document.createElement("div");
    icons.style.height = "100%";
    icons.style.display = "flex";

    const icon1 = document.createElement("div");
    icon1.style.display = "flex";
    icon1.style.justifyContent = "center";
    icon1.style.alignItems = "center";
    icon1.style.width = "50px";
    icon1.style.height = "100%";
    const line = document.createElement("ion-icon");
    line.setAttribute("name", "remove-outline");
    line.style.transform = "scale(1.4)";
    line.style.color = color;
    icon1.appendChild(line);
    
    const icon2 = document.createElement("div");
    icon2.style.display = "flex";
    icon2.style.justifyContent = "center";
    icon2.style.alignItems = "center";
    icon2.style.width = "50px";
    icon2.style.height = "100%";
    const square = document.createElement("ion-icon");
    square.setAttribute("name", "square-outline");
    square.style.transform = "scale(0.9)";
    square.style.color = color;
    icon2.appendChild(square);
    
    const icon3 = document.createElement("div");
    icon3.style.display = "flex";
    icon3.style.justifyContent = "center";
    icon3.style.alignItems = "center";
    icon3.style.width = "50px";
    icon3.style.height = "100%";
    const quit = document.createElement("ion-icon");
    quit.setAttribute("name", "add-outline");
    quit.style.transform = "rotate(45deg) scale(1.6)";
    quit.style.color = color;
    icon3.appendChild(quit)

    icons.appendChild(icon1);
    icons.appendChild(icon2);
    icons.appendChild(icon3);

    header.appendChild(title);
    header.appendChild(icons);

    const content = document.createElement("div");
    content.classList.add("modal-content");
    content.style.backgroundColor = "#fafafa";
    content.style.display = "flex";
    content.style.justifyContent = "center";
    content.style.alignItems = "center";

    const progress = document.createElement("progress");
    progress.setAttribute("value", "0");
    progress.setAttribute("max", "100");
    let progressValue = 0;
    const interval = setInterval(() => {
        if (progressValue >= 100) {
            clearInterval(interval);
            progress.innerText = "끝.";
            return;
        }
        progressValue++;
        progress.setAttribute("value", String(progressValue));
    }, 10);

    content.appendChild(progress);

    modal.appendChild(header);
    modal.appendChild(content);
    document.body.appendChild(modal);
    return modal;
}
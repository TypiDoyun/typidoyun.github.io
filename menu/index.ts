const menuItems = Array.from(document.getElementsByClassName("menuItem")) as HTMLElement[];

for (const menuItem of menuItems) {
    const textArray = menuItem.textContent.split("");
    menuItem.textContent = "";

    textArray.forEach((char, index) => {
        const span = document.createElement("span");

        span.classList.add("couple");

        const delay = (index + 1) / 20;

        const charIn = document.createElement("span");
        const charOut = document.createElement("span");

        charIn.textContent = char;
        charOut.textContent = char;

        charIn.style.transitionDelay = `${delay}s`;
        charOut.style.transitionDelay = `${delay}s`;

        charIn.classList.add("in");
        charOut.classList.add("out");

        span.appendChild(charOut);
        span.appendChild(charIn);

        menuItem.appendChild(span);
    });
}
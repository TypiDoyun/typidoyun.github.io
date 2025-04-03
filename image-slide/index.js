"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let index = 0;
const imageSection = document.getElementById("imageSection");
const moveButtons = Array.from(document.getElementsByClassName("moveButton"));
const setIndex = (value) => {
    index = value;
    if (index < 0 || index >= moveButtons.length)
        return;
    for (const button of moveButtons) {
        button.style.backgroundColor = "#00000022";
    }
    moveButtons[index].style.backgroundColor = "#00000066";
};
setIndex(index);
const moveImage = (to) => {
    if (isNaN(+to))
        return;
    setIndex(to);
    imageSection.style.left = `calc(var(--image-width) * -${index + 1})`;
};
const connectImage = (isNext) => {
    if (isNext) {
        if (index != 3)
            return;
        imageSection.style.transition = "left 0s";
        moveImage(-1);
        return true;
    }
    else {
        if (index != 0)
            return;
        imageSection.style.transition = "left 0s";
        moveImage(4);
        return true;
    }
};
const nextImage = () => {
    connectImage(true);
    setIndex(++index % 4);
    setTimeout(() => {
        imageSection.style.transition = "left .2s ease";
        moveImage(index);
    }, 0);
};
const prevImage = () => {
    connectImage(false);
    setIndex(--index % 4);
    setIndex(index < 0 ? 4 + index : index);
    setTimeout(() => {
        imageSection.style.transition = "left .2s ease";
        moveImage(index);
    }, 0);
};

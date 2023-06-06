"use strict";
const item = document.getElementsByClassName("item")[0];
const move = (where) => {
    const element = document.getElementById(`section${where}`);
    if (!element)
        return;
    window.scrollTo({
        top: item.clientHeight * (where - 1),
        behavior: "smooth"
    });
};

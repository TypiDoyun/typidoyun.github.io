"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const menu = document.querySelector(".menu");
const toggle = document.querySelector(".toggle");
toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
});

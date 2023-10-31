const menu = document.querySelector(".menu") as HTMLDivElement;
const toggle = document.querySelector(".toggle") as HTMLDivElement;

toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
})
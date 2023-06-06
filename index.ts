const item = document.getElementsByClassName("item")[0];
const move = (where: 1 | 2 | 3) => {
    const element = document.getElementById(`section${where}`);

    if (!element) return;

    window.scrollTo({
        top: item.clientHeight * (where - 1),
        behavior: "smooth"
    });
}
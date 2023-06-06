const move = (where: 1 | 2 | 3) => {
    const element = document.getElementById(`section${where}`);
    const parent = document.getElementsByClassName("item")[0];

    if (!element) return;

    window.scrollTo({
        top: parent.clientHeight * (where - 1),
        behavior: "smooth"
    });
}
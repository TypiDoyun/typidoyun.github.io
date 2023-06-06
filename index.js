var move = function (where) {
    var element = document.getElementById("section".concat(where));
    var parent = document.getElementsByClassName("item")[0];
    if (!element)
        return;
    window.scrollTo({
        top: parent.clientHeight * (where - 1),
        behavior: "smooth"
    });
};

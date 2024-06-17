var items = Array.from(document.getElementsByClassName("item"));
var sections = Array.from(document.getElementsByClassName("section"));
var item = items[0];
var mousePosition = {
    x: 0,
    y: 0
};
var getMousePosition = function (eventData) {
    mousePosition.x = eventData.clientX;
    mousePosition.y = eventData.clientY;
};
addEventListener("mousemove", getMousePosition);
var move = function (where, behavior) {
    if (behavior === void 0) { behavior = "smooth"; }
    var element = document.getElementById("section".concat(where));
    if (!element)
        return;
    window.scrollTo({
        top: item.clientHeight * (where - 1),
        behavior: behavior
    });
};
addEventListener("resize", function () {
    move(1, "instant");
});
var distanceLimit = 60;
var _loop_1 = function (index) {
    var item_1 = items[index];
    var section = sections[index];
    var tick = 0;
    setInterval(function () {
        if (tick > 0)
            tick--;
    }, 10);
    var interval;
    section.addEventListener("mouseenter", function () {
        if (tick > 0)
            return;
        if (window.innerWidth < 1024)
            return;
        item_1.style.position = "relative";
        section.style.position = "absolute";
        section.style.transition = "transform 0.5s";
        section.style.left = "0";
        section.style.top = "0";
        interval = setInterval(function () {
            var absoluteCenter = {
                x: item_1.offsetLeft + section.clientWidth / 2,
                y: item_1.offsetTop + section.clientHeight / 2
            };
            var center = {
                x: absoluteCenter.x + section.offsetLeft,
                y: absoluteCenter.y + section.offsetTop
            };
            var direction = {
                x: mousePosition.x - absoluteCenter.x,
                y: mousePosition.y - absoluteCenter.y
            };
            var distance = Math.pow((Math.pow(direction.x, 2) + Math.pow(direction.y, 2)), 0.5);
            var destination = {
                x: distance > distanceLimit ? direction.x * (distanceLimit / distance) : direction.x,
                y: distance > distanceLimit ? direction.y * (distanceLimit / distance) : direction.y
            };
            var destDirection = {
                x: destination.x - (center.x - absoluteCenter.x),
                y: destination.y - (center.y - absoluteCenter.y),
            };
            section.style.left = "".concat(+section.style.left.replace("px", "") + (destDirection.x / 100), "px");
            section.style.top = "".concat(+section.style.top.replace("px", "") + (destDirection.y / 50), "px");
        }, 10);
    });
    section.addEventListener("mouseleave", function () {
        section.style.position = "relative";
        section.style.transition = ".5s";
        section.style.left = "0";
        section.style.top = "0";
        tick = 1;
        clearInterval(interval);
    });
};
for (var index = 0; index < sections.length; index++) {
    _loop_1(index);
}

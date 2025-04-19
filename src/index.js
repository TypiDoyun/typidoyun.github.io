"use strict";
const main = () => {
    const items = Array.from(document.getElementsByClassName("item"));
    const sections = Array.from(document.getElementsByClassName("section"));
    const item = items[0];
    const mousePosition = {
        x: 0,
        y: 0
    };
    const getMousePosition = (eventData) => {
        mousePosition.x = eventData.clientX;
        mousePosition.y = eventData.clientY;
    };
    addEventListener("mousemove", getMousePosition);
    const move = (where, behavior = "smooth") => {
        const element = document.getElementById(`section${where}`);
        if (!element)
            return;
        window.scrollTo({
            top: item.clientHeight * (where - 1),
            behavior
        });
    };
    addEventListener("resize", () => {
        move(1, "instant");
    });
    const distanceLimit = 60;
    for (let index = 0; index < sections.length; index++) {
        const item = items[index];
        const section = sections[index];
        let tick = 0;
        setInterval(() => {
            if (tick > 0)
                tick--;
        }, 10);
        let interval;
        section.addEventListener("mouseenter", () => {
            if (tick > 0)
                return;
            if (window.innerWidth < 1024)
                return;
            item.style.position = "relative";
            section.style.position = "absolute";
            section.style.transition = "transform 0.5s";
            section.style.left = "0";
            section.style.top = "0";
            interval = setInterval(() => {
                const absoluteCenter = {
                    x: item.offsetLeft + section.clientWidth / 2,
                    y: item.offsetTop + section.clientHeight / 2
                };
                const center = {
                    x: absoluteCenter.x + section.offsetLeft,
                    y: absoluteCenter.y + section.offsetTop
                };
                const direction = {
                    x: mousePosition.x - absoluteCenter.x,
                    y: mousePosition.y - absoluteCenter.y
                };
                const distance = (direction.x ** 2 + direction.y ** 2) ** 0.5;
                const destination = {
                    x: distance > distanceLimit ? direction.x * (distanceLimit / distance) : direction.x,
                    y: distance > distanceLimit ? direction.y * (distanceLimit / distance) : direction.y
                };
                const destDirection = {
                    x: destination.x - (center.x - absoluteCenter.x),
                    y: destination.y - (center.y - absoluteCenter.y),
                };
                section.style.left = `${+section.style.left.replace("px", "") + (destDirection.x / 100)}px`;
                section.style.top = `${+section.style.top.replace("px", "") + (destDirection.y / 50)}px`;
            }, 10);
        });
        section.addEventListener("mouseleave", () => {
            section.style.position = "relative";
            section.style.transition = ".5s";
            section.style.left = "0";
            section.style.top = "0";
            tick = 1;
            clearInterval(interval);
        });
    }
};
addEventListener("DOMContentLoaded", main);

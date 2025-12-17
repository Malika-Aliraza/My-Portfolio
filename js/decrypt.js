function hybridDecrypt(element, speed = 20) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const original = element.innerText;
    let iteration = 0;

    const interval = setInterval(() => {
        element.innerText = original
            .split("")
            .map((char, index) => {
                if (index < iteration) return original[index];
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");

        if (iteration >= original.length) clearInterval(interval);
        iteration += 1;
    }, speed);
}

window.addEventListener("DOMContentLoaded", () => {
    hybridDecrypt(document.getElementById("decrypt-text"), 30);
});
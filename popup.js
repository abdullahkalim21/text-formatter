document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const resultDiv = document.getElementById("result");
    const copyButton = document.getElementById("copyResult");
    const notification = document.getElementById("notification");
    const wordCount = document.getElementById("words-count");

    const capitalizeAll = () => {
        resultDiv.textContent = inputText.value.toUpperCase();
    };

    const capitalizeInitial = () => {
        resultDiv.textContent = inputText.value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const capitalizeFirst = () => {
        const text = inputText.value;
        resultDiv.textContent = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    };

    const lowercaseAll = () => {
        resultDiv.textContent = inputText.value.toLowerCase();
    };

    // Count words
    const count = (s) => {
        if (s.trim() === "") { return 0; }
        return s.trim().split(/\s+/).length
    };
    // Update the word count
    const updateWordCount = () => {
        wordCount.innerHTML = `Total Words: ${count(inputText.value)}`;
    };

    const showNotification = (message) => {
        notification.textContent = message;
        notification.classList.remove("hidden");
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
            notification.classList.add("hidden");
        }, 2000);
    };

    const copyResult = () => {
        navigator.clipboard.writeText(resultDiv.textContent).then(() => {
            showNotification("✔ Text copied to clipboard!");
        });
    };

    document.getElementById("capitalizeAll").addEventListener("click", capitalizeAll);
    document.getElementById("capitalizeInitial").addEventListener("click", capitalizeInitial);
    document.getElementById("capitalizeFirst").addEventListener("click", capitalizeFirst);
    document.getElementById("lowercaseAll").addEventListener("click", lowercaseAll);
    copyButton.addEventListener("click", copyResult);
    document.getElementById("inputText").addEventListener("input", updateWordCount);
});

document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const resultDiv = document.getElementById("result");
    const copyButton = document.getElementById("copyResult");
    const notification = document.getElementById("notification");
    const wordCount = document.getElementById("words-count");

    // Get highlighted text from the current tab IMMEDIATELY when popup opens
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: () => window.getSelection().toString(), // Directly get selected text
        },
        (selection) => {
            // Handle the result from the injected script
            const selectedText = selection[0]?.result || "";
            inputText.value = selectedText;
            updateWordCount();
        });
    });

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

    // Update the word count
    const updateWordCount = () => {
        const words = inputText.value.trim().split(/\s+/).filter(word => word !== '');
        wordCount.innerHTML = `Total Words: ${words.length}`;
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
    inputText.addEventListener("input", updateWordCount);
});

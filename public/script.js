document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("chat-form");
    const chatBox = document.getElementById("chat-box");
    const inputField = document.getElementById("message");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const message = inputField.value.trim();

        if (!message) return;

        // Display user message
        appendMessage("user", message);
        inputField.value = "";

        try {
            // Send request to server
            const response = await fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            console.log(data);
            
            // Correct extraction based on Together API response format
            const botResponse = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";

            // Display bot response
            appendMessage("bot", botResponse);
        } catch (error) {
            console.error("Error:", error);
            appendMessage("bot", "Oops! Something went wrong. Try again.");
        }
    });

    function appendMessage(sender, text) {
        console.log("i am running");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageDiv.innerText = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

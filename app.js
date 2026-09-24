console.log("VibeCraft AI is awake! ⚡");

// 1. Grab all the elements we need from the HTML
const generateBtn = document.getElementById("generateBtn"); // The Test Me button
const outputCard = document.getElementById("outputCard");
const finalPrompt = document.getElementById("finalPrompt");
const copyBtn = document.getElementById("copyBtn");
const regenBtn = document.getElementById("regenerateBtn");

// 2. Find all the app type cards
const appTypeCards = document.querySelectorAll('input[name="appType"]');
const modelName = document.getElementById("modelName");
const modelReason = document.getElementById("modelReason");
const priceTier = document.querySelector(".price-tier");

// 3. Listen for clicks on any of the app type cards
appTypeCards.forEach(card => {
    card.addEventListener("change", () => {
        const timeText = document.getElementById("timeEstimate");
        const hackText = document.getElementById("productivityHack");
        const ratingText = document.getElementById("modelRating");

        if (card.value === "ide") {
            modelName.textContent = "Claude 3.7 Sonnet";
            modelReason.textContent = "Best for high-logic premium coding.";
            priceTier.textContent = "Premium Tier";
            priceTier.style.background = "#E67E22"; // Orange for premium
            ratingText.textContent = "★★★★★ (5/5 Capability)"; // 5 stars for Claude
            timeText.textContent = "4 - 6 hours";
            hackText.textContent = "Use Cursor's AI chat to explain concepts before writing code.";
        } else if (card.value === "cli") {
            modelName.textContent = "DeepSeek-V3 / R1";
            modelReason.textContent = "Best for fast command-line scripts.";
            priceTier.textContent = "Free Tier";
            priceTier.style.background = "var(--accent)"; // Back to teal
            ratingText.textContent = "★★★★☆ (4.5/5 Capability)"; // 4.5 stars
            timeText.textContent = "1 - 2 hours";
            hackText.textContent = "Build a tiny version first, then add one feature at a time.";
        } else {
            modelName.textContent = "DeepSeek-V3 / R1";
            modelReason.textContent = "Best for free power and learning.";
            priceTier.textContent = "Free Tier";
            priceTier.style.background = "var(--accent)"; // Back to teal
            ratingText.textContent = "★★★★☆ (4.5/5 Capability)"; // 4.5 stars
            timeText.textContent = "2 - 4 hours";
            hackText.textContent = "Use the Pomodoro Technique (25 mins work, 5 mins break).";
        }
    });
});

// 4. The Core Prompt Generator (Updated with Error Handling)
generateBtn.addEventListener("click", () => {
    const idea = document.getElementById("ideaBox").value.trim(); // .trim() removes empty spaces
    const toast = document.getElementById("toastMessage");

    // Get the complexity
    const complexity = document.getElementById("complexitySlider").value;
    let complexityText = "Medium";
    if (complexity === "1") complexityText = "Simple";
    if (complexity === "3") complexityText = "Large";

    // Edge Case: Empty Idea Box
    if (idea === "") {
        toast.textContent = "Oops! Your idea box is empty. Even one sentence is enough to start.";
        toast.style.display = "block";
        setTimeout(() => { toast.style.display = "none"; }, 4000); // Hide after 4 seconds
        return; // Stop the function here
    }

    // Edge Case: Too Short
    if (idea.length < 5) {
        toast.textContent = "Can you add a tiny bit more detail? Like what it does or who it helps.";
        toast.style.display = "block";
        setTimeout(() => { toast.style.display = "none"; }, 4000);
        return;
    }

    // If it passes the tests, generate the prompt
    const selectedType = document.querySelector('input[name="appType"]:checked').value;
    const isFiveYearOld = document.getElementById("fiveYearOldToggle").checked;

    let prompt = `You are an expert coding mentor for a complete beginner.\n`;
    prompt += `I want to build a ${selectedType} app. Here is my idea:\n"${idea}"\n\n`;

    if (isFiveYearOld) {
        prompt += `CRITICAL RULE: Explain everything to me like I am 5 years old. Use simple analogies. Do NOT dump massive blocks of code. Act as a pair programmer and guide me step-by-step.\n\n`;
    } else {
        prompt += `Please explain the steps clearly and provide code when necessary.\n\n`;
    }

    prompt += `Project Complexity: ${complexityText}. Adjust the detail and scope of your plan accordingly.\n\n`;
    prompt += `MANDATORY SETUP BLUEPRINT:\n`;
    prompt += `1. Teach me how to set up VS Code and create the necessary folders.\n`;
    prompt += `2. Explain the basic terminal commands I need (like ls, cd, mkdir).\n`;
    prompt += `3. Walk me through initializing Git and GitHub.\n\n`;
    prompt += `Let's build this together, step by step. Do not hallucinate tools or steps.`;

    finalPrompt.value = prompt;
    outputCard.style.display = "block";
    saveToHistory(prompt); // <-- Add this line!
});

// 5. Copy the prompt to clipboard
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(finalPrompt.value).then(() => {
        copyBtn.textContent = "🎉 Copied!";
        copyBtn.classList.add("pulse"); // Add the gold pulse animation
        setTimeout(() => {
            copyBtn.textContent = "📋 Copy Prompt";
            copyBtn.classList.remove("pulse"); // Remove it so it can pulse again next time
        }, 2000); // Changes back after 2 seconds
    });
});

// 6. Regenerate button (just hides the box so they can try again)
regenBtn.addEventListener("click", () => {
    outputCard.style.display = "none";
    document.getElementById("ideaBox").value = ""; // Clears the text area
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolls back to top
});

// 7. Daily Internet Sync Simulation
const syncBtn = document.getElementById("syncButton");
const lastUpdatedSpan = document.getElementById("lastUpdated");
const syncStatusSpan = document.getElementById("syncStatus");

// Check the toy chest (localStorage) when the page loads
function loadLastSync() {
    const savedDate = localStorage.getItem("vibeCraftLastSync");
    if (savedDate) {
        lastUpdatedSpan.textContent = savedDate;
    }
}

// When the user clicks "Sync Now"
syncBtn.addEventListener("click", () => {
    syncStatusSpan.textContent = "Syncing...";
    syncStatusSpan.style.color = "#E67E22"; // Orange
    
    // Pretend it takes 1 second to reach the internet
    setTimeout(() => {
        const now = new Date();
        const timeString = now.toLocaleDateString() + " at " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        lastUpdatedSpan.textContent = timeString;
        syncStatusSpan.textContent = "Online ✅";
        syncStatusSpan.style.color = "#20B2AA"; // Back to teal
        
        // Save to the toy chest
        localStorage.setItem("vibeCraftLastSync", timeString);
    }, 1000);
});

// Run the load function when the app starts
loadLastSync();

// 8. The Surprise Me Button Logic (Upgraded with Custom Ideas)
const surpriseBtn = document.getElementById("surpriseBtn");
const ideaBox = document.getElementById("ideaBox");
const customIdeaInput = document.getElementById("customIdeaInput");
const addIdeaBtn = document.getElementById("addIdeaBtn");

// Start with the default bag of ideas
let appIdeas = [
    "A habit tracker that helps me build a daily reading routine.",
    "A flashcard quiz app for studying for my history exams.",
    "A simple recipe finder that suggests meals based on what's in my fridge.",
    "A daily journal that asks me one thoughtful question every morning.",
    "A budget tracker that visualizes my spending with colorful charts.",
    "A to-do list that gamifies tasks and gives me XP for finishing them.",
    "A study planner that helps me track my homework and tests."
];

// Check the toy chest for any custom ideas the user added before
const savedIdeas = localStorage.getItem("vibeCraftCustomIdeas");
if (savedIdeas) {
    appIdeas = appIdeas.concat(JSON.parse(savedIdeas));
}

// When the user clicks "Surprise Me"
surpriseBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * appIdeas.length);
    ideaBox.value = appIdeas[randomIndex];
});

// When the user clicks "Add Idea"
addIdeaBtn.addEventListener("click", () => {
    const newIdea = customIdeaInput.value.trim();
    if (newIdea === "") return; // Ignore empty input

    // 1. Add it to the current grab bag
    appIdeas.push(newIdea);

    // 2. Save the custom ideas to the toy chest
    let customIdeas = JSON.parse(localStorage.getItem("vibeCraftCustomIdeas") || "[]");
    customIdeas.push(newIdea);
    localStorage.setItem("vibeCraftCustomIdeas", JSON.stringify(customIdeas));

    // 3. Clear the input box
    customIdeaInput.value = "";
    
    // 4. Give a little visual feedback
    addIdeaBtn.textContent = "✅ Added!";
    setTimeout(() => { addIdeaBtn.textContent = "➕ Add"; }, 1500);
});

// 9. Dark Mode Toggle (The Spaceship Button)
const darkToggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("vibeCraftTheme") === "dark") {
    document.body.classList.add("dark-mode");
    darkToggle.textContent = "☀️";
}

darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        darkToggle.textContent = "☀️";
        localStorage.setItem("vibeCraftTheme", "dark");
    } else {
        darkToggle.textContent = "🌙";
        localStorage.setItem("vibeCraftTheme", "light");
    }
});

// 10. Download Button Logic
const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", () => {
    // 1. Create a "Blob" (a virtual file) from the prompt text
    const blob = new Blob([finalPrompt.value], { type: "text/plain" });
    
    // 2. Create a temporary invisible link to the file
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "VibeCraft-Prompt.txt"; // The name of the downloaded file
    
    // 3. Click the link automatically, then clean up
    a.click();
    URL.revokeObjectURL(url);
});

// 11. Prompt History (The Photo Album)
const historyBtn = document.getElementById("historyBtn");
const historyCard = document.getElementById("historyCard");
const historyList = document.getElementById("historyList");

// Function to save a prompt to the history
function saveToHistory(promptText) {
    // 1. Get the existing history from the toy chest
    let history = JSON.parse(localStorage.getItem("vibeCraftHistory") || "[]");
    
    // 2. Add the new prompt to the front of the array
    history.unshift(promptText);
    
    // 3. Keep only the last 5 prompts (so we don't fill up the toy chest)
    history = history.slice(0, 5);
    
    // 4. Save it back
    localStorage.setItem("vibeCraftHistory", JSON.stringify(history));
}

// Function to display the history
function renderHistory() {
    let history = JSON.parse(localStorage.getItem("vibeCraftHistory") || "[]");
    historyList.innerHTML = ""; // Clear out old list items
    
    if (history.length === 0) {
        historyList.innerHTML = "<p style='color:#888; font-size:0.9rem;'>No prompts yet! Generate one to start your album.</p>";
        return;
    }
    
    history.forEach(promptText => {
        const div = document.createElement("div");
        div.className = "history-item";
        // Show a preview of the prompt (first 80 characters)
        div.textContent = promptText.substring(0, 80) + "...";
        // If they click it, load it back into the main output box
        div.addEventListener("click", () => {
            finalPrompt.value = promptText;
            outputCard.style.display = "block";
            window.scrollTo({ top: outputCard.offsetTop, behavior: 'smooth' });
        });
        historyList.appendChild(div);
    });
}

// Show/Hide the history card when the button is clicked
historyBtn.addEventListener("click", () => {
    if (historyCard.style.display === "none") {
        renderHistory();
        historyCard.style.display = "block";
        historyBtn.textContent = "📜 Hide History";
    } else {
        historyCard.style.display = "none";
        historyBtn.textContent = "📜 Show Prompt History";
    }
});

// 12. Welcome Modal Logic
const welcomeModal = document.getElementById("welcomeModal");
const closeModalBtn = document.getElementById("closeModalBtn");

// Check if the user has seen the welcome message before
if (localStorage.getItem("vibeCraftWelcomed") === "yes") {
    welcomeModal.style.display = "none"; // Hide it if they have
}

closeModalBtn.addEventListener("click", () => {
    welcomeModal.style.display = "none";
    localStorage.setItem("vibeCraftWelcomed", "yes"); // Remember for next time
});

// 13. Complexity Slider Label
const complexitySlider = document.getElementById("complexitySlider");
const complexityLabel = document.getElementById("complexityLabel");
complexitySlider.addEventListener("input", () => {
    const labels = { "1": "Simple", "2": "Medium", "3": "Large" };
    complexityLabel.textContent = labels[complexitySlider.value];
});


console.log("VibeCraft AI is awake! ⚡");

// 1. Grab all the elements we need from the HTML
const generateBtn = document.querySelector("button"); // The Test Me button
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
        if (card.value === "ide") {
            modelName.textContent = "Claude 3.7 Sonnet";
            modelReason.textContent = "Best for high-logic premium coding.";
            priceTier.textContent = "Premium Tier";
            priceTier.style.background = "#E67E22"; // Orange for premium
        } else if (card.value === "cli") {
            modelName.textContent = "DeepSeek-V3 / R1";
            modelReason.textContent = "Best for fast command-line scripts.";
            priceTier.textContent = "Free Tier";
            priceTier.style.background = "var(--accent)"; // Back to teal
        } else {
            modelName.textContent = "DeepSeek-V3 / R1";
            modelReason.textContent = "Best for free power and learning.";
            priceTier.textContent = "Free Tier";
            priceTier.style.background = "var(--accent)"; // Back to teal
        }
    });
});

// 4. The Core Prompt Generator (Updated with Error Handling)
generateBtn.addEventListener("click", () => {
    const idea = document.getElementById("ideaBox").value.trim(); // .trim() removes empty spaces
    const toast = document.getElementById("toastMessage");

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

    prompt += `MANDATORY SETUP BLUEPRINT:\n`;
    prompt += `1. Teach me how to set up VS Code and create the necessary folders.\n`;
    prompt += `2. Explain the basic terminal commands I need (like ls, cd, mkdir).\n`;
    prompt += `3. Walk me through initializing Git and GitHub.\n\n`;
    prompt += `Let's build this together, step by step. Do not hallucinate tools or steps.`;

    finalPrompt.value = prompt;
    outputCard.style.display = "block";
});

// 5. Copy the prompt to clipboard
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(finalPrompt.value).then(() => {
        copyBtn.textContent = "✅ Copied!";
        setTimeout(() => {
            copyBtn.textContent = "📋 Copy Prompt";
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


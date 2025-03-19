// Selecting DOM elements
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const getQuoteBtn = document.getElementById("getQuoteBtn");
const copyBtn = document.getElementById("copyBtn");
const shareOnThreadsBtn = document.getElementById("shareOnThreadsBtn");

// Fetch a quote when the page loads
document.addEventListener("DOMContentLoaded", () => fetchquote());

// Event listener to share the quote on Threads
shareOnThreadsBtn.addEventListener("click", () => shareOnThreads());

// Event listener to fetch a new quote when the button is clicked
getQuoteBtn.addEventListener("click", () => fetchquote());

// Event listener to copy the quote to the clipboard
copyBtn.addEventListener("click", () => copyQuote());


// Fetch a random quote from the API
async function fetchquote() {
  try {
    getQuoteBtn.textContent = ". . .";

    let response = await fetch(
      "https://api.freeapi.app/api/v1/public/quotes/quote/random"
    );
    let data = await response.json();
    let { content, author } = data.data;
    setQuoteAndAuthor(content, author);
    getQuoteBtn.textContent = "Get New Quote";
  } catch (error) {
    alert("Failed while fetching");
    getQuoteBtn.textContent = "Get New Quote";
  }
}

// Updates the quote and author in the UI
function setQuoteAndAuthor(quote, author) {
  quoteElement.textContent = quote;
  authorElement.textContent = author;
}

// Copies the current quote text to the clipboard
function copyQuote() {
  let quote = document.getElementById("quote").innerText;
  navigator.clipboard
    .writeText(quote)
    .then(() => alert("Copied"))
    .catch((err) => console.error("Failed to copy"));
}

//Opens a new tab to share the quote on Threads
function shareOnThreads() {
  let threadText = encodeURIComponent(
    `${quoteElement.innerText} ${authorElement.innerText}`
  );
  let threadsURL = `https://www.threads.net/intent/post?text=${threadText}`;
  window.open(threadsURL, "_blank");
}

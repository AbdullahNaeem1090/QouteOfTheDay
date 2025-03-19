const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const getQuoteBtn = document.getElementById("getQuoteBtn");
const copyBtn = document.getElementById("copyBtn");
const shareOnThreadsBtn = document.getElementById("shareOnThreadsBtn");

function setQuoteAndAuthor(quote, author) {
  quoteElement.textContent = quote;
  authorElement.textContent = author;
}

document.addEventListener("DOMContentLoaded", () => fetchquote());

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
    console.log("Failed while fetching");
    getQuoteBtn.textContent = "Get New Quote";
  }
}

function copyQuote() {
  let quote = document.getElementById("quote").innerText;
  navigator.clipboard
    .writeText(quote)
    .then(() => alert("Copied"))
    .catch((err) => console.error("Failed to copy"));
}

function shareOnThreads() {
  let threadText = encodeURIComponent(
    `${quoteElement.innerText} ${authorElement.innerText}`
  );
  let threadsURL = `https://www.threads.net/intent/post?text=${threadText}`;

  window.open(threadsURL, "_blank");
}
shareOnThreadsBtn.addEventListener("click", () => shareOnThreads());
getQuoteBtn.addEventListener("click", () => fetchquote());
copyBtn.addEventListener("click", () => copyQuote());

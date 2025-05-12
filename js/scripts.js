// Sample blog post data
const posts = [
  {
    id: 1,
    title: "Why Learning HTML and CSS is the Perfect Start to Web Development",
    excerpt:
      "HTML and CSS are the foundation of every website you visit. Without them, the web as we know it wouldn't exist. If you’re curious about becoming a web developer, these two technologies are the perfect place to begin.",
    fullContent: `HTML (HyperText Markup Language) provides the structure of a web page. It tells the browser what to display and how to organize content—like headings, paragraphs, lists, links, and images. Think of HTML as the skeleton of a page.

CSS (Cascading Style Sheets) adds styling. It controls the layout, colors, fonts, and overall design, bringing your HTML content to life. If HTML is the skeleton, CSS is the clothing and personality.

One of the best parts of learning HTML and CSS is how visual and rewarding it is. You can write a few lines of code, save, refresh your browser, and instantly see the changes. That feedback loop makes learning fun and motivating.

Why it matters:
These skills are in demand across industries.

They’re essential even if you want to move into JavaScript, React, or full-stack development later.

They empower you to build your own personal or professional site.

Tip: Start small. Try building a personal portfolio, a simple landing page, or even a digital resume. Use tools like CodePen, JSFiddle, or Visual Studio Code to get hands-on quickly.

“Every expert was once a beginner. Master HTML and CSS, and you'll open the door to endless web development possibilities.”`,
    image: "assets/html_css.jpg",
  },
  {
    id: 2,
    title: "Understanding JavaScript Events: Making Your Website Interactive",
    excerpt:
      "Imagine clicking a button and seeing a hidden message appear. Or typing into a form and getting suggestions as you go. These dynamic actions are made possible through JavaScript events.Imagine clicking a button and seeing a hidden message appear. Or typing into a form and getting suggestions as you go. These dynamic actions are made possible through JavaScript events.",
    fullContent: `
      Events in JavaScript refer to actions that happen in the browser—clicks, key presses, mouse movements, scrolling, form submissions, and more. With events, your website becomes interactive rather than static.

Common Event Types:
click – when a user clicks an element

input – when typing in a text box

mouseover – when hovering over an item

submit – when submitting a form

Here’s a simple example of a click event:

<b>document.getElementById("greetBtn").addEventListener("click", function() {
  alert("Hello! You clicked the button.");
});</b>
This code listens for a click on the element with the ID "greetBtn" and then displays a message.

Why use events?
They improve user experience

They allow your page to react in real time

They're the building blocks of any modern web app

If you're just starting out, focus on mastering a few event types and how to use addEventListener. Then try combining them with other logic—like form validation or animations.

Challenge idea: Build a simple to-do list where items are added or removed using buttons and JavaScript events.

“With events, you give your website life. Learn how to listen and respond, and your pages will become more than just pretty designs—they’ll become experiences."
      `,
    image: "assets/javascript_events.jpg",
  },
  {
    id: 3,
    title: `Start Where You Are: Motivation for Aspiring Creators`,
    excerpt: `Sometimes we wait for the "perfect moment"—more time, more skills, more confidence—to start something new. But here’s the truth: that perfect moment rarely comes. The real secret to progress? Start where you are.`,
    fullContent: `Every creative journey begins with a messy first step. The first line of code, the first draft, the first public post—it’s never flawless. But it’s powerful because it’s a beginning.

You don’t need to know everything. You don’t need fancy tools or a polished plan. What you need is the courage to begin with what you have, where you are.

Here’s what to remember:
Mistakes are part of learning. Each one teaches you something new.

Small consistent effort beats occasional perfection. Daily 1% improvements compound.

You inspire others. When you start openly, you give others permission to do the same.

Whether you're trying to learn to code, build a blog, start a YouTube channel, or launch a business idea—beginning is the hardest part. But once you do, momentum takes over.

“You don’t have to be great to start, but you have to start to be great.” – Zig Ziglar

So take one small step today. Build your first HTML page. Write your first paragraph. Upload your first photo. You’ll look back and be proud you did.`,
    image: "/assets/motivation.jpg",
  },
];

// Dynamic Post Loading
function loadPosts(containerId, limit = posts.length) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  posts.slice(0, limit).forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");
    postCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
        `;
    // Add click event to redirect to blog page
    postCard.addEventListener("click", () => {
      window.location.href = `blog.html?postId=${post.id}`;
    });
    postCard.style.cursor = "pointer"; // Indicate clickability
    container.appendChild(postCard);
  });
}

// Render Blog Posts with Expandable Content
function loadBlogPosts(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Get postId from URL query parameter (if any)
  const urlParams = new URLSearchParams(window.location.search);
  const selectedPostId = parseInt(urlParams.get("postId"));

  container.innerHTML = "";
  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");
    postCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <h3>${post.title}</h3>
            <p class="excerpt">${post.excerpt}</p>
            <div class="full-content">${post.fullContent}</div>
            <button class="toggle-content">${
              selectedPostId === post.id ? "Collapse" : "Read More"
            }</button>
        `;
    const fullContent = postCard.querySelector(".full-content");
    const toggleButton = postCard.querySelector(".toggle-content");

    // Auto-expand if postId matches
    if (selectedPostId === post.id) {
      fullContent.classList.add("expanded");
    } else {
      fullContent.classList.add("collapsed");
    }

    // Toggle full content on button click
    toggleButton.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent postCard click from triggering
      const isCollapsed = fullContent.classList.contains("collapsed");
      fullContent.classList.toggle("expanded", isCollapsed);
      fullContent.classList.toggle("collapsed", !isCollapsed);
      toggleButton.textContent = isCollapsed ? "Collapse" : "Read More";
    });

    container.appendChild(postCard);
  });
}

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Contact Form Validation
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
      formMessage.textContent = "Message sent successfully!";
      formMessage.style.color = "green";
      contactForm.reset();
    } else {
      formMessage.textContent = "Please fill out all fields.";
      formMessage.style.color = "red";
    }
  });
}

// Load posts on page load
document.addEventListener("DOMContentLoaded", () => {
  loadPosts("post-container", 2); // Load 2 posts on homepage
  loadBlogPosts("blog-post-container"); // Load all posts on blog page with expendable content
});

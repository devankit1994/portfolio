// script.js for Ankit Kumar's Portfolio
console.log("Portfolio script loaded.");

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      menuToggle.textContent = navMenu.classList.contains("active") ? "✕" : "☰";
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll("header nav ul li a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Typing effect for the home section
  const typedTextElement = document.querySelector(".typed-text");
  if (typedTextElement) {
    const phrases = [
      "Software Engineer",
      "Web Developer",
      "Lifelong Learner",
      "Creative Thinker",
      "Full Stack Developer",
    ];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentPhrase = phrases[currentPhraseIndex];

      if (isDeleting) {
        // Deleting text
        typedTextElement.textContent = currentPhrase.substring(
          0,
          currentCharIndex - 1
        );
        currentCharIndex--;
        typingSpeed = 50; // Faster when deleting
      } else {
        // Typing text
        typedTextElement.textContent = currentPhrase.substring(
          0,
          currentCharIndex + 1
        );
        currentCharIndex++;
        typingSpeed = 100; // Normal speed when typing
      }

      // If completed typing the current phrase
      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at the end of phrase
      }
      // If completed deleting the current phrase
      else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next phrase
      }

      setTimeout(typeEffect, typingSpeed);
    }

    // Start the typing effect
    setTimeout(typeEffect, 1000);
  }

  // Highlight active nav link on scroll (scrollspy)
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll("header nav ul li a");

  function onScroll() {
    let scrollPos = window.scrollY + 80; // Offset for fixed header
    let currentSectionId = "";
    sections.forEach((section) => {
      if (
        section.offsetTop <= scrollPos &&
        section.offsetTop + section.offsetHeight > scrollPos
      ) {
        currentSectionId = section.id;
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSectionId) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  onScroll(); // Initial call

  // Skills tabs functionality
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".skills-tab-content");

  // Initialize tabs - ensure first tab is active on page load
  function initializeTabs() {
    console.log("Initializing tabs");
    // Make sure at least one tab is active
    if (tabButtons.length > 0 && !document.querySelector(".tab-btn.active")) {
      tabButtons[0].classList.add("active");
    }

    if (
      tabContents.length > 0 &&
      !document.querySelector(".skills-tab-content.active")
    ) {
      tabContents[0].classList.add("active");
    }

    // Add click event listeners to all tab buttons
    tabButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        console.log("Tab clicked:", this.getAttribute("data-target"));

        // Remove active class from all buttons and contents
        tabButtons.forEach(function (btn) {
          btn.classList.remove("active");
        });

        tabContents.forEach(function (content) {
          content.classList.remove("active");
        });

        // Add active class to clicked button
        this.classList.add("active");

        // Show corresponding content
        const targetId = this.getAttribute("data-target");
        const targetContent = document.getElementById(targetId);

        if (targetContent) {
          targetContent.classList.add("active");
          // Tab content is now visible
        } else {
          console.error("Target content not found:", targetId);
        }
      });
    });

    // Initial tab is now active
  }

  // Call initialize function
  initializeTabs();

  // Skill level animation code removed

  // Show more/less functionality for project descriptions
  function initializeShowMoreLess() {
    const projectDescriptions = document.querySelectorAll(
      "#projects article p:not(:first-child):not(:last-child)"
    );

    projectDescriptions.forEach((paragraph) => {
      // Check if the content is long enough to need truncation
      // We'll consider paragraphs with more than 150 characters as long
      if (paragraph.textContent.length > 150) {
        // Wrap the content in a div for truncation
        const wrapper = document.createElement("div");
        wrapper.className = "truncated-content";

        // Clone the paragraph to preserve its content
        const clone = paragraph.cloneNode(true);

        // Replace the original paragraph with our wrapper
        paragraph.parentNode.replaceChild(wrapper, paragraph);
        wrapper.appendChild(clone);

        // Create the show more/less button
        const button = document.createElement("button");
        button.className = "show-more-btn";
        button.textContent = "Show More";

        // Insert the button after the wrapper
        wrapper.parentNode.insertBefore(button, wrapper.nextSibling);

        // Add click event to toggle
        button.addEventListener("click", function () {
          wrapper.classList.toggle("expanded");
          this.textContent = wrapper.classList.contains("expanded")
            ? "Show Less"
            : "Show More";
        });
      }
    });
  }

  // Initialize show more/less functionality
  initializeShowMoreLess();

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate position with header offset
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

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

  // Update the initializeTabs function to be more concise
  function initializeTabs() {
    // Make first tab active by default
    if (tabButtons.length > 0) {
      tabButtons[0].classList.add("active");
      tabContents[0].classList.add("active");
    }

    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        // Show corresponding content
        const targetContent = document.getElementById(
          this.getAttribute("data-target")
        );
        if (targetContent) {
          targetContent.classList.add("active");
        }
      });
    });
  }

  // Call initialize function
  initializeTabs();

  // Show more/less functionality for project descriptions
  function initializeShowMoreLess() {
    const projectDescriptions = document.querySelectorAll("#projects article");

    projectDescriptions.forEach((article) => {
      // Get all content to be truncated (description + contributions)
      const contentToTruncate = article.querySelector("p:first-of-type");
      const keyContributions = article.querySelector(".contributions");

      if (contentToTruncate && contentToTruncate.textContent.length > 150) {
        // Create wrapper div
        const wrapper = document.createElement("div");
        wrapper.className = "truncated-content";

        // Move both description and contributions inside wrapper
        const descClone = contentToTruncate.cloneNode(true);
        wrapper.appendChild(descClone);

        // If key contributions exist, move them inside wrapper
        if (keyContributions) {
          const contribClone = keyContributions.cloneNode(true);
          wrapper.appendChild(contribClone);
          keyContributions.remove(); // Remove original contributions
        }

        // Replace original content with wrapper
        contentToTruncate.parentNode.replaceChild(wrapper, contentToTruncate);

        // Create and add show more/less button
        const button = document.createElement("button");
        button.className = "show-more-btn";
        button.textContent = "Show More";
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

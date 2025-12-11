// =============================
// DARK MODE TOGGLE
// =============================
const toggleBtn = document.getElementById("modeToggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });
}

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}


// =============================
// DONUT CHART (Project Completion)
// =============================
function initDonutChart(percent) {
  const circle = document.querySelector(".donut-ring-progress");
  if (!circle) return;

  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;

  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  const label = document.querySelector(".donut-label");
  if (label) label.textContent = percent + "%";
}

initDonutChart(58); // Default progress value


// =============================
// LINE CHART (Timeline / Roadmap Progress)
// =============================
function initLineChart() {
  const svg = document.getElementById("lineChart");
  if (!svg) return;

  // Example dataset: Roadmap progress over days
  const data = [10, 20, 32, 40, 49, 58]; 

  // SVG drawing
  const width = 700;
  const height = 180;
  const max = Math.max(...data);

  let points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (v / max) * height;
      return `${x},${y}`;
    })
    .join(" ");

  // Plot line
  document.getElementById("chartLine").setAttribute("points", points);
}

initLineChart();
document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progressBar");
  let progress = 0;

  const interval = setInterval(() => {
    if (progress >= 70) {  // esempio: 70% completato
      clearInterval(interval);
    } else {
      progress += 1;
      progressBar.style.width = progress + "%";
    }
  }, 60);
});



// =============================
// SMOOTH SCROLLING (optional)
// =============================
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

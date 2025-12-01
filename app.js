import { rounds } from "./data.js";

const timelineEl = document.getElementById("timeline");
const detailTitleEl = document.getElementById("detail-title");
const detailSubtitleEl = document.getElementById("detail-subtitle");
const metricFavEl = document.getElementById("metric-fav");
const metricPriceEl = document.getElementById("metric-price");
const detailTagsEl = document.getElementById("detail-tags");
const chatScrollEl = document.getElementById("chat-scroll");

let activeRoundId = rounds[0]?.id ?? null;

function spawnSparkle(x, y) {
  const s = document.createElement("div");
  s.className = "sparkle";
  s.style.left = `${x}px`;
  s.style.top = `${y}px`;
  document.body.appendChild(s);
  s.addEventListener("animationend", () => s.remove());
}

function renderTimeline() {
  timelineEl.innerHTML = "";

  rounds.forEach((round, index) => {
    const card = document.createElement("div");
    card.className = "round-card";
    if (round.id === activeRoundId) {
      card.classList.add("active");
    }

    const header = document.createElement("div");
    header.className = "round-header-line";

    const idx = document.createElement("div");
    idx.className = "round-index";
    idx.textContent = `Round ${index + 1}`;

    const label = document.createElement("div");
    label.className = "round-label";
    label.textContent = round.label;

    header.appendChild(idx);
    header.appendChild(label);

    const snippet = document.createElement("div");
    snippet.className = "round-snippet";
    snippet.textContent = round.subtitle;

    const metrics = document.createElement("div");
    metrics.className = "round-metric-row";

    const priceChip = document.createElement("div");
    priceChip.className = "round-chip round-chip--price";
    priceChip.textContent = round.priceAfter;

    const favChip = document.createElement("div");
    favChip.className = "round-chip round-chip--fav";
    favChip.textContent = `${round.favAfter} pts`;

    metrics.appendChild(priceChip);
    metrics.appendChild(favChip);

    card.appendChild(header);
    card.appendChild(snippet);
    card.appendChild(metrics);

    card.addEventListener("click", (e) => {
      activeRoundId = round.id;
      renderTimeline();
      renderDetail(round);
      spawnSparkle(e.clientX, e.clientY);
    });

    timelineEl.appendChild(card);
  });
}

function renderDetail(round) {
  if (!round) return;

  // Title
  detailTitleEl.textContent = "";
  const titleText = document.createTextNode(round.label);
  const span = document.createElement("span");
  span.textContent = "Kimi Discount Saga";
  detailTitleEl.appendChild(titleText);
  detailTitleEl.appendChild(span);

  // Subtitle
  detailSubtitleEl.textContent = round.subtitle;

  // Metrics
  metricFavEl.textContent = `${round.favAfter} pts`;
  metricPriceEl.textContent = round.priceAfter;

  // Tags
  detailTagsEl.innerHTML = "";
  round.tags.forEach((tag, index) => {
    const chip = document.createElement("div");
    chip.className = "tag-chip";
    if (index === 0) chip.classList.add("tag-chip--hot");
    chip.textContent = tag;
    detailTagsEl.appendChild(chip);
  });

  // Chat
  chatScrollEl.innerHTML = "";

  const userBubble = document.createElement("div");
  userBubble.className = "chat-bubble chat-bubble-user";
  const userLabel = document.createElement("div");
  userLabel.className = "chat-label";
  userLabel.innerHTML = `<span>🧑‍💻</span> User`;
  const userText = document.createElement("div");
  userText.textContent = round.user;
  userBubble.appendChild(userLabel);
  userBubble.appendChild(userText);

  const kimiBubble = document.createElement("div");
  kimiBubble.className = "chat-bubble chat-bubble-kimi";
  const kimiLabel = document.createElement("div");
  kimiLabel.className = "chat-label";
  kimiLabel.innerHTML = `<span>💿</span> Kimi`;
  const kimiText = document.createElement("div");
  kimiText.textContent = round.kimi;
  kimiBubble.appendChild(kimiLabel);
  kimiBubble.appendChild(kimiText);

  chatScrollEl.appendChild(userBubble);
  chatScrollEl.appendChild(kimiBubble);

  chatScrollEl.scrollTop = 0;
}

// Init
renderTimeline();
renderDetail(rounds[0]);

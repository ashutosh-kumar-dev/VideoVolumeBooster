const enableToggle = document.getElementById("enableToggle");
const status = document.getElementById("status");
const volumeInput = document.getElementById("volumeInput");

document.getElementById("boostBtn").addEventListener("click", () => setVolume("boost"));
document.getElementById("normalBtn").addEventListener("click", () => setVolume("normal"));
document.getElementById("decreaseBtn").addEventListener("click", () => setVolume("decrease"));

enableToggle.addEventListener("change", async () => {
  const enabled = enableToggle.checked;
  await chrome.storage.local.set({ extensionEnabled: enabled });
  status.innerText = enabled ? "Extension enabled." : "Extension disabled.";
});

// Load stored toggle state on popup open
(async () => {
  const { extensionEnabled } = await chrome.storage.local.get("extensionEnabled");
  enableToggle.checked = extensionEnabled !== false;
})();


async function setVolume(action) {
  const { extensionEnabled } = await chrome.storage.local.get("extensionEnabled");
  if (extensionEnabled === false) {
    status.innerText = "Extension is disabled.";
    return;
  }

  let boost = 1;
  const inputVal = volumeInput.value;

  if (action === "boost") {
    boost = parseFloat(inputVal);
    if (isNaN(boost) || boost < 0.1) {
      status.innerText = "Please enter a valid number (≥ 0.1)";
      return;
    }
  } else if (action === "decrease") {
    boost = parseFloat(inputVal);
    if (isNaN(boost) || boost >= 1 || boost <= 0) {
      status.innerText = "Enter a value between 0.1 and 1 for decrease";
      return;
    }
  }

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [boost],
      func: (boostLevel) => {
        const video = document.querySelector("video");
        if (!video) {
          console.warn("No video element found!");
          return;
        }

        if (!window._volumeBooster) {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const source = audioCtx.createMediaElementSource(video);
          const gainNode = audioCtx.createGain();
          source.connect(gainNode);
          gainNode.connect(audioCtx.destination);

          window._volumeBooster = { audioCtx, source, gainNode };
        }

        window._volumeBooster.gainNode.gain.value = boostLevel;
        console.log(`Volume set to ${boostLevel}x`);
      }
    });

    if (action === "boost") {
      status.innerText = `Volume boosted to ${boost}x!`;
    } else if (action === "normal") {
      status.innerText = "Volume set to normal (1x).";
    } else {
      status.innerText = `Volume decreased to ${boost}x.`;
    }

  } catch (err) {
    console.error("Volume boost failed:", err);
    status.innerText = "Failed to apply volume change.";
  }
}

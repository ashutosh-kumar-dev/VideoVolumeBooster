# 🎧 Video+ Volume Booster Chrome Extension

A modern, beautiful Chrome extension to **boost, normalize, or decrease** the volume of any video on the web.  
Designed with a sleek dark UI, toggle switch, and live volume indicator!

---

## ✨ Features

- **Boost** video volume above normal (e.g. 2x, 3x)
- **Normalize** back to 1x with one click
- **Decrease** volume for loud videos (e.g. 0.5x)
- **Modern dark theme** with a stylish card UI
- **Animated toggle switch** to enable/disable extension
- **Live volume indicator** in popup and extension icon
- **Works on all sites** with HTML5 video

---

## 🚀 Getting Started

1. **Clone or Download** this repository.
2. Open [chrome://extensions](chrome://extensions) in your browser.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select this project folder.
5. Pin the extension for quick access!

---

## 🖥️ Usage

1. Click the extension icon while on a video page.
2. Enter your desired volume multiplier (e.g. `2` for double, `0.5` for half).
3. Click **Boost**, **Normal**, or **Decrease**.
4. Use the toggle switch to enable/disable the extension.
5. The current volume is shown in the popup and on the extension icon.

---


---

## 🛠️ Tech Stack

- **Manifest V3** Chrome Extension
- HTML, CSS (dark theme), JavaScript
- Uses `chrome.scripting` and `chrome.storage` APIs

---

## 📂 Project Structure

```
chrome-extension/
│
├── popup.html        # Extension popup UI
├── popup.js          # Popup logic
├── background.js     # Handles icon updates
├── manifest.json     # Chrome extension manifest
├── icon.png          # Extension icon
└── README.md
```
---



---

## 💡 Tips

- Works best on sites using standard HTML5 `<video>` elements.
- If you don't see a change, refresh the video page and try again.

---

**Enjoy louder, clearer, or quieter videos everywhere!**

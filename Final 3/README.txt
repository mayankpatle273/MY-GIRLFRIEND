================================================================================
PREMIUM ANIMATED BIRTHDAY SURPRISE WEBSITE - COMPLETE OWNER'S GUIDE
Target Date: 15 October 2026 (12:00 AM Indian Standard Time / IST)
================================================================================

Welcome to your custom-crafted, romantic birthday surprise website!
This website has been built with the design elegance, smooth motion, and visual
depth of an award-winning creative developer portfolio.

All your major settings, images, videos, countdown targets, and memory messages
are centralized in ONE single configuration file:
   >>>  js/config.js  <<<

You do NOT need advanced coding knowledge to personalize this website.
Below is the complete, beginner-friendly guide covering everything you need.

================================================================================
TABLE OF CONTENTS
================================================================================
 1. Which File Controls the Loading Animation
 2. Which File Controls the 99% Loading Pause
 3. Which File Controls the Rotating Background Columns
 4. Where to Replace the 50+ Demo Images
 5. Where to Change the Birthday Date and Time (IST)
 6. Where to Edit the Countdown Text and Colors
 7. How to Enable or Disable Demo Mode
 8. Where to Replace the Demo Video with Your Own Video
 9. Where to Change the Typing Message
10. How to Add New Photos to the Rotating 3D Gallery
11. How to Edit the Title and Personal Message of Each Photo
12. Which CSS File Controls Each Major Visual Section
13. How to Run the Project Locally on Your Computer
14. How to Publish Online for Free (GitHub Pages, Vercel, Netlify)
15. How to Open and Test the Website on Your Mobile Phone

================================================================================
1. WHICH FILE CONTROLS THE LOADING ANIMATION
================================================================================
- Logic & Timing: js/loading.js
- Visual Styling: css/loading.css
- Configurable Settings: js/config.js (under the `loading` section)

How it works:
When anyone opens the website, it shows a sleek obsidian-black screen with a
glowing progress bar that smoothly counts from 0% to 100%.
It only runs on initial page entry, never on scrolling.

================================================================================
2. WHICH FILE CONTROLS THE 99% LOADING PAUSE
================================================================================
- File: js/config.js (under `CONFIG.loading`)
- Logic implementation: js/loading.js (in the `triggerSuspensePause` function)

In `js/config.js`, you can adjust the pause duration in milliseconds:
   loading: {
     pausePercentage: 99,
     pauseDurationMs: 2400, // 2400 ms = 2.4 seconds (choose 1000 - 4000)
     ...
   }

When the counter reaches 99%, it holds for 2.4 seconds to create dramatic
suspense with a pulsing message ("Unlocking your surprise... ✨"), before
smoothly hitting 100% and revealing the main website.

================================================================================
3. WHICH FILE CONTROLS THE ROTATING BACKGROUND COLUMNS
================================================================================
- Movement & Column Logic: js/background.js
- Column Layout & CSS Animations: css/background.css
- Speeds and Directions Config: js/config.js (under `backgroundWall`)

How it works:
The screen has 6 vertical columns (on desktop) that scroll continuously in an
infinite vertical loop. Alternate columns travel in opposite directions (up and
down) with different speeds (52s, 68s, 44s, etc.) so it looks cinematic and
alive. It uses seamless 1:1 duplicated image sequences so there is never a jump
or gap.

================================================================================
4. WHERE TO REPLACE THE 50+ DEMO IMAGES
================================================================================
- File: js/config.js
- Section: `CONFIG.backgroundWall.photos`

You will see an array containing over 50 curated image URLs:
   photos: [
     "https://images.unsplash.com/photo-...",
     "https://images.unsplash.com/photo-...",
     ...
   ]

To replace them with your own photos:
Option A (Local Photos):
  1. Save your photos into the folder: assets/images/ (e.g. photo1.jpg, photo2.jpg)
  2. Change the entries in `js/config.js` to:
     "assets/images/photo1.jpg",
     "assets/images/photo2.jpg",
     ...
Option B (Cloud/Web Photos):
  Simply paste direct web URLs from Google Drive (direct link), Imgur, or
  Unsplash into the array.

Each column automatically selects from this list, alternating portrait,
landscape, and square crops.

================================================================================
5. WHERE TO CHANGE THE BIRTHDAY DATE AND TIME
================================================================================
- File: js/config.js
- Setting: `CONFIG.countdown.targetDate`

The target date is set to Indian Standard Time (IST, UTC +05:30):
   targetDate: "2026-10-15T00:00:00+05:30"

- Year: 2026
- Month: 10 (October)
- Day: 15
- Time: 00:00:00 (12:00 AM Midnight)
- Timezone: +05:30 (Indian Standard Time)

If you ever wish to change it to another date or hour, edit this string using
standard ISO format: "YYYY-MM-DDTHH:MM:SS+05:30".

================================================================================
6. WHERE TO EDIT THE COUNTDOWN TEXT AND COLOURS
================================================================================
To edit the headings and text:
- File: js/config.js (under `CONFIG.countdown`)
  - `eyebrow`: "A Moment Worth Waiting For"
  - `heading`: "Something Special Is Waiting..."
  - `subtitle`: Romantic description
  - `revealButtonText`: "Open Your Surprise ❤️"

To edit the colors and glow:
- File: css/countdown.css and css/style.css
  In `css/style.css`, modify the CSS variables at the top:
  - `--accent-gold`: #f4d068 (Champagne Gold)
  - `--accent-rose`: #ff6584 (Romantic Rose Blush)
  - `--bg-primary`: #060609 (Obsidian Black)

================================================================================
7. HOW TO ENABLE OR DISABLE DEMO MODE & THE SURPRISE DEMO TIMER
================================================================================
- File: js/config.js
- Settings: `CONFIG.countdown.surpriseDemo` and `CONFIG.countdown.enableDemoButton`

The "Surprise Demo" is stationed strictly at the bottom-right corner of the
screen. When anyone opens the website, it immediately shows a live countdown
timer (default: 8 seconds, configurable in `durationSeconds`).
Once this demo countdown finishes, a new button directly underneath it
appears with the text "Welcome", leading straight into the surprise experience!

In `js/config.js`:
   surpriseDemo: {
     enabled: true,         // Set to false to completely hide the demo widget
     durationSeconds: 8,    // How many seconds the demo counts down upon opening
     welcomeButtonText: "Welcome",
     welcomeUrl: "surprise.html"
   }

Note: The real countdown to 15 October 2026 is NEVER modified or bypassed.
When the real countdown reaches zero on 15 October 2026 at 12:00 AM IST,
the main "Open Your Surprise ❤️" button appears automatically in the center.

================================================================================
8. WHERE TO REPLACE THE DEMO VIDEO WITH YOUR OWN VIDEO
================================================================================
- File: js/config.js
- Section: `CONFIG.video`

In `js/config.js`:
   video: {
     videoUrl: "assets/videos/my-birthday-video.mp4",
     posterUrl: "assets/images/video-cover.jpg",
     captionTag: "A CINEMATIC PRELUDE",
     captionTitle: "For The One Who Shines Brightest",
     mutedAutoplay: true,
     autoTransitionOnEnd: true
   }

Steps:
1. Drop your video file into: `assets/videos/`
2. Name it (for instance `birthday.mp4`)
3. Update `videoUrl` in `js/config.js` to: `"assets/videos/birthday.mp4"`
4. (Optional) Set `posterUrl` to a picture of the two of you as the cover preview.

The video plays full-screen with cinematic anamorphic letterboxing. It features
sound unmute/mute, replay, skip, and automatically scrolls to the story section
when the video finishes!

================================================================================
9. WHERE TO CHANGE THE TYPING MESSAGE
================================================================================
- File: js/config.js
- Section: `CONFIG.typingMessage`

In `js/config.js`:
   typingMessage: {
     heading: "To My Favorite Human Being",
     dateStamp: "15 October 2026",
     text: "Your heartfelt message goes right here. Write as much as you like! It will type out letter by letter with a realistic rhythm. ❤️",
     typingSpeedMs: 40,        // Speed in milliseconds per character
     punctuationPauseMs: 260   // Emotional pause after commas and periods
   }

================================================================================
10. HOW TO ADD NEW PHOTOS TO THE ROTATING 3D GALLERY
================================================================================
- File: js/config.js
- Section: `CONFIG.gallery.items`

You can add as many memories as you want! Simply add another object inside
the `items` array:

   {
     id: 13,
     title: "Our Picnic in the Park",
     date: "June 14",
     location: "Botanical Hills",
     image: "assets/images/picnic.jpg", // or web URL
     memory: "We spent the whole afternoon laughing, eating strawberries, and watching clouds take funny shapes."
   },

The 3D cylindrical ring automatically calculates the angle and spacing so your
photos never overlap!

================================================================================
11. HOW TO EDIT THE TITLE AND PERSONAL MESSAGE OF EACH PHOTO
================================================================================
In `js/config.js` under `CONFIG.gallery.items`:
Each of the 12 entries contains:
- `title`: Shown on the card and in the modal popup
- `date`: Date of the special memory
- `location`: Location tag with pin icon
- `image`: Photo URL
- `memory`: The personal paragraph detailing that exact memory

When a visitor clicks or taps any photo in the 3D rotating carousel, a gorgeous
glassmorphic modal pops up showing the photo enlarged, alongside the unique
story for that photo. The modal includes Previous and Next buttons to browse
through all your memories.

================================================================================
12. WHICH CSS FILE CONTROLS EACH MAJOR VISUAL SECTION
================================================================================
- `css/style.css`        -> Colors, luxury typography, glass cards, audio pill
- `css/loading.css`      -> Black loading screen, percentage, glowing bar
- `css/background.css`   -> 6 vertical rotating photo columns & dark vignette
- `css/countdown.css`    -> Countdown cards, glowing digits, reveal buttons
- `css/video.css`        -> Fullscreen video player, letterbox bars, sound pill
- `css/scroll-effects.css`-> Storytelling photo rise, lateral shift, typing card
- `css/gallery.css`      -> 3D rotating carousel, lighting, interactive popup
- `css/responsive.css`   -> Adjustments for iPhone, Android, tablets & laptops

================================================================================
13. HOW TO RUN THE PROJECT LOCALLY ON YOUR COMPUTER
================================================================================
Option 1 - Double Click (Easiest):
  Simply double-click `index.html` in your file explorer. It will open in
  Google Chrome, Edge, Brave, or Safari immediately.

Option 2 - VS Code "Live Server" (Recommended for testing):
  1. Open the project folder in VS Code.
  2. Install the "Live Server" extension (by Ritwick Dey).
  3. Right-click `index.html` and select "Open with Live Server".

Option 3 - Python Local Server:
  Open PowerShell / Command Prompt in this folder and run:
     python -m http.server 8000
  Then open: http://localhost:8000 in your browser.

Option 4 - Node.js `npx serve`:
  Run:
     npx serve .
  in PowerShell, and open the URL shown in your terminal.

================================================================================
14. HOW TO PUBLISH ONLINE FOR FREE
================================================================================

METHOD A: GitHub Pages (Free, 100% Reliable)
--------------------------------------------
1. Create a free account on GitHub (https://github.com).
2. Create a new repository named `birthday-surprise`.
3. Upload all the files and folders from this folder (`index.html`, `surprise.html`,
   `css/`, `js/`, `assets/`, etc.).
4. Go to repository Settings -> "Pages" (in the left sidebar).
5. Under "Branch", select `main` (or `master`) and folder `/ (root)`, then click "Save".
6. In ~1 minute, GitHub will give you a live website link:
   https://yourusername.github.io/birthday-surprise/

METHOD B: Vercel or Netlify (Drag & Drop, Free)
----------------------------------------------
1. Visit https://app.netlify.com/drop or https://vercel.com
2. Drag and drop this whole folder (`Final 1`) directly onto the website.
3. In 10 seconds, it will give you a live HTTPS link that you can share!

================================================================================
15. HOW TO OPEN AND TEST THE WEBSITE ON YOUR MOBILE PHONE
================================================================================
Once published on GitHub Pages or Netlify/Vercel:
- Simply open the link on your iPhone (Safari/Chrome) or Android (Chrome).
- The website is 100% mobile responsive:
  * 3 photo columns on mobile so the screen isn't crowded.
  * Countdown digits fit nicely in a clean 2x2 grid.
  * Autoplay starts muted (complies with iOS and Android rules).
  * Visitors can tap the sound toggle at any time to turn on audio.
  * You can swipe your finger left or right on the 3D gallery to spin it!
  * Tapping any photo brings up the full memory card.

If testing locally over the same Wi-Fi network:
- Run `python -m http.server 8000` on your PC.
- Check your computer's local IP address (e.g. `192.168.1.15`).
- On your phone's browser, open: `http://192.168.1.15:8000`

================================================================================
16. THE TWO NEW ROMANTIC SURPRISE PAGES (VIDEOS & 100-LINE LOVE LETTER)
================================================================================

Between the scroll-activated typewriter message and the "Little Moments, Endless Love"
carousel, two animated surprise buttons have been added:
  1. "Our Video Memories 🎬" -> Opens videos.html
  2. "A Letter From My Heart 💌" -> Opens letter.html

WHERE TO PLACE YOUR ASSETS:
--------------------------------------------
1. Five Video Memories:
   - Place your 5 video files in: `videos/`
   - Name them:
     * `videos/video1.mp4`
     * `videos/video2.mp4`
     * `videos/video3.mp4`
     * `videos/video4.mp4`
     * `videos/video5.mp4`
   - You can edit the headings and romantic captions directly inside `videos.html`.

2. Saloni's Photograph:
   - Place her photograph in: `images/`
   - Name it: `images/saloni.jpg`
   - It will appear in a glowing romantic frame at the top of `letter.html`.

3. The 100-Line Love Letter:
   - File: `letter.html`
   - Contains exactly 100 numbered lines, numbered from 001 to 100, written from
     Mayank to Saloni with heartfelt promises, shared memories, and birthday wishes.
   - You can personalize any line directly in `letter.html`!
   - Signed: "Yours, Mayank 💗"

================================================================================
WISHING YOU AND SALONI A MAGICAL CELEBRATION ON 15 OCTOBER 2026! ❤️
================================================================================

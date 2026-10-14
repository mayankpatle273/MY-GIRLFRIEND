/**
 * ==============================================================================
 * PROJECT CONFIGURATION - PREMIUM BIRTHDAY SURPRISE WEBSITE
 * ==============================================================================
 * All major settings, media sources, countdown dates, typing texts, and
 * memory gallery entries are centralized here.
 * 
 * Edit this file to customize the website with your own photos, videos,
 * messages, and dates without touching any core code!
 * ==============================================================================
 */

const CONFIG = {
  // --------------------------------------------------------------------------
  // 1. COUNTDOWN TARGET & SETTINGS
  // --------------------------------------------------------------------------
  countdown: {
    // Target Date: 15 October 2026 at 12:00 AM Indian Standard Time (IST) (+05:30)
    targetDate: "2026-10-15T00:00:00+05:30",
    
    // Foreground Headings
    eyebrow: "A Moment Worth Waiting For",
    heading: "Something Special Is Waiting...",
    subtitle: "With every passing second, a little more of my love is waiting to unfold. A special surprise, made with all my heart, is waiting just for you. ❤️✨",
    
    // Birthday Reveal Button (Appears automatically when countdown reaches 0)
    revealButtonText: "Open Your Surprise ❤️",
    revealButtonUrl: "surprise.html",
    
    // Developer Demo Mode:
    // Set to true to show the bottom-right Surprise Demo widget
    enableDemoButton: true,
    demoButtonText: "Preview Surprise (Demo) ✨",
    demoButtonUrl: "surprise.html",
    demoBadgeNote: "Demo Preview Active — Real Countdown Intact",

    // Surprise Demo Bottom-Right Corner Widget Settings:
    surpriseDemo: {
      enabled: true,
      durationSeconds: 8, // Demo countdown duration in seconds (starts immediately upon opening)
      welcomeButtonText: "Welcome",
      welcomeUrl: "surprise.html"
    }
  },

  // --------------------------------------------------------------------------
  // 2. LOADING SCREEN CONFIGURATION
  // --------------------------------------------------------------------------
  loading: {
    // Pause percentage right before completion
    pausePercentage: 99,
    
    // Pause duration at 99% in milliseconds (e.g. 2400 = 2.4 seconds, between 1-4s)
    pauseDurationMs: 2400,
    
    // Minimum overall load time in ms before reaching 99%
    initialProgressDurationMs: 2600,
    
    // Dynamic romantic loading subtitle prompts
    messages: [
      "Gathering stardust & memories...",
      "Lighting up our favorite moments...",
      "Weaving our story in gold...",
      "Preparing your magical surprise...",
      "Almost there, hold your breath..."
    ]
  },

  // --------------------------------------------------------------------------
  // 3. BACKGROUND WALL (50+ PHOTOGRAPHS)
  // --------------------------------------------------------------------------
  // 5-6 columns of vertical infinite rotating photos.
  // Diverse color palettes: warm sunsets, cool city lights, pastel skies, vibrant joy.
  // Replace these URLs with your own image URLs or local files in assets/images/
  backgroundWall: {
    columnCountDesktop: 6,
    columnCountTablet: 4,
    columnCountMobile: 3,
    
    // Animation durations per column in seconds (controls varying speeds)
    columnSpeeds: [52, 68, 44, 60, 48, 64],
    
    // Movement directions per column: 'up' or 'down'
    columnDirections: ['up', 'down', 'up', 'down', 'up', 'down'],
    
    // 50+ Curated Demo Photos (High-resolution, aesthetic, optimized for fast delivery)
    photos: [
      // Column 1 - Warm & Golden Palette
      "assets/images/Image (1).jpg",
      "assets/images/Image (2).jpg",
      "assets/images/Image (3).jpg",
      "assets/images/Image (4).jpg",
      "assets/images/Image (5).jpg",
      "assets/images/Image (6).jpg",
      "assets/images/Image (7).jpg",
      "assets/images/Image (8).jpg",
      "assets/images/Image (9).jpg",

      // Column 2 - Cool & Midnight Blue Palette
      "assets/images/Image (10).jpg",
      "assets/images/Image (11).jpg",
      "assets/images/Image (12).jpg",
      "assets/images/Image (13).jpg",
      "assets/images/Image (14).jpg",
      "assets/images/Image (15).jpg",
      "assets/images/Image (16).jpg",
      "assets/images/Image (17).jpg",
      "assets/images/Image (18).jpg",

      // Column 3 - Pastel & Romantic Flora
      "assets/images/Image (19).jpg",
      "assets/images/Image (20).jpg",
      "assets/images/Image (21).jpg",
      "assets/images/Image (22).jpg",
      "assets/images/Image (23).jpg",
      "assets/images/Image (24).jpg",
      "assets/images/Image (25).jpg",
      "assets/images/Image (26).jpg",
      "assets/images/Image (27).jpg",

      // Column 4 - Vibrant Moments & Laughter
     "assets/images/Image (28).jpg",
      "assets/images/Image (29).jpg",
      "assets/images/Image (30).jpg",
      "assets/images/Image (31).jpg",
      "assets/images/Image (32).jpg",
      "assets/images/Image (33).jpg",
      "assets/images/Image (34).jpg",
      "assets/images/Image (35).jpg",
      "assets/images/Image (36).jpg",

      // Column 5 - Starry Nights & City Lights
      "assets/images/Image (37).jpg",
      "assets/images/Image (38).jpg",
      "assets/images/Image (39).jpg",
      "assets/images/Image (40).jpg",
      "assets/images/Image (41).jpg",
      "assets/images/Image (42).jpg",
      "assets/images/Image (43).jpg",
      "assets/images/Image (44).jpg",
      "assets/images/Image (45).jpg",
      "assets/images/Image (46).jpg",

      // Column 6 - Tender Portraits & Sweet Memories
      "assets/images/Image (47).jpg",
      "assets/images/Image (48).jpg",
      "assets/images/Image (49).jpg",
      "assets/images/Image (50).jpg",
      "assets/images/Image (51).jpgs/images/Image (55).jpg",
      "assets/images/Image (56).jpg",
    ]
  },

  // --------------------------------------------------------------------------
  // 4. FULL-SCREEN VIDEO INTRODUCTION (surprise.html)
  // --------------------------------------------------------------------------
  video: {
    // High-definition cinematic demo video (Royalty-free sparkler & starlight celebration)
    // Replace with your personal MP4 in assets/videos/birthday.mp4 or any CDN URL!
    videoUrl: "assets/videos/Birthday video.mp4",
    
    // Poster image shown while video loads or if video is paused
    posterUrl: "assets/videos/Birthday video.mp4",
    
    // Overlay captions
    captionTag: "A CINEMATIC PRELUDE",
    captionTitle: "For The One Who Shines Brightest",
    
    // Autoplay configuration
    mutedAutoplay: true,
    
    // Auto transition to scroll section when video finishes
    autoTransitionOnEnd: true
  },

  // --------------------------------------------------------------------------
  // 5. SCROLL-BASED PHOTO REVEAL STORY
  // --------------------------------------------------------------------------
  scrollStory: {
    scrollPromptText: "Keep scrolling to unlock our chapter...",
    
    // Central Hero Photograph
    heroPhoto: {
      url: "assets/images/Image (65).jpg",
      caption: "The Day My World Sparkled ❤️",
      date: "Forever & Always"
    },
    
    // Accent floating photos revealed as you scroll
    accentPhotos: [
      {
        url: "assets/images/Image (3).jpg",
        title: "Golden Hour Glow",
        subtitle: "Laughter in the breeze"
      },
      {
        url: "assets/images/Image (2).jpg",
        title: "Starry Midnight",
        subtitle: "Just you and me"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 6. ANIMATED TYPING MESSAGE
  // --------------------------------------------------------------------------
  typingMessage: {
    heading: "- 💗 My Most Precious Person",
    dateStamp: "15 October 2026",
    
    // The exact heartfelt birthday message:
    text: "Bolne ke liye bohot kuch hai mere pass 🥹❤️ per in aakho 👀 ko dekh kar sub bhul jaata hu 🫠💗 \n I love you Betu 🫶🏻😘❤️‍🩹",
    
    // Typing speed per character (in milliseconds)
    typingSpeedMs: 40,
    
    // Pause after punctuation characters (period, comma, exclamation) in ms
    punctuationPauseMs: 250,
    
    // Initial delay before typing starts when scrolled into view
    startDelayMs: 400
  },

  // --------------------------------------------------------------------------
  // 7. CONTINUOUSLY ROTATING 3D PHOTO GALLERY (10+ MEMORIES)
  // --------------------------------------------------------------------------
  gallery: {
    // Rotation duration for one full 360-degree cycle in seconds
    rotationDurationSec: 40,
    
    // 3D Depth / Radius of the carousel ring in pixels (auto-adjusts on mobile)
    carouselRadiusPx: 485,
    
    // 12 Rich Individual Memory Items with unique titles, dates, locations & notes:
    items: [
      {
        id: 1,
        title: "Only You",
        date: "October 15",
        location: "In My Heart",
        image: "assets/images/Image (64).jpg",
        memory: "Mai hamesha tujhe bolta hu ki tu motu ho gaya hai. Manta hu, ye baat thodi sahi bhi hai, par is dress mein tujhe dekhne ke baad mujhe laga ki motu hone ke baad tu aur bhi pyara dikh raha hai 🥹❤️ I love you, Betu 🫶🏻💋"
      },
      {
        id: 2,
        title: "Forest Walks & Forever Talks",
        location: "In My Heart",
        image: "assets/images/Image (14).jpg",
        memory: "Yaad hai na, Betu 🥹❤️ is din humne kitna enjoy kiya tha. Rohan, tere aur mere vo photos, vahan ki vo baarish 🌧️💗 Kash vo pal vahin ruk jaata 🫶🏻🥺❤️ "
      },
      {
        id: 3,
        title: "Shopping Buddies",
        
        location: "Love You",
        image: "assets/images/Image (17).jpg",
        memory: "Is din sirf khaas ready hokar photos nikalne hi toh VR Mall gaye the 🥹❤️ Us din humne kitne saare photos nikale the, Betu 📸💗 Aur yaad hai, Rohan ne humara pre-wedding shoot kar diya tha 😂❤️🫶🏻."
      },
      {
        id: 4,
        title: "Festival Vibes",
        
        location: "By Chatgpt Heart",
        image: "assets/images/Image (18).jpg",
        memory: "Tumhare sath har ek pal kisi rangeen safar se kam nahi hai, jahan har mod par ek nayi khushi aur sukoon milta hai. Is vibrant tasveer ki tarah, tumhari muskurahat meri duniya ko roshan karti hai. I love you ❤️✨."
      },
      {
        id: 5,
        title: "You & Me",
        
        location: "Deep In My Heart",
        image: "assets/images/Image (19).jpg",
        memory: "Nazar ko Nazar ki Nazar na lage Koi accha bhi iss qadar na lage Tujhe dekha hai iss nazar se, Jis nazar se tujhe nazar na lage"
      },
      {
        id: 6,
        title: "Heritage Hearts",
        
        location: "Golden Movement",
        image: "assets/images/Image (27).jpg",
        memory: "Ye vohi samay hai jab hum dost se zyada aur girlfriend-boyfriend se kum the 🥹❤️ Us samay lagta tha ki hum zyada samay tak saath nahi reh payenge, par ab dekho, hum tab bhi khush the aur ab bhi khush hain 🫶🏻💗 Bas, ab thoda jagah ka antar aa gaya hai 🥺❤️‍🩹"
      },
      {
        id: 7,
        title: "Selfie chromicles",
        
        location: "Colage movement",
        image: "assets/images/Image (30).jpg",
        memory: "Aapko yaad hai kya Betu, aap mere college mein do kaaran se aaye the—ek toh aapko mere sath rehna tha aur dusra main batana nahi chahta hoon, par us din bhi aap bahut khubsurat lag rahe the aur aaj bhi."
      },
      {
        id: 8,
        title: "Same Place, Different Feeling",
        
        location: "Whispering Sands Cove",
        image: "assets/images/Image (35).jpg",
        memory: "Ek raat ek baat likhunga, khud ko daag tujhe saaf likhunga, Haqeeqat mein toh kabhi milenge nahi, ek kitaab mein apni mulaqaat likhunga."
      },
      {
        id: 9,
        title: "Simple Movement",
        
        location: "Cobblestone Alleyways",
        image: "assets/images/Image (37).jpg",
        memory: "Yaad hai, is din hum jab gaadi par ja rahe the, maine dekha tha tab sab humko dekh rahe the. Mujhe us din tera sath bahut achha lag raha tha."
      },
      {
        id: 10,
        title: "Traditions & You",
        
        location: "Gelato Parlor",
        image: "assets/images/Image (61).jpg",
        memory: "Is din ke baare mein kya bolun... us din tujhe dekh kar mujhe tere se shaadi karne ka mann ho raha tha! 🥺💍 Mujhe tujhe saadi mein dekhna kitna accha lagta hai, tu soch nahi sakti... us din meri nazar bas tere par se hut nhi rhe thi, bas! 😍✨"
      },
      {
        id: 11,
        title: "Chasing Waterfalls",
        
        location: "Waterfall Diaries",
        image: "assets/images/Image (62).jpg",
        memory: "Yeh hamara first experience tha kahin sath mein bahar ghumne jaane ka, hai na? Woh waterfall, Tejas ka ghar, one night stay, everything... bahut hi mazedaar din the woh, Betu!"
      },
      {
        id: 12,
        title: "Better Together",
        
        location: "Everywhere & Forever",
        image: "assets/images/Image (63).jpg",
        memory: "Pata hai kya Betu, mujhe jahan tak yaad hai, mere liye mera pehla hug tere sath yahin par hua tha... 🫂✨ Aur yeh wahi din hai jis din humne pehla hug kiya tha, aur is din ke karan hi aaj hum sath hain kyunki us hug ke baad mujhe laga tha ki main tujhe kiss kar sakta hoon! 🙈😘I love you, Betu! ❤️💫"
      }
    ]
  }
};  

// Export to window for global access across scripts
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}

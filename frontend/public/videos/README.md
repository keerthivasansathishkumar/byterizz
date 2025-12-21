# Background Video Instructions

## How to Add Your Background Video

1. **Video Requirements:**
   - Format: MP4 or WebM
   - Recommended resolution: 1920x1080 (Full HD) or higher
   - Duration: 10-30 seconds (will loop automatically)
   - File size: Keep under 10MB for better performance

2. **Video Content Options:**
   - **Option 1:** Pleasant nature scenes (mountains, forests, peaceful landscapes)
   - **Option 2:** Student success story video showing achievements
   - **Option 3:** Graduation ceremony or academic success moments

3. **How to Add:**
   - Place your video file in this folder (`frontend/public/videos/`)
   - Name it: `background-video.mp4` or `background-video.webm`
   - The video will automatically play in the background on the home page

4. **Recommended Free Video Sources:**
   - Pexels Videos: https://www.pexels.com/videos/
   - Pixabay Videos: https://pixabay.com/videos/
   - Coverr: https://coverr.co/

5. **Example Video URLs (if you want to use online videos):**
   - Update the video source in `frontend/app/page.tsx`
   - Replace the fallback URL with your video URL

## Current Setup

The app will try to load:
1. `/videos/background-video.mp4` (local file)
2. `/videos/background-video.webm` (local file)
3. Online fallback video (if local files not found)

The video will:
- Auto-play on page load
- Loop continuously
- Be muted (for autoplay compatibility)
- Cover the full background
- Have a semi-transparent overlay for text readability







# Hero Video Compression Guide

## Current issue
The hero video (`/videos/hero-yacht.mp4`) is likely 10-50MB and blocks LCP. Target: **≤2MB**.

## Using FFmpeg (recommended)

```bash
# Compress to AV1 (best quality/size, ~70% smaller)
ffmpeg -i hero-yacht.mp4 -c:v libsvtav1 -crf 35 -b:v 0 -an -movflags +faststart hero-yacht-compressed.mp4

# Compress to HEVC/H.265 (widely compatible)
ffmpeg -i hero-yacht.mp4 -c:v libx265 -crf 28 -tag:v hvc1 -an -movflags +faststart hero-yacht-hevc.mp4

# Compress to WebM (VP9, good for Chrome/Firefox)
ffmpeg -i hero-yacht.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -an -deadline best hero-yacht.webm
```

## Key flags explained
- `-crf 28-35`: Lower = higher quality, higher = smaller file. Start at 30 and adjust.
- `-an`: Remove audio (background video doesn't need it)
- `-movflags +faststart`: Enables progressive download (video plays before fully loaded)
- `-t 15`: Trim to 15 seconds if your source is longer (loop handles the rest)

## Without FFmpeg
Use online tools like HandBrake (free) or Cloudinary's video upload which auto-compresses.

## Update in code
After compression, replace the file at `public/videos/hero-yacht.mp4` and keep `public/videos/hero-yacht.webm` as fallback.

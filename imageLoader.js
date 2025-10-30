// Enhanced imageLoader.js
export default async function myImageLoader({ src }) {
  try {
    // Attempt to fetch the image
    const response = await fetch(src);

    if (!response.ok) {
      console.error("Failed to load image:", {
        url: src,
        status: response.status,
        statusText: response.statusText,
      });
      return src; // Fallback to original URL
    }

    return src;
  } catch (error) {
    console.error("Image loading error:", error);
    return src;
  }
}

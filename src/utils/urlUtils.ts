export function extractDomain(url: string): string | null {
  try {
    // Remove protocol (http:// or https://) and get hostname
    const hostname = new URL(url).hostname;

    // Remove 'www.' if present
    return hostname.replace(/^www\./, '');
  } catch (error) {
    // Return null if URL is invalid
    return null;
  }
}



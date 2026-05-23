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

// Usage examples:
const urls = [
  'https://github.com',
  'https://www.github.com/topics',
  'http://blog.github.com',
  'invalid-url',
];

urls.forEach(url => {
  const domain = extractDomain(url);
  console.log(`URL: ${url} -> Domain: ${domain}`);
});

/* Output:
URL: https://github.com -> Domain: github.com
URL: https://www.github.com/topics -> Domain: github.com
URL: http://blog.github.com -> Domain: blog.github.com
URL: invalid-url -> Domain: null
*/

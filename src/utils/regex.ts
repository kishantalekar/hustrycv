/**
 * Extracts and parses JSON content from a string that contains JSON within code blocks
 * formatted with triple backticks (```json ... ```)
 *
 * @param {string} text - The input text containing JSON within code blocks
 * @returns {Object|null} The parsed JSON object or null if extraction/parsing fails
 */
export function extractJsonFromCodeBlock(text: string) {
  try {
    // Regex to match content between ```json and ``` tags
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = text.match(jsonRegex);

    if (!match || !match[1]) {
      console.warn('No JSON content found between code block markers');
      return null;
    }

    // Extract the JSON content from the matched group
    const jsonContent = match[1].trim();

    // Parse the JSON string into an object
    const parsedJson = JSON.parse(jsonContent);
    return parsedJson;
  } catch (error) {
    console.error('Error extracting or parsing JSON:', error);
    return null;
  }
}
export function extractHtmlFromCodeBlock(text: string) {
  try {
    // Regex to match content between ```html and ``` tags
    const htmlRegex = /```html\s*([\s\S]*?)\s*```/;
    const match = text.match(htmlRegex);
    if (!match || !match[1]) {
      console.warn('No HTML content found between code block markers');
      return null;
    }
    // Extract the HTML content from the matched group
    const htmlContent = match[1].trim();
    return htmlContent;
  } catch (error) {
    console.error('Error extracting or parsing HTML:', error);
    return null;
  }
}

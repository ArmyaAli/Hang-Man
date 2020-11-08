export async function lookForWords(url) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', 
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

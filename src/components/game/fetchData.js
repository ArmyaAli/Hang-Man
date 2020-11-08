// Example POST method implementation:
export async function lookForWords(url) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

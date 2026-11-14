
// The URL comes from .env, so nothing is hardcoded
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchEmployees(search, signal) {
  // Only add ?search= when the user actually typed something
  const url = new URL(`${BASE_URL}/employees`);
  if (search) {
    url.searchParams.set("search", search);
  }

  let response;
  try {
    response = await fetch(url, { signal });
  } catch (err) {
    if (err.name === "AbortError") throw err; // cancelled on purpose, not a real error
    throw new Error("Cannot reach the server. Please check your connection.");
  }

  if (!response.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const body = await response.json();
      if (typeof body.detail === "string") message = body.detail;
    } catch {
      // response had no JSON, keep the default message
    }
    throw new Error(message);
  }

  return response.json();
}
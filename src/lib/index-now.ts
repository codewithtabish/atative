const SITE_URL = "https://www.alentah.com";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

export async function pingIndexNow(url: string) {
  if (!INDEXNOW_KEY) {
    return;
  }

  try {
    await fetch(
      `https://api.indexnow.org/indexnow?url=${encodeURIComponent(
        `${SITE_URL}${url}`,
      )}&key=${INDEXNOW_KEY}`,
      {
        method: "GET",
      },
    );
  } catch {
    // Ignore IndexNow errors so publishing is not affected.
  }
}

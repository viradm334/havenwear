import { createClient } from "pexels";

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

const client = createClient(PEXELS_API_KEY);

export default client;

export async function fetchRandomPexelsImage(productName) {
  const perPage = 15;

  try {
    const firstPage = await client.photos.search({
      query: productName,
      per_page: perPage,
      page: 1,
    });

    if (!firstPage.photos || firstPage.photos.length === 0) {
      return null;
    }

    const totalResults = Math.min(firstPage.total_results || 0, 1000);
    const maxPage = Math.ceil(totalResults / perPage);

    const randomPage = Math.floor(Math.random() * maxPage) + 1;

    const pageRes = await client.photos.search({
      query: productName,
      per_page: perPage,
      page: randomPage,
    });

    const photos = pageRes.photos || [];
    if (photos.length === 0) return null;

    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];

    return randomPhoto.src.medium;
  } catch (error) {
    console.error("Error fetching from Pexels:", error);
    return null;
  }
}

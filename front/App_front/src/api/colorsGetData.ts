export default async function colorsGetData() {
  const response = await fetch('http://localhost:3000/api/v1/colors');
  if (!response.ok) {
    throw new Error('Failed to fetch colors data');
  }
  return await response.json();
}

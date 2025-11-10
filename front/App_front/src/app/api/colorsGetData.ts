import { API_BASE_URL } from './config';

export default async function colorsGetData() {
  const response = await fetch(`${API_BASE_URL}/colors`);
  if (!response.ok) {
    throw new Error('Failed to fetch colors data');
  }

  const log = await response.json();
  console.log(log);
  return log;
}

export async function getExchangeRate() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await response.json();
    return data.rates.INR;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }
}

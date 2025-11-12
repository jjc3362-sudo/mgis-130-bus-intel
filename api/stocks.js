/**
 * Serverless Function: Stock Price API
 *
 * Fetches real-time stock prices from API Ninjas for major banking institutions
 * Deployed on Vercel as a serverless function
 *
 * Required Environment Variable:
 * - API_KEY: API Ninjas authentication key
 */

// Polyfill fetch for older Node versions (Vercel uses Node 18+ which has built-in fetch)
const fetch = globalThis.fetch || require('node-fetch');

// Company mapping for ticker symbols - Major Banking Institutions
const COMPANIES = {
  'JPM': 'JPMorgan Chase & Co.',
  'BAC': 'Bank of America Corporation',
  'C': 'Citigroup Inc.',
  'WFC': 'Wells Fargo & Company',
  'ICBC': 'Industrial and Commercial Bank of China'
};

// Economic indicators - Interest rates (updated as of Nov 2024)
// Note: These should be updated periodically for accuracy
const ECONOMIC_INDICATORS = {
  usa: {
    country: 'United States',
    interestRate: 5.50,
    rateType: 'Federal Funds Rate',
    lastUpdated: '2024-11-01',
    currency: 'USD'
  },
  china: {
    country: 'China',
    interestRate: 3.45,
    rateType: 'Loan Prime Rate (1Y)',
    lastUpdated: '2024-11-01',
    currency: 'CNY'
  }
};

/**
 * Fetches stock price for a single ticker from API Ninjas
 * @param {string} ticker - Stock ticker symbol
 * @param {string} apiKey - API Ninjas API key
 * @returns {Promise<Object>} Stock data object
 */
async function fetchStockPrice(ticker, apiKey) {
  const url = `https://api.api-ninjas.com/v1/stockprice?ticker=${ticker}`;

  const response = await fetch(url, {
    headers: {
      'X-Api-Key': apiKey
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${ticker}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  return {
    ticker: ticker,
    company: COMPANIES[ticker],
    price: data.price,
    timestamp: new Date().toISOString()
  };
}

/**
 * Main serverless function handler
 * Fetches stock prices for all tracked companies
 */
module.exports = async function handler(req, res) {
  // Set CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'This endpoint only accepts GET requests'
    });
  }

  try {
    // Validate API key is configured
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error('API_KEY environment variable is not set');
      return res.status(500).json({
        error: 'Configuration error',
        message: 'Server is not properly configured'
      });
    }

    // Fetch stock prices for all companies in parallel
    const tickers = Object.keys(COMPANIES);
    const stockPromises = tickers.map(ticker =>
      fetchStockPrice(ticker, apiKey)
    );

    // Wait for all requests to complete
    const stocks = await Promise.all(stockPromises);

    // Add a common timestamp for the entire response
    const responseData = {
      success: true,
      timestamp: new Date().toISOString(),
      data: stocks,
      economicIndicators: ECONOMIC_INDICATORS
    };

    // Return successful response
    return res.status(200).json(responseData);

  } catch (error) {
    console.error('Error fetching stock data:', error);

    // Return error response
    return res.status(500).json({
      error: 'Failed to fetch stock data',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

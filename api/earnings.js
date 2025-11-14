/**
 * Serverless Function: Earnings Call Transcript API
 *
 * Fetches earnings call transcripts from API Ninjas
 * Deployed on Vercel as a serverless function
 *
 * Required Environment Variable:
 * - API_KEY: API Ninjas authentication key
 */

/**
 * Fetches earnings call transcript from API Ninjas
 * @param {string} ticker - Stock ticker symbol
 * @param {string} year - Year of the earnings call
 * @param {string} quarter - Quarter (1-4)
 * @param {string} apiKey - API Ninjas API key
 * @returns {Promise<Object>} Earnings transcript data
 */
async function fetchEarningsTranscript(ticker, year, quarter, apiKey) {
  const url = `https://api.api-ninjas.com/v1/earningscall?ticker=${ticker}&year=${year}&quarter=${quarter}`;

  const response = await fetch(url, {
    headers: {
      'X-Api-Key': apiKey
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch earnings for ${ticker}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // If no data returned, throw an error
  if (!data || Object.keys(data).length === 0) {
    throw new Error(`No earnings data found for ${ticker} Q${quarter} ${year}`);
  }

  return data;
}

/**
 * Main serverless function handler
 * Fetches earnings call transcript based on query parameters
 */
export default async function handler(req, res) {
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
      success: false,
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
        success: false,
        error: 'Configuration error',
        message: 'Server is not properly configured'
      });
    }

    // Get query parameters
    const { ticker, year, quarter } = req.query;

    // Validate required parameters
    if (!ticker) {
      return res.status(400).json({
        success: false,
        error: 'Missing parameter',
        message: 'Ticker symbol is required'
      });
    }

    if (!year) {
      return res.status(400).json({
        success: false,
        error: 'Missing parameter',
        message: 'Year is required'
      });
    }

    if (!quarter) {
      return res.status(400).json({
        success: false,
        error: 'Missing parameter',
        message: 'Quarter is required'
      });
    }

    // Validate quarter is between 1-4
    const quarterNum = parseInt(quarter);
    if (isNaN(quarterNum) || quarterNum < 1 || quarterNum > 4) {
      return res.status(400).json({
        success: false,
        error: 'Invalid parameter',
        message: 'Quarter must be between 1 and 4'
      });
    }

    // Fetch earnings transcript
    const earningsData = await fetchEarningsTranscript(
      ticker.toUpperCase(),
      year,
      quarter,
      apiKey
    );

    // Return successful response
    const responseData = {
      success: true,
      timestamp: new Date().toISOString(),
      data: earningsData
    };

    return res.status(200).json(responseData);

  } catch (error) {
    console.error('Error fetching earnings data:', error);

    // Return error response
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch earnings data',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

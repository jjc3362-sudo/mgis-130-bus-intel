# Competitive Intelligence Dashboard

A professional business intelligence dashboard for tracking real-time stock performance of major technology companies. Built for deployment on Vercel with serverless architecture.

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🎯 Overview

This dashboard provides real-time competitive intelligence by tracking stock prices for major technology sector leaders:

- **Apple Inc.** (AAPL)
- **Microsoft Corporation** (MSFT)
- **Alphabet Inc. / Google** (GOOGL)
- **Meta Platforms Inc.** (META)
- **Amazon.com Inc.** (AMZN)

## ✨ Features

### Core Functionality
- ✅ **Real-time Stock Data**: Live stock prices via API Ninjas integration
- ✅ **Visual Indicators**: Automatic highlighting of highest (green) and lowest (red) prices
- ✅ **One-Click Export**: Download data as CSV for reports and presentations
- ✅ **Auto-Refresh**: Manual refresh button for latest market data
- ✅ **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Technical Highlights
- ✅ **Serverless Architecture**: Zero-maintenance deployment on Vercel
- ✅ **WCAG AA Compliant**: High-contrast design for accessibility
- ✅ **Professional UI/UX**: Business-grade presentation quality
- ✅ **Error Handling**: Robust error states and loading indicators
- ✅ **Fast Performance**: Optimized vanilla JavaScript (no framework overhead)

## 🚀 Quick Deploy to Vercel

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **API Ninjas Key**: Get free API key at [api-ninjas.com](https://api-ninjas.com/)

### One-Click Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/mgis-130-bus-intel)

1. Click the "Deploy" button above
2. Connect your GitHub account
3. Configure environment variables (see below)
4. Deploy!

### Manual Deployment

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/mgis-130-bus-intel.git
cd mgis-130-bus-intel

# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy to Vercel
vercel

# Follow the prompts to:
# 1. Link to your Vercel account
# 2. Configure project settings
# 3. Add environment variables
```

## 🔐 Environment Configuration

### Required Environment Variables

Set the following environment variable in your Vercel project:

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `API_KEY` | API Ninjas authentication key | [api-ninjas.com/api/stockprice](https://api-ninjas.com/api/stockprice) |

### Setting Environment Variables in Vercel

**Via Vercel Dashboard:**
1. Go to your project in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add `API_KEY` with your API Ninjas key
4. Redeploy the project

**Via Vercel CLI:**
```bash
vercel env add API_KEY
# Paste your API key when prompted
# Select: Production, Preview, Development (all three)
```

### Local Development

For local testing:

```bash
# Copy example environment file
cp .env.example .env

# Edit .env and add your API key
# API_KEY=your_actual_api_key_here

# Install Vercel CLI for local development
npm i -g vercel

# Run development server
vercel dev
```

Then open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
mgis-130-bus-intel/
├── api/
│   └── stocks.js          # Serverless function for stock data
├── index.html             # Main dashboard frontend
├── vercel.json            # Vercel deployment configuration
├── .env.example           # Environment variable template
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## 🛠️ Technical Architecture

### Frontend (`index.html`)
- **Pure vanilla JavaScript** - No framework dependencies
- **Responsive CSS Grid/Flexbox** - Mobile-first design
- **Async/Await** - Modern asynchronous data fetching
- **WCAG AA compliant** - Accessible to all users
- **CSV export functionality** - Download data for external analysis

### Backend (`/api/stocks.js`)
- **Vercel Serverless Function** - Node.js runtime
- **Parallel API calls** - Fetches all stocks simultaneously using `Promise.all()`
- **Error handling** - Comprehensive try-catch blocks
- **CORS enabled** - Cross-origin resource sharing configured
- **Environment variables** - Secure API key management

### API Integration
- **Provider**: API Ninjas Stock Price API
- **Endpoint**: `https://api.api-ninjas.com/v1/stockprice`
- **Authentication**: Header-based (`X-Api-Key`)
- **Rate Limits**: Depends on your API Ninjas plan

## 📊 Dashboard Features

### Data Display
- **Company Name**: Full corporate name
- **Ticker Symbol**: Stock exchange ticker
- **Current Price**: Real-time price in USD (2 decimal places)
- **Change Indicator**: Visual indicator showing highest/lowest/mid-range

### Interactive Controls
- **Refresh Data**: Fetch latest stock prices
- **Export to CSV**: Download data in spreadsheet format
- **Timestamp**: Shows when data was last updated

### Visual Indicators
- 🟢 **Green Border**: Highest price among tracked stocks
- 🔴 **Red Border**: Lowest price among tracked stocks
- ⚫ **Neutral**: Mid-range prices

## 🎨 Design Philosophy

The dashboard follows these design principles:

1. **Business Professional**: Clean, corporate aesthetic suitable for presentations
2. **High Contrast**: WCAG AA compliant for accessibility
3. **Data-First**: Information hierarchy optimized for quick scanning
4. **Responsive**: Seamless experience across all device sizes
5. **Performance**: Minimal JavaScript, optimized loading times

## 🔧 Customization

### Adding More Companies

Edit `/api/stocks.js`:

```javascript
const COMPANIES = {
  'AAPL': 'Apple Inc.',
  'MSFT': 'Microsoft Corporation',
  'GOOGL': 'Alphabet Inc. (Google)',
  'META': 'Meta Platforms Inc.',
  'AMZN': 'Amazon.com Inc.',
  'TSLA': 'Tesla Inc.',  // Add new company
  'NVDA': 'NVIDIA Corporation'  // Add new company
};
```

### Styling Modifications

All styles are contained in `index.html` within the `<style>` tag. Key CSS variables to customize:

- Header gradient: `.header { background: linear-gradient(...) }`
- Primary color: `.btn-refresh { background: #2563eb }`
- Table header: `thead { background: linear-gradient(...) }`

## 🐛 Troubleshooting

### "Unable to load data" Error

**Possible causes:**
1. API_KEY environment variable not set
2. Invalid API key
3. API Ninjas rate limit exceeded
4. Network connectivity issues

**Solutions:**
- Verify environment variable is set in Vercel dashboard
- Check API key is valid at api-ninjas.com
- Review Vercel function logs: `vercel logs`

### Data Not Refreshing

**Solution:** Clear browser cache or hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### CSV Export Not Working

**Solution:** Ensure browser allows downloads. Check pop-up blocker settings.

## 📈 Use Cases

This dashboard is ideal for:

- **Competitive Analysis**: Quick visual comparison of competitor stock performance
- **Business Presentations**: Export data for PowerPoint/Google Slides
- **Market Research**: Track technology sector trends
- **Investment Monitoring**: Keep tabs on major tech companies
- **Educational Purposes**: Learn about stock market dynamics

## 🔒 Security

- ✅ API keys stored in environment variables (never in code)
- ✅ Serverless function protects API key from client exposure
- ✅ CORS configured for secure cross-origin requests
- ✅ No sensitive data stored client-side
- ✅ HTTPS enforced by Vercel

## 📝 License

MIT License - Feel free to use this project for commercial or personal purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review Vercel deployment logs
3. Verify API Ninjas service status

## 🙏 Acknowledgments

- **API Ninjas** for providing the stock price API
- **Vercel** for serverless hosting platform
- Built for MGIS-130 Business Intelligence course

---

**Made with 💼 for Business Intelligence professionals**

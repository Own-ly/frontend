# Ownly - Real Estate Marketplace on Blockchain

## 🚀 Features

### Property Marketplace
- Browse and purchase fractional real estate properties
- View detailed property information and images
- Secure blockchain-based transactions

### Rental Income Management
- Track rental income from owned properties
- View historical rental payment data
- Automated income distribution

### DAO Governance
- Create and vote on property-related proposals
- Community-driven decision making
- Transparent voting records on blockchain

### Wallet Integration
- Secure Xion blockchain wallet connection
- Abstraxion provider for seamless authentication
- Transaction history tracking

## ⚙️ Installation

### Prerequisites
- Node.js v22.x or higher
- npm or yarn
- Xion testnet account (for development)

### Setup Instructions
1. Clone the repository:
```bash
git clone https://github.com/your-repo/ownly-frontend.git
cd ownly-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file with:
```env
NEXT_PUBLIC_XION_NETWORK=testnet
NEXT_PUBLIC_ABSTRAXION_CONFIG=your_config_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack
- **Frontend**: Next.js 14, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Xion via Abstraxion
- **State Management**: React Context
- **Build Tool**: Vite (via Next.js)

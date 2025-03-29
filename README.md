This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Structure

The project structure is organized as follows:

```
/home/marcus/nextjs-xion-abstraxion-ownly
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore file
├── next.config.js          # Next.js configuration
├── package-lock.json       # Dependency lock file
├── package.json            # Project dependencies & scripts
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project documentation
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── public/                 # Static assets
│   ├── images/             # Property images, icons, etc.
│   ├── logos/              # Branding assets
│   ├── next.svg            # Next.js logo
│   └── vercel.svg          # Vercel logo
└── src/
    ├── app/                 # Main application directory
    │   ├── favicon.ico      # Favicon for the app
    │   ├── globals.css      # Global CSS styles
    │   ├── layout.tsx       # Root layout with consistent UI
    │   ├── page.tsx         # Main landing page
    │   ├── properties/      # Property listing and details
    │   │   ├── page.tsx     # List all properties
    │   │   ├── [id]/page.tsx  # Property details page
    │   ├── marketplace/     # Marketplace for buying/selling shares
    │   │   ├── page.tsx     # Listings page
    │   ├── rental-income/   # Rental income distribution
    │   │   ├── page.tsx     # Rental income dashboard
    │   ├── dao/             # Governance voting
    │   │   ├── page.tsx     # DAO governance page
    │   ├── portfolio/       # User holdings and transactions
    │   │   ├── page.tsx     # Portfolio overview
    │   ├── api/             # API handlers for blockchain interactions
    │   │   ├── properties.ts  # Fetch properties
    │   │   ├── marketplace.ts # Handle share buying/selling
    │   │   ├── rental.ts      # Handle rental payouts
    │   │   ├── dao.ts         # Handle DAO voting
    ├── components/           # Reusable UI components
    │   ├── Header.tsx        # Navigation bar
    │   ├── Footer.tsx        # Footer section
    │   ├── WalletConnect.tsx # Connect to XION Meta Accounts
    │   ├── PropertyCard.tsx  # Display property listings
    │   ├── SharePurchase.tsx # Modal for buying shares
    │   ├── RentalChart.tsx   # Rental income analytics
    │   ├── DAOProposal.tsx   # Voting interface
    ├── hooks/                # Custom hooks for blockchain data
    │   ├── useProperties.ts
    │   ├── useMarketplace.ts
    │   ├── useRental.ts
    │   ├── useDAO.ts
    ├── context/              # Global state management (Zustand/Context API)
    │   ├── UserContext.ts
    │   ├── BlockchainContext.ts
    ├── services/             # Backend API and blockchain integration
    │   ├── xion.ts           # XION Meta Accounts integration
    │   ├── cosmwasm.ts       # Interact with CosmWasm smart contracts
    ├── utils/                # Helper functions
    │   ├── format.ts         # Formatting utilities
    │   ├── blockchain.ts     # Blockchain transaction utilities

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

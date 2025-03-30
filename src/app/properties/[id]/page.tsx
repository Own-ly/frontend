'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import house1 from "../../../../public/houses/house1.jpg";
import house2 from "../../../../public/houses/house2.jpg";
import house3 from "../../../../public/houses/house3.jpg";
import house4 from "../../../../public/houses/house4.jpg";
import house5 from "../../../../public/houses/house5.jpg";
import house6 from "../../../../public/houses/house6.jpg";
import { 
  ArrowLeftIcon, 
  ChartBarIcon, 
  HomeIcon, 
  CurrencyDollarIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

type PropertyType = 'residential' | 'commercial' | 'vacation' | 'industrial';

interface Property {
  id: number;
  name: string;
  location: string;
  image: StaticImageData;
  totalShares: number;
  sharesAvailable: number;
  pricePerShare: number;
  annualReturn: number;
  propertyType: PropertyType;
  totalValueUSD: number;
  description?: string;
  amenities?: string[];
  neighborhood?: string;
  yearBuilt?: number;
  squareFeet?: number;
  bedrooms?: number;
  bathrooms?: number;
}

interface MockProperties {
  [key: string]: Property;
}

export default function PropertyDetails() {
  const params = useParams();
  const id = params.id as string;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'financials' | 'documents' | 'buy'>('overview');
  const [sharesToBuy, setSharesToBuy] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchPropertyDetails = async () => {
      setLoading(true);
      
      const imageMap: Record<number, StaticImageData> = {
        1: house1,
        2: house2,
        3: house3,
        4: house4,
        5: house5,
        6: house6
      };
      
      const mockProperties: MockProperties = {
        "1": {
          id: 1,
          name: 'Luxury Condo in Wuye',
          location: 'Abuja, FCT',
          image: imageMap[1],
          totalShares: 1000,
          sharesAvailable: 750,
          pricePerShare: 100,
          annualReturn: 8.2,
          propertyType: 'residential',
          totalValueUSD: 1000000,
          description: 'This luxury condominium offers modern living in the heart of Wuye, Abuja.',
          amenities: ['Swimming Pool', 'Gym', '24/7 Security'],
          neighborhood: 'Wuye is an upscale neighborhood in Abuja.',
          yearBuilt: 2019,
          squareFeet: 1200,
          bedrooms: 3,
          bathrooms: 2
        },
        // ... other properties (2-6) remain the same
      };
      
      if (id && mockProperties[id]) {
        setProperty(mockProperties[id]);
      }
      
      setLoading(false);
    };
    
    fetchPropertyDetails();
  }, [id]);

  const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      setSharesToBuy(1);
    } else if (property && value > property.sharesAvailable) {
      setSharesToBuy(property.sharesAvailable);
    } else {
      setSharesToBuy(value);
    }
  };

  const handlePurchase = async () => {
    if (!property) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(`Successfully purchased ${sharesToBuy} shares of ${property.name}`);
      
      setProperty({
        ...property,
        sharesAvailable: property.sharesAvailable - sharesToBuy
      });
      
      setSharesToBuy(1);
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-900">Property Not Found</h1>
          <Link href="/marketplace" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Marketplace
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const totalCost = sharesToBuy * property.pricePerShare;
  const percentOwnership = (sharesToBuy / property.totalShares) * 100;
  const estimatedAnnualReturn = (totalCost * (property.annualReturn / 100)).toFixed(2);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{property.name} - Ownly</title>
        <meta name="description" content={`Buy fractional shares of ${property.name}`} />
      </Head>

      <Header />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/marketplace" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Back to Marketplace
          </Link>
          
          <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="relative h-64 md:h-96">
              <Image
                src={property.image}
                alt={property.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {property.propertyType}
                  </span>
                  <h1 className="mt-2 text-2xl font-bold text-white">{property.name}</h1>
                  <p className="text-white/90">{property.location}</p>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {(['overview', 'financials', 'documents', 'buy'] as const).map((tab) => {
                  const icons = {
                    overview: HomeIcon,
                    financials: ChartBarIcon,
                    documents: DocumentTextIcon,
                    buy: CurrencyDollarIcon
                  };
                  const Icon = icons[tab];
                  return (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`py-4 px-6 font-medium text-sm border-b-2 ${
                        selectedTab === tab
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="h-5 w-5 inline mr-2" />
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  );
                })}
              </nav>
            </div>
            
            <div className="p-6">
              {selectedTab === 'overview' && (
                <PropertyOverview property={property} />
              )}
              
              {selectedTab === 'financials' && (
                <FinancialDetails property={property} />
              )}
              
              {selectedTab === 'documents' && (
                <DocumentsSection />
              )}
              
              {selectedTab === 'buy' && (
                <BuySharesSection 
                  property={property}
                  sharesToBuy={sharesToBuy}
                  handleSharesChange={handleSharesChange}
                  handlePurchase={handlePurchase}
                  isSubmitting={isSubmitting}
                  totalCost={totalCost}
                  percentOwnership={percentOwnership}
                  estimatedAnnualReturn={estimatedAnnualReturn}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Sub-components with TypeScript interfaces

interface PropertyOverviewProps {
  property: Property;
}

const PropertyOverview = ({ property }: PropertyOverviewProps) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-900">Property Overview</h2>
    <p className="mt-4 text-gray-600">{property.description}</p>
    
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <PropertyDetailsCard property={property} />
      <NeighborhoodCard neighborhood={property.neighborhood} />
      <AmenitiesCard amenities={property.amenities} />
    </div>
  </div>
);

const PropertyDetailsCard = ({ property }: { property: Property }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-medium text-gray-900">Property Details</h3>
    <dl className="mt-2 space-y-1">
      <DetailItem label="Property Type:" value={property.propertyType} capitalize />
      <DetailItem label="Year Built:" value={property.yearBuilt?.toString()} />
      <DetailItem label="Size:" value={property.squareFeet ? `${property.squareFeet.toLocaleString()} sq ft` : undefined} />
      <DetailItem label="Bedrooms:" value={property.bedrooms?.toString()} />
      <DetailItem label="Bathrooms:" value={property.bathrooms?.toString()} />
    </dl>
  </div>
);

interface DetailItemProps {
  label: string;
  value?: string;
  capitalize?: boolean;
  highlight?: boolean; // Added this property to fix the TypeScript error
}

const DetailItem = ({ label, value, capitalize = false, highlight = false }: DetailItemProps) => (
  value ? (
    <div className="flex justify-between">
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className={`text-sm ${highlight ? 'font-medium text-green-600' : 'text-gray-900'} ${capitalize ? 'capitalize' : ''}`}>
        {value}
      </dd>
    </div>
  ) : null
);

const NeighborhoodCard = ({ neighborhood }: { neighborhood?: string }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-medium text-gray-900">Neighborhood</h3>
    {neighborhood && <p className="mt-2 text-sm text-gray-600">{neighborhood}</p>}
  </div>
);

const AmenitiesCard = ({ amenities }: { amenities?: string[] }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-medium text-gray-900">Amenities</h3>
    {amenities && (
      <ul className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1">
        {amenities.map((amenity, index) => (
          <li key={index} className="text-sm text-gray-600">• {amenity}</li>
        ))}
      </ul>
    )}
  </div>
);

const FinancialDetails = ({ property }: { property: Property }) => {
  const soldPercentage = ((property.totalShares - property.sharesAvailable) / property.totalShares) * 100;
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900">Financial Details</h2>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <FinancialCard 
          title="Property Valuation"
          items={[
            { label: 'Total Value:', value: `$${property.totalValueUSD.toLocaleString()}` },
            { label: 'Price Per Share:', value: `$${property.pricePerShare}` },
            { label: 'Total Shares:', value: property.totalShares.toLocaleString() }
          ]}
        />
        
        <FinancialCard 
          title="Investment Performance"
          items={[
            { label: 'Annual Return:', value: `${property.annualReturn}%`, highlight: true },
            { label: 'Distribution Frequency:', value: 'Monthly' },
            { label: 'Holding Period:', value: '5+ years' }
          ]}
        />
        
        <FinancialCard 
          title="Share Availability"
          items={[
            { label: 'Available Shares:', value: property.sharesAvailable.toLocaleString() },
            { label: 'Sold Shares:', value: (property.totalShares - property.sharesAvailable).toLocaleString() },
            { label: 'Sold Percentage:', value: `${soldPercentage.toFixed(1)}%` }
          ]}
        />
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium text-gray-900">Funding Progress</h3>
        <div className="mt-2 bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 rounded-full h-2.5" 
            style={{ width: `${soldPercentage}%` }}
          />
        </div>
        <p className="mt-1 text-sm text-gray-600">
          {soldPercentage.toFixed(1)}% funded ({property.sharesAvailable.toLocaleString()} shares remaining)
        </p>
      </div>
    </div>
  );
};

interface FinancialCardProps {
  title: string;
  items: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
}

const FinancialCard = ({ title, items }: FinancialCardProps) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="font-medium text-gray-900">{title}</h3>
    <dl className="mt-2 space-y-1">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between">
          <dt className="text-sm text-gray-500">{item.label}</dt>
          <dd className={`text-sm ${item.highlight ? 'font-medium text-green-600' : 'text-gray-900'}`}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  </div>
);

const DocumentsSection = () => {
  const documents = [
    { title: 'Property Prospectus', description: 'Detailed information about the property investment' },
    { title: 'Investment Agreement', description: 'Legal agreement for share ownership' },
    { title: 'Financial Statements', description: 'Historical performance and financial projections' },
    { title: 'Property Inspection Report', description: 'Detailed physical inspection report' }
  ];
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900">Property Documents</h2>
      
      <div className="mt-6 space-y-4">
        {documents.map((doc, index) => (
          <DocumentItem key={index} title={doc.title} description={doc.description} />
        ))}
      </div>
    </div>
  );
};

interface DocumentItemProps {
  title: string;
  description: string;
}

const DocumentItem = ({ title, description }: DocumentItemProps) => (
  <div className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
    <div>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100">
      Download PDF
    </button>
  </div>
);

interface BuySharesSectionProps {
  property: Property;
  sharesToBuy: number;
  handleSharesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePurchase: () => void;
  isSubmitting: boolean;
  totalCost: number;
  percentOwnership: number;
  estimatedAnnualReturn: string;
}

const BuySharesSection = ({
  property,
  sharesToBuy,
  handleSharesChange,
  handlePurchase,
  isSubmitting,
  totalCost,
  percentOwnership,
  estimatedAnnualReturn
}: BuySharesSectionProps) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-900">Purchase Shares</h2>
    <p className="mt-2 text-gray-600">
      Invest in {property.name} by purchasing fractional shares.
    </p>
    
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <ShareInformation property={property} />
      
      <PurchaseForm 
        sharesToBuy={sharesToBuy}
        handleSharesChange={handleSharesChange}
        handlePurchase={handlePurchase}
        isSubmitting={isSubmitting}
        sharesAvailable={property.sharesAvailable}
        totalCost={totalCost}
        percentOwnership={percentOwnership}
        estimatedAnnualReturn={estimatedAnnualReturn}
      />
    </div>
  </div>
);

const ShareInformation = ({ property }: { property: Property }) => (
  <div className="bg-gray-50 p-6 rounded-lg">
    <h3 className="font-medium text-gray-900">Share Information</h3>
    <dl className="mt-4 space-y-3">
      <DetailItem label="Price per share:" value={`$${property.pricePerShare}`} />
      <DetailItem label="Available shares:" value={property.sharesAvailable.toLocaleString()} />
      <DetailItem label="Minimum investment:" value={`$${property.pricePerShare} (1 share)`} />
      <DetailItem 
        label="Expected annual return:" 
        value={`${property.annualReturn}%`} 
        highlight
      />
    </dl>
    
    <HowItWorks />
  </div>
);

const HowItWorks = () => (
  <div className="mt-6 pt-6 border-t border-gray-200">
    <h4 className="font-medium text-gray-900">How it works</h4>
    <ul className="mt-2 space-y-2">
      {[
        'Choose the number of shares you want to buy',
        'Complete your purchase securely',
        'Receive digital proof of ownership',
        'Earn returns based on property performance'
      ].map((step, index) => (
        <li key={index} className="flex items-start">
          <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-medium">
            {index + 1}
          </span>
          <span className="ml-2 text-sm text-gray-600">{step}</span>
        </li>
      ))}
    </ul>
  </div>
);

interface PurchaseFormProps {
  sharesToBuy: number;
  handleSharesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePurchase: () => void;
  isSubmitting: boolean;
  sharesAvailable: number;
  totalCost: number;
  percentOwnership: number;
  estimatedAnnualReturn: string;
}

const PurchaseForm = ({
  sharesToBuy,
  handleSharesChange,
  handlePurchase,
  isSubmitting,
  sharesAvailable,
  totalCost,
  percentOwnership,
  estimatedAnnualReturn
}: PurchaseFormProps) => (
  <div className="bg-white p-6 border border-gray-200 rounded-lg">
    <h3 className="font-medium text-gray-900">Purchase Shares</h3>
    
    <div className="mt-4">
      <label htmlFor="shares" className="block text-sm font-medium text-gray-700">
        Number of shares
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type="number"
          id="shares"
          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={sharesToBuy}
          onChange={handleSharesChange}
          min="1"
          max={sharesAvailable}
        />
      </div>
    </div>
    
    <div className="mt-6 space-y-4">
      <OrderSummary 
        sharesToBuy={sharesToBuy} 
        pricePerShare={totalCost / sharesToBuy} 
        totalCost={totalCost} 
      />
      <OwnershipDetails 
        percentOwnership={percentOwnership} 
        estimatedAnnualReturn={estimatedAnnualReturn} 
      />
      <PurchaseButton 
        isSubmitting={isSubmitting}
        sharesAvailable={sharesAvailable}
        sharesToBuy={sharesToBuy}
        totalCost={totalCost}
        handlePurchase={handlePurchase}
      />
    </div>
  </div>
);

interface OrderSummaryProps {
  sharesToBuy: number;
  pricePerShare: number;
  totalCost: number;
}

const OrderSummary = ({ sharesToBuy, pricePerShare, totalCost }: OrderSummaryProps) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h4 className="text-sm font-medium text-gray-900">Order Summary</h4>
    <dl className="mt-2 space-y-2">
      <DetailItem label="Shares:" value={sharesToBuy.toLocaleString()} />
      <DetailItem label="Price per share:" value={`$${pricePerShare}`} />
      <div className="flex justify-between pt-2 border-t border-gray-200">
        <dt className="text-sm font-medium text-gray-900">Total Cost:</dt>
        <dd className="text-sm font-medium text-gray-900">${totalCost.toLocaleString()}</dd>
      </div>
    </dl>
  </div>
);

interface OwnershipDetailsProps {
  percentOwnership: number;
  estimatedAnnualReturn: string;
}

const OwnershipDetails = ({ percentOwnership, estimatedAnnualReturn }: OwnershipDetailsProps) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h4 className="text-sm font-medium text-gray-900">Ownership Details</h4>
    <dl className="mt-2 space-y-2">
      <DetailItem label="Ownership Percentage:" value={`${percentOwnership.toFixed(2)}%`} />
      <DetailItem 
        label="Estimated Annual Return:" 
        value={`$${estimatedAnnualReturn}`} 
        highlight
      />
    </dl>
  </div>
);

interface PurchaseButtonProps {
  isSubmitting: boolean;
  sharesAvailable: number;
  sharesToBuy: number;
  totalCost: number;
  handlePurchase: () => void;
}

const PurchaseButton = ({
  isSubmitting,
  sharesAvailable,
  sharesToBuy,
  totalCost,
  handlePurchase
}: PurchaseButtonProps) => (
  <div className="pt-4">
    <button
      onClick={handlePurchase}
      disabled={isSubmitting || sharesAvailable === 0}
      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
        isSubmitting || sharesAvailable === 0
          ? 'bg-indigo-300 cursor-not-allowed'
          : 'bg-indigo-600 hover:bg-indigo-700'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
    >
      {isSubmitting ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : sharesAvailable === 0 ? (
        'Sold Out'
      ) : (
        `Purchase ${sharesToBuy} Share${sharesToBuy !== 1 ? 's' : ''} for $${totalCost.toLocaleString()}`
      )}
    </button>
    <p className="mt-2 text-xs text-gray-500">
      By purchasing shares, you agree to our <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>.
    </p>
  </div>
);
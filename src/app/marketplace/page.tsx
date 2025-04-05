'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import house1 from "../../../public/houses/house1.jpg";
import house2 from "../../../public/houses/house2.jpg";
import house3 from "../../../public/houses/house3.jpg";
import house4 from "../../../public/houses/house4.jpg";
import house5 from "../../../public/houses/house5.jpg";
import house6 from "../../../public/houses/house6.jpg";
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type Property = {
  id: number;
  name: string;
  location: string;
  image: StaticImageData;
  totalShares: number;
  sharesAvailable: number;
  pricePerShare: number;
  annualReturn: number;
  propertyType: string;
  totalValueUSD: number;
};

export default function Marketplace() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 1000,
    returnMin: 0,
    propertyType: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
   
    const fetchProperties = async () => {
      setLoading(true);
     
      const mockProperties: Property[] = [
        {
          id: 1,
          name: 'Luxury Condo in Wuye',
          location: 'Abuja, FCT',
          image: house1,
          totalShares: 1000,
          sharesAvailable: 750,
          pricePerShare: 100,
          annualReturn: 8.2,
          propertyType: 'residential',
          totalValueUSD: 1000000
        },
        {
          id: 2,
          name: 'Atiku Street, Rayfield',
          location: 'Jos, PL',
          image: house2,
          totalShares: 500,
          sharesAvailable: 320,
          pricePerShare: 200,
          annualReturn: 7.5,
          propertyType: 'vacation',
          totalValueUSD: 2500000
        },
        {
          id: 3,
          name: 'Miango, Bassa',
          location: 'Jos, PL',
          image: house3,
          totalShares: 2000,
          sharesAvailable: 1400,
          pricePerShare: 50,
          annualReturn: 9.1,
          propertyType: 'residential',
          totalValueUSD: 3500000
        },
        {
          id: 4,
          name: 'Commercial Office Space',
          location: 'Port-Harcourt, RV',
          image: house4,
          totalShares: 5000,
          sharesAvailable: 4200,
          pricePerShare: 40,
          annualReturn: 10.2,
          propertyType: 'commercial',
          totalValueUSD: 4800000
        },
        {
          id: 5,
          name: 'Historic Brownstone',
          location: 'Boston, MA',
          image: house5,
          totalShares: 800,
          sharesAvailable: 560,
          pricePerShare: 125,
          annualReturn: 7.8,
          propertyType: 'residential',
          totalValueUSD: 1850000
        },
        {
          id: 6,
          name: 'Mountain Retreat',
          location: 'Madrid, SP',
          image: house6,
          totalShares: 600,
          sharesAvailable: 420,
          pricePerShare: 150,
          annualReturn: 8.5,
          propertyType: 'vacation',
          totalValueUSD: 1250000
        }
      ];
      
      setProperties(mockProperties);
      setLoading(false);
    };
    
    fetchProperties();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredProperties = properties.filter(property => {
   
    const matchesPrice = property.pricePerShare >= filters.priceMin && 
                         (filters.priceMax === 0 || property.pricePerShare <= filters.priceMax);
    const matchesReturn = property.annualReturn >= filters.returnMin;
    const matchesType = filters.propertyType === 'all' || property.propertyType === filters.propertyType;
    const matchesSearch = searchQuery === '' || 
                         property.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesPrice && matchesReturn && matchesType && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Marketplace - Ownly</title>
        <meta name="description" content="Browse and purchase shares of premium real estate properties" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Property Marketplace</h1>
              <p className="mt-1 text-sm text-gray-500">
                {filteredProperties.length} properties available
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-gray-400" />
                Filter
              </button>
            </div>
          </div>

          {filterOpen && (
            <div className="mt-4 bg-white p-4 rounded-md shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="priceMin" className="block text-sm font-medium text-gray-700">
                    Min Price ($)
                  </label>
                  <input
                    type="number"
                    id="priceMin"
                    name="priceMin"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={filters.priceMin}
                    onChange={handleFilterChange}
                  />
                </div>
                <div>
                  <label htmlFor="priceMax" className="block text-sm font-medium text-gray-700">
                    Max Price ($)
                  </label>
                  <input
                    type="number"
                    id="priceMax"
                    name="priceMax"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={filters.priceMax}
                    onChange={handleFilterChange}
                  />
                </div>
                <div>
                  <label htmlFor="returnMin" className="block text-sm font-medium text-gray-700">
                    Min Annual Return (%)
                  </label>
                  <input
                    type="number"
                    id="returnMin"
                    name="returnMin"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={filters.returnMin}
                    onChange={handleFilterChange}
                  />
                </div>
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={filters.propertyType}
                    onChange={handleFilterChange}
                  >
                    <option value="all">All Types</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="vacation">Vacation</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="mt-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((property) => (
               <Link href={`/properties/${property.id}`} key={property.id}>
                  <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image
                        src={property.image}
                        alt={property.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{property.name}</h3>
                          <p className="text-sm text-gray-500">{property.location}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {property.propertyType}
                        </span>
                      </div>
                      
                      <div className="mt-4 flex justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Price per share</p>
                          <p className="text-lg font-medium text-gray-900">${property.pricePerShare}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Annual return</p>
                          <p className="text-lg font-medium text-indigo-600">{property.annualReturn}%</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 rounded-full h-2" 
                            style={{ width: `${((property.totalShares - property.sharesAvailable) / property.totalShares) * 100}%` }}
                          ></div>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {property.sharesAvailable.toLocaleString()} of {property.totalShares.toLocaleString()} shares available
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">Total property value</p>
                        <p className="text-base font-medium text-gray-900">${property.totalValueUSD.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filteredProperties.length === 0 && !loading && (
            <div className="mt-8 text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
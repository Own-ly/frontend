'use client'

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { PlusIcon, PencilIcon, TrashIcon, CameraIcon } from '@heroicons/react/24/outline';

type PropertyListing = {
  id: number;
  name: string;
  location: string;
  image: string;
  totalShares: number;
  sharesAvailable: number;
  pricePerShare: number;
  propertyType: string;
  status: 'active' | 'pending' | 'sold';
  createdAt: string;
};

export default function SellerProfile() {
  const [activeTab, setActiveTab] = useState('listings');
  const [myListings, setMyListings] = useState<PropertyListing[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const router = useRouter();
  
  // Form state for new property
  const [newProperty, setNewProperty] = useState({
    name: '',
    location: '',
    description: '',
    totalShares: 1000,
    pricePerShare: 100,
    propertyType: 'residential',
    annualReturn: 8,
    images: [] as File[]
  });

  useEffect(() => {
    // Fetch seller's listings from API
    const fetchMyListings = async () => {
      setLoading(true);
      // Mock data for demonstration
      const mockListings: PropertyListing[] = [
        {
          id: 1,
          name: 'Luxury Condo in Downtown',
          location: 'New York, NY',
          image: 'https://via.placeholder.com/400x300',
          totalShares: 1000,
          sharesAvailable: 750,
          pricePerShare: 100,
          propertyType: 'residential',
          status: 'active',
          createdAt: '2025-03-01'
        },
        {
          id: 2,
          name: 'Commercial Office Space',
          location: 'San Francisco, CA',
          image: 'https://via.placeholder.com/400x300',
          totalShares: 2000,
          sharesAvailable: 1200,
          pricePerShare: 75,
          propertyType: 'commercial',
          status: 'active',
          createdAt: '2025-02-15'
        },
        {
          id: 3,
          name: 'Beachfront Property',
          location: 'Miami, FL',
          image: 'https://via.placeholder.com/400x300',
          totalShares: 500,
          sharesAvailable: 0,
          pricePerShare: 200,
          propertyType: 'vacation',
          status: 'sold',
          createdAt: '2025-01-20'
        }
      ];
      
      setMyListings(mockListings);
      setLoading(false);
    };
    
    fetchMyListings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProperty({
      ...newProperty,
      [name]: value
    });
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProperty({
      ...newProperty,
      [name]: parseFloat(value)
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      setNewProperty({
        ...newProperty,
        images: [...newProperty.images, file]
      });
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setUploadedImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Creating property:', newProperty);
    
    const newListing: PropertyListing = {
      id: Math.floor(Math.random() * 1000),
      name: newProperty.name,
      location: newProperty.location,
      image: uploadedImage || 'https://via.placeholder.com/400x300',
      totalShares: newProperty.totalShares,
      sharesAvailable: newProperty.totalShares,
      pricePerShare: newProperty.pricePerShare,
      propertyType: newProperty.propertyType,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setMyListings([newListing, ...myListings]);
    setIsModalOpen(false);
    
    // Reset form
    setNewProperty({
      name: '',
      location: '',
      description: '',
      totalShares: 1000,
      pricePerShare: 100,
      propertyType: 'residential',
      annualReturn: 8,
      images: []
    });
    setUploadedImage(null);
  };

  const removeListing = (id: number) => {
    setMyListings(myListings.filter(listing => listing.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Seller Dashboard - Ownly</title>
        <meta name="description" content="Manage your property listings and track sales" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your property listings and track sales</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setIsModalOpen(true)}
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                List New Property
              </button>
            </div>
            
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      className={`${
                        activeTab === 'listings' 
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                      onClick={() => setActiveTab('listings')}
                    >
                      My Listings
                    </button>
                    <button
                      className={`${
                        activeTab === 'sales' 
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                      onClick={() => setActiveTab('sales')}
                    >
                      Sales & Revenue
                    </button>
                    <button
                      className={`${
                        activeTab === 'settings' 
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                      onClick={() => setActiveTab('settings')}
                    >
                      Account Settings
                    </button>
                  </nav>
                </div>
              </div>
              
              {activeTab === 'listings' && (
                <div className="px-4 py-5 sm:px-6">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Property
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Shares
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Created
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Actions</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {myListings.map((listing) => (
                            <tr key={listing.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 relative">
                                    <Image
                                      src="/api/placeholder/100/100"
                                      alt={listing.name}
                                      fill
                                      className="rounded-md object-cover"
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{listing.name}</div>
                                    <div className="text-sm text-gray-500">{listing.location}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  listing.status === 'active' ? 'bg-green-100 text-green-800' :
                                  listing.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {listing.sharesAvailable} / {listing.totalShares}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${listing.pricePerShare}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {listing.createdAt}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  type="button"
                                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                                  onClick={() => console.log('Edit', listing.id)}
                                >
                                  <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                  type="button"
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => removeListing(listing.id)}
                                >
                                  <TrashIcon className="h-5 w-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  
                  {myListings.length === 0 && !loading && (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium text-gray-900">No properties listed yet</h3>
                      <p className="mt-2 text-sm text-gray-500">Create your first property listing to get started</p>
                      <div className="mt-6">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <PlusIcon className="h-5 w-5 mr-2" />
                          List New Property
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'sales' && (
                <div className="px-4 py-5 sm:px-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">
                                Total Revenue
                              </dt>
                              <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">
                                  $24,567
                                </div>
                                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                  <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span className="sr-only">Increased by</span>
                                  8.2%
                                </div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">
                                Shares Sold
                              </dt>
                              <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">
                                  1,550
                                </div>
                                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                  <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span className="sr-only">Increased by</span>
                                  12.5%
                                </div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">
                                Total Investors
                              </dt>
                              <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900">
                                  328
                                </div>
                                <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                  <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                  </svg>
                                  <span className="sr-only">Increased by</span>
                                  5.3%
                                </div>
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Transactions</h3>
                    <div className="mt-4 overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Investor
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Property
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Shares
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {[1, 2, 3, 4, 5].map((item) => (
                            <tr key={item}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">Investor #{item}</div>
                                <div className="text-sm text-gray-500">user{item}@example.com</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item % 3 === 0 ? 'Beachfront Property' : item % 2 === 0 ? 'Commercial Office Space' : 'Luxury Condo in Downtown'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item * 10}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${item * 10 * (item % 3 === 0 ? 200 : item % 2 === 0 ? 75 : 100)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {`2025-03-${30 - item}`}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div className="px-4 py-5 sm:px-6">
                  <div className="max-w-3xl mx-auto">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Account Settings</h3>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            defaultValue="John"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            defaultValue="Doe"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <div className="mt-1">
                          <select
                            id="country"
                            name="country"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                          Photo
                        </label>
                        <div className="mt-2 flex items-center">
                          <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                          <button
                            type="button"
                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Change
                          </button>
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                          About
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                            defaultValue={"Property developer with 10+ years of experience in residential and commercial real estate."}
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Brief description for your profile.</p>
                      </div>
                      
                      <div className="sm:col-span-6">
                        <div className="mt-6 flex justify-end">
                          <button
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal for creating new property */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Create New Property Listing
                  </h3>
                  <div className="mt-2">
                    <form onSubmit={handleCreateProperty}>
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Property Name
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              required
                              value={newProperty.name}
                              onChange={handleInputChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              name="location"
                              id="location"
                              required
                              value={newProperty.location}
                              onChange={handleInputChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="description"
                              name="description"
                              rows={3}
                              value={newProperty.description}
                              onChange={handleInputChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
                            Property Type
                          </label>
                          <div className="mt-1">
                            <select
                              id="propertyType"
                              name="propertyType"
                              value={newProperty.propertyType}
                              onChange={handleInputChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                              <option value="residential">Residential</option>
                              <option value="commercial">Commercial</option>
                              <option value="industrial">Industrial</option>
                              <option value="vacation">Vacation</option>
                            </select>
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="totalShares" className="block text-sm font-medium text-gray-700">
                            Total Shares
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              name="totalShares"
                              id="totalShares"
                              min="1"
                              required
                              value={newProperty.totalShares}
                              onChange={handleNumberInputChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="pricePerShare" className="block text-sm font-medium text-gray-700">
                            Price Per Share ($)
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              name="pricePerShare"
                              id="pricePerShare"
                              min="0.01"
                              step="0.01"
                              required
                              value={newProperty.pricePerShare}
                              onChange={handleNumberInputChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="annualReturn" className="block text-sm font-medium text-gray-700">
                            Expected Annual Return (%)
                          </label>
                          <div className="mt-1">
                            <input
                              type="number"
                              name="annualReturn"
                              id="annualReturn"
                              min="0"
                              step="0.1"
                              value={newProperty.annualReturn}
                              onChange={handleNumberInputChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-6">
                          <label className="block text-sm font-medium text-gray-700">Property Photos</label>
                          <div className="mt-1 flex items-center">
                            {uploadedImage ? (
                              <div className="relative h-32 w-32 rounded-md overflow-hidden bg-gray-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={uploadedImage} alt="Property preview" className="h-full w-full object-cover" />
                              </div>
                            ) : (
                              <div className="h-32 w-32 border-2 border-gray-300 border-dashed rounded-md flex items-center justify-center">
                                <CameraIcon className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                            <div className="ml-5">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageUpload} />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                        >
                          Create Listing
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
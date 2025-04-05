'use client'

import { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('properties');

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>My Portfolio - Ownly</title>
        <meta name="description" content="View your real estate investment portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your real estate investments
            </p>
          </div>

          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('properties')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'properties'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Properties
              </button>
              <button
                onClick={() => setActiveTab('rental')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'rental'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Rental Income
              </button>
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'properties' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900">Your Properties</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Portfolio content will be displayed here
                </p>
              </div>
            )}
            {activeTab === 'rental' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-900">Rental Income</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Rental income details will be displayed here
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

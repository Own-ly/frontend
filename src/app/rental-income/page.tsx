'use client'

import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function RentalIncome() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Rental Income - Ownly</title>
        <meta name="description" content="View your rental income dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Rental Income</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage your rental property income
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900">Income Overview</h2>
            <p className="mt-2 text-sm text-gray-500">
              Rental income data will be displayed here
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client'

import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Properties() {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Properties - Ownly</title>
        <meta name="description" content="Browse available properties" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Available Properties</h1>
            <p className="mt-1 text-sm text-gray-500">
              Browse and invest in premium real estate
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900">Property Name</h2>
              <p className="mt-2 text-sm text-gray-500">
                Property details will be displayed here
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

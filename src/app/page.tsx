"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import housebg from "../../public/houses/housebg.jpg";
import house1 from "../../public/houses/house1.jpg";
import house2 from "../../public/houses/house2.jpg";
import house3 from "../../public/houses/house3.jpg";
import {
  ChevronRightIcon,
  HomeModernIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";

// Define TypeScript interfaces
interface Property {
  id: number;
  name: string;
  location: string;
  image: any;
  totalShares: number;
  sharesAvailable: number;
  pricePerShare: number;
  annualReturn: number;
}

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const mockProperties: Property[] = [
        {
          id: 1,
          name: "Luxury Apartment in Lekki",
          location: "Lagos, Nigeria",
          image: house1,
          totalShares: 1000,
          sharesAvailable: 750,
          pricePerShare: 100,
          annualReturn: 8.2,
        },
        {
          id: 2,
          name: "Beachfront Villa",
          location: "Dubai Marina, UAE",
          image: house2,
          totalShares: 500,
          sharesAvailable: 320,
          pricePerShare: 200,
          annualReturn: 7.5,
        },
        {
          id: 3,
          name: "Modern Apartment Complex",
          location: "Victoria Island, Nigeria",
          image: house3,
          totalShares: 2000,
          sharesAvailable: 1400,
          pricePerShare: 50,
          annualReturn: 9.1,
        },
      ];

      setFeaturedProperties(mockProperties);
    };

    fetchProperties();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Ownly - Fractional Real Estate Ownership</title>
        <meta
          name="description"
          content="Own a piece of premium real estate with fractional ownership"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="md:flex md:items-center md:space-x-8">
              <div className="md:w-1/2">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Own real estate</span>
                  <span className="block text-indigo-600">
                    one share at a time
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
                  Ownly enables fractional property ownership, allowing you to
                  invest in premium real estate with as little as $100. Build
                  your portfolio, collect rental income, and participate in
                  property decisions.
                </p>
                <div className="mt-8 flex space-x-4">
                  <Link
                    href="/marketplace"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Explore Properties
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    href="/how-it-works"
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    How It Works
                  </Link>
                </div>
              </div>
              <div className="mt-12 md:mt-0 md:w-1/2">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  <Image
                    src={housebg}
                    alt="Property investment"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                How Ownly Works
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
                Property ownership has never been more accessible
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <HomeModernIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Browse Properties
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Explore our curated selection of premium properties
                    available for fractional ownership.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <CurrencyDollarIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Purchase Shares
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Buy as few or as many shares as you want, with complete
                    transparency and no hidden fees.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <TicketIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Receive NFT
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Get a unique NFT for your fractional ownership, providing
                    proof of ownership on the blockchain.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <UserGroupIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Earn & Participate
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    Collect rental income proportional to your shares and vote
                    on property-related decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Properties Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Featured Properties
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
                Start building your real estate portfolio today
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.map((property) => (
                <Link href={`/property/${property.id}`} key={property.id}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image
                        src={property.image}
                        alt={property.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        {property.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {property.location}
                      </p>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            Price per share
                          </p>
                          <p className="text-lg font-medium text-gray-900">
                            ${property.pricePerShare}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Annual return</p>
                          <p className="text-lg font-medium text-indigo-600">
                            {property.annualReturn}%
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 rounded-full h-2"
                            style={{
                              width: `${
                                ((property.totalShares -
                                  property.sharesAvailable) /
                                  property.totalShares) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {property.sharesAvailable} of {property.totalShares}{" "}
                          shares available
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/marketplace"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View All Properties
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

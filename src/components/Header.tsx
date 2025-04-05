'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletIcon, HomeIcon, BuildingOfficeIcon, UserIcon, BellIcon } from '@heroicons/react/24/outline';
import { useAbstraxionAccount, Abstraxion } from '@burnt-labs/abstraxion';

const Header = () => {
  const { data: account } = useAbstraxionAccount();
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();

  const connectWallet = () => {
    setShowModal(true);
  };

  const isLoggedIn = !!account;
  const walletAddress = account?.bech32Address 
    ? `${account.bech32Address.slice(0, 6)}...${account.bech32Address.slice(-4)}` 
    : '';

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-indigo-600 font-bold text-xl">Ownly</span>
              </Link>
              <nav className="hidden md:ml-8 md:flex space-x-8">
                <Link href="/" className={`${pathname === '/' ? 'text-indigo-600 border-indigo-600' : 'text-gray-500 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 border-transparent`}>
                  <HomeIcon className="h-5 w-5 mr-1" />
                  Home
                </Link>
                <Link href="/marketplace" className={`${pathname === '/marketplace' ? 'text-indigo-600 border-indigo-600' : 'text-gray-500 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 border-transparent`}>
                  <BuildingOfficeIcon className="h-5 w-5 mr-1" />
                  Marketplace
                </Link>
                {isLoggedIn && (
                  <Link href="/profile" className={`${pathname === '/profile' ? 'text-indigo-600 border-indigo-600' : 'text-gray-500 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 border-transparent`}>
                    <UserIcon className="h-5 w-5 mr-1" />
                    Profile
                  </Link>
                )}
              </nav>
            </div>

            <div className="flex items-center">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Link href="/notifications" className="text-gray-500 hover:text-gray-700">
                    <BellIcon className="h-6 w-6" />
                  </Link>
                  <div className="flex items-center text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-full">
                    <WalletIcon className="h-4 w-4 mr-1" />
                    <span>{walletAddress}</span>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={connectWallet}
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <WalletIcon className="h-5 w-5 mr-1" />
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {showModal && (
        <Abstraxion 
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Header;
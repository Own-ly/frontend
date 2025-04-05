'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletIcon, HomeIcon, BuildingOfficeIcon, UserIcon, BellIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAbstraxionAccount, useModal, Abstraxion } from '@burnt-labs/abstraxion';
import { Button } from '@burnt-labs/ui';

const Header = () => {
  const { data: account } = useAbstraxionAccount();
  const [, setShow] = useModal();
  const pathname = usePathname();
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  const isLoggedIn = !!account?.bech32Address;
  const walletAddress = account?.bech32Address 
    ? `${account.bech32Address.slice(0, 6)}...${account.bech32Address.slice(-4)}` 
    : '';

  const handleDisconnect = () => {
    // Abstraxion handles disconnection automatically when modal is closed
    setShowDisconnectModal(false);
    setShow(true); // Reopen connection modal to allow switching accounts
  };

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
                  <button 
                    onClick={() => setShowDisconnectModal(true)}
                    className="flex items-center text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <WalletIcon className="h-4 w-4 mr-1" />
                    <span>{walletAddress}</span>
                  </button>
                </div>
              ) : (
                <Button 
                  onClick={() => setShow(true)}
                  structure="base"
                  className="ml-4"
                >
                  <WalletIcon className="h-5 w-5 mr-1" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Wallet Connection Modal */}
      <Abstraxion onClose={() => setShow(false)} />

      {/* Disconnect Confirmation Modal */}
      {showDisconnectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Disconnect Wallet</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to disconnect your wallet?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDisconnectModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 flex items-center"
              >
                <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-2" />
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

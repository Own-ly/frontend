import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">About Ownly</h3>
            <p className="mt-2 text-sm text-gray-500">
              Fractional real estate ownership platform. Invest in properties with as little as $100.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Resources</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/how-it-works" className="text-sm text-gray-500 hover:text-indigo-600">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-500 hover:text-indigo-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-sm text-gray-500 hover:text-indigo-600">
                  Legal Documentation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Connect</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-indigo-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com/ownly" className="text-sm text-gray-500 hover:text-indigo-600">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="https://discord.gg/ownly" className="text-sm text-gray-500 hover:text-indigo-600">
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Ownly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
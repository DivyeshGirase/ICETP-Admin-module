'use client'; // Mark the component as client-side

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  // Ensure a client-side only layout by wrapping conditional logic with useEffect or similar hooks
  return (
    <>
      <html lang="en">
        <body style={{ margin: 0, padding: 0, height: '100vh' }}> {/* Full height */}
          {/* Only show Topbar if we're not on the login page */}
          {!isLoginPage && <Topbar />}
          <div
            style={{
              display: 'flex', // Flexbox layout
              height: '100vh', // Full viewport height
              flexDirection: 'row', // Ensure row layout for sidebar and content
            }}
          >
            {/* Show Sidebar if we're not on the login page */}
            {!isLoginPage && (
              <div style={{ width: '250px', backgroundColor: '#333', color: '#fff', height: '100vh' }}>
                <Sidebar />
              </div>
            )}
            <main
              style={{
                flex: 1, // Take remaining space
                overflowY: 'auto', // Allow scrolling if needed
                padding: '20px',
                marginLeft: isLoginPage ? 0 : '10px', // Adjust margin when sidebar is shown
              }}
            >
              {children}
            </main>
          </div>
        </body>
      </html>
    </>
  );
};

export default Layout;

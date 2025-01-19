// app/layout.tsx
import React, { ReactNode } from 'react'; // Import ReactNode type
import { usePathname } from 'next/navigation'; // Use usePathname from next/navigation
import Topbar from '../components/Topbar';

// Add the "use client" directive if this is a client-side component
'use client';

interface LayoutProps {
  children: ReactNode; // Explicitly type children as ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  // Check if the current path is "/login" to avoid showing Topbar there
  const isLoginPage = pathname === '/login';

  return (
    <div>
      {/* Only show Topbar if we're not on the login page */}
      {!isLoginPage && <Topbar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;

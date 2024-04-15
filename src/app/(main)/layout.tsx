import { FC, ReactNode } from 'react';
import Navbar from '@/components/main/Navbar';
import { SessionProvider } from 'next-auth/react';

import { Footer } from '@/components/main/Footer';
import { ToastContainer } from 'react-toastify';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Navbar />

      <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable={false}
        theme="dark"
      />

      {children}

      <Footer />
    </SessionProvider>
  );
};

export default Layout;

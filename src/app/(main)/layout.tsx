import { FC, ReactNode } from 'react';
import Navbar from '@/components/main/Navbar';
import { SessionProvider } from 'next-auth/react';
import { BreadCrumbs } from '@/components/ui/bread-crumbs';
import Footer from '@/components/main/Footer';
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

      <div className="container py-5">
        <BreadCrumbs />
      </div>

      {children}

      <Footer />
    </SessionProvider>
  );
};

export default Layout;

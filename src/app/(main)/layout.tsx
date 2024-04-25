import dynamic from 'next/dynamic';

import { FC, ReactNode } from 'react';
import { NavbarComponent } from './_components/main/Navbar';
import { SessionProvider } from 'next-auth/react';

const Footer = dynamic(() =>
  import('./_components/main/Footer').then((mod) => mod.Footer)
);

const ToastContainer = dynamic(() =>
  import('react-toastify').then((mod) => mod.ToastContainer)
);

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <SessionProvider>
      <NavbarComponent SatoshiFont={''} />

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

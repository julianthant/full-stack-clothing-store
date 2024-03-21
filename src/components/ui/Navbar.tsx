import NavbarComponent from './NavbarComponent';
import { auth } from '@/lib/authentication/auth';

const Navbar = async ({}) => {
  const session = await auth();
  const isLoggedIn = !!session;

  return <NavbarComponent session={session} status={isLoggedIn} />;
};

export default Navbar;

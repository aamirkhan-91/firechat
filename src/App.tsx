import clsx from 'clsx';
import Auth from 'components/Auth';
import Chat from 'components/Chat';
import Notifications from 'components/core/Notifications';
import { onAuthStateChanged } from 'firebase/auth';
import LoadingIcon from 'icons/LoadingIcon';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { auth } from 'services/auth';
import { useStore } from 'store';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false);

      if (user) {
        const { emailVerified } = user;

        if (emailVerified) {
          setIsAuthenticated(true, {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          });
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div
        className={clsx(
          'h-full bg-blue transition-colors duration-300 xl:p-12',
          {
            'bg-blue': !isAuthenticated,
            'bg-[#757575]': isAuthenticated,
          }
        )}
      >
        {isLoading ? (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
            <LoadingIcon className='animate-spin text-white' size='xxl' />
          </div>
        ) : (
          <Routes>
            <Route path='auth/*' element={<Auth />} />
            <Route path='/' element={<Chat />} />
          </Routes>
        )}
      </div>
      <Notifications />
    </>
  );
};

export default App;

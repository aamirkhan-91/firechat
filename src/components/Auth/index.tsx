import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';

const Auth: FC = () => {
  const location = useLocation();

  return (
    <div className='mx-auto flex h-full w-full max-w-[1400px] items-center justify-center'>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route
            path='*'
            element={
              <motion.div initial={false} exit='undefined'>
                <Navigate to='login' replace />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default Auth;

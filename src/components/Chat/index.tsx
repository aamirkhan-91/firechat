import { AnimatePresence } from 'framer-motion';
import useBreakpoint from 'hooks/useBreakpoint';
import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from 'store';
import { motion, Variants } from 'framer-motion';

import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import SidebarTrigger from 'components/core/SidebarTrigger';

const Chat: FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  const isMd = useBreakpoint('md');

  useEffect(() => {
    if (isMd) {
      setIsSidebarVisible(false);
    } else {
      setIsSidebarVisible(true);
    }
  }, [isMd]);

  if (!isAuthenticated) return <Navigate to='/auth/login' />;

  return (
    <div className='mx-auto flex h-full w-full max-w-[1400px] items-center justify-center shadow-lg'>
      <motion.div
        animate={isSidebarVisible ? 'open' : 'closed'}
        className='relative flex h-full w-full overflow-hidden rounded-md'
      >
        <SidebarTrigger
          animated
          size='md'
          className='absolute top-[20px] left-[5px]'
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        />
        <Sidebar
          visible={isSidebarVisible}
          key='sidebar'
          onClickSidebarTrigger={() => setIsSidebarVisible(!isSidebarVisible)}
          onClickContact={() => {
            if (isMd) {
              setIsSidebarVisible(false);
            }
          }}
        />
        <ChatWindow key='window' />
      </motion.div>
    </div>
  );
};

export default Chat;

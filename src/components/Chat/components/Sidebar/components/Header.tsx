import SidebarTrigger from 'components/core/SidebarTrigger';
import LogoutIcon from 'icons/LogoutIcon';
import pp from 'images/pp.png';
import { FC } from 'react';
import { logout } from 'services/auth';
import { useStore } from 'store';

type Props = {
  onClickSidebarTrigger: () => void;
};

const Header: FC<Props> = ({ onClickSidebarTrigger }) => {
  const user = useStore((state) => state.user);

  const image = (
    <img
      className='mr-4 h-[50px] w-[50px] rounded-full'
      src={user && user.photoURL ? user.photoURL : pp}
      alt={(user && user.displayName) as string}
    />
  );

  return (
    <header className='flex flex-shrink-0 flex-grow-0 basis-auto items-center justify-start border-b border-solid border-border bg-[#eee] p-3 pr-1 pl-1 md:pl-3'>
      <SidebarTrigger className='md:hidden' onClick={onClickSidebarTrigger} />
      {image}
      {user ? (
        <p className='font-bold capitalize text-primary'>{user.displayName}</p>
      ) : null}
      <div></div>
      <div className='ml-auto flex items-center space-x-1'>
        <button
          className='rounded-full p-2 text-secondary transition-colors duration-200 hover:bg-[#00000010]'
          onClick={logout}
        >
          <LogoutIcon size='md' />
        </button>
      </div>
    </header>
  );
};

export default Header;

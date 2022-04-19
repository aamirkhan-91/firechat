import { Variants, motion } from 'framer-motion';
import pp from 'images/pp.png';
import { FC } from 'react';
import { Contact } from 'types/chat';

const States: Variants = {
  closed: {
    marginLeft: '25px',
    transition: {
      delay: 0.3,
    },
  },
  open: {
    marginLeft: 0,
  },
};

type Props = {
  contact: Contact;
};

// const Header: FC<Props> = ({ contact, viewContactDetails, toggleSidebar }) => {
const Header: FC<Props> = ({ contact }) => {
  return (
    <header className='flex w-full items-center justify-start border-b border-solid border-border bg-[#eee] p-3'>
      <motion.img
        variants={States}
        src={contact.photoURL || pp}
        className='mr-2 h-[50px] w-[50px] cursor-pointer rounded-full'
        alt={contact.displayName}
        // onClick={viewContactDetails}
      />
      <h3 className='font-bold text-primary'>{contact.displayName}</h3>
      {/* <div>
        <SearchIcon />
        <PaperClipIcon />
        <Dropdown iconName='fa-ellipsis-v'>
          <span>Contact Info</span>
          <span>Clear Messages</span>
          <span>Delete Chat</span>
        </Dropdown>
      </div> */}
    </header>
  );
};

// const mapDispatchToProps = (dispatch) => ({
//   viewContactDetails: () =>
//     dispatch({ type: actions.VIEW_CONTACT_DETAILS, view: true }),
//   toggleSidebar: () => dispatch({ type: actions.SET_SIDEBAR_VISIBLE }),
// });

// export default connect(null, mapDispatchToProps)(header);

export default Header;
1
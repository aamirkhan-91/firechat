import clsx from 'clsx';
import { Variants, motion } from 'framer-motion';
import MenuIcon from 'icons/MenuIcon';
import { FC } from 'react';

type Props = {
  animated?: boolean;
  onClick: () => void;
  className?: string;
  size?: 'md' | 'lg';
};

const States: Variants = {
  open: { scale: 0, opacity: 0 },
  closed: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
};

const SidebarTrigger: FC<Props> = ({
  animated = false,
  size = 'md',
  className,
  onClick,
}) => {
  if (animated) {
    return (
      <motion.button
        variants={States}
        className={clsx(
          'rounded-full p-1 text-secondary transition-colors duration-200 hover:bg-[#00000010]',
          className
        )}
        onClick={onClick}
      >
        <MenuIcon size={size} />
      </motion.button>
    );
  } else {
    return (
      <button
        className={clsx(
          'rounded-full p-1 text-secondary transition-colors duration-200 hover:bg-[#00000010]',
          className
        )}
        onClick={onClick}
      >
        <MenuIcon size={size} />
      </button>
    );
  }
};

export default SidebarTrigger;

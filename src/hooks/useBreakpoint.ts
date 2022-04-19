import { useEffect, useState } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

const breakpointSizes: { [key in Breakpoint]: number } = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export default (breakpoint: Breakpoint) => {
  const [isBreakpointActive, setIsBreakpointActive] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= breakpointSizes[breakpoint]) {
      setIsBreakpointActive(true);
    } else {
      setIsBreakpointActive(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= breakpointSizes[breakpoint]) {
      setIsBreakpointActive(true);
    } else {
      setIsBreakpointActive(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isBreakpointActive;
};

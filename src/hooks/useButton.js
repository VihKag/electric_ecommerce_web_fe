
import { useEffect, useRef } from 'react';

const useButton = () => {
  const buttonRef = useRef(null);

  const handleMouseDown = (event) => {
    if (!buttonRef.current.contains(event.target)) {
      buttonRef.current.classList.add('text-red-500');
      buttonRef.current.classList.add('border-red-400');
      buttonRef.current.classList.add('border');
    }
  };

  const handleFocus = () => {
    buttonRef.current.classList.remove('text-red-500');
    buttonRef.current.classList.remove('border-red-400');
    buttonRef.current.classList.remove('border');
  };

  const handleClick = () => {
    buttonRef.current.classList.remove('text-red-500');
    buttonRef.current.classList.remove('border-red-400');
    buttonRef.current.classList.remove('border');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return {
    buttonRef,
    handleFocus,
    handleClick,
  };
};

export default useButton;

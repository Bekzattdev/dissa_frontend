import React from 'react';

type LabelProps = {
  children: React.ReactNode;
  isActive?: boolean;
};

const Label = ({ children, isActive = false }: LabelProps) => {
  return (
    <label className={`
      w-auto h-[44px] !px-4 !py-2 gap-2 text-sm flex justify-center items-center rounded-full
      ${isActive 
        ? 'bg-purple-500 text-white' 
        : 'bg-white text-[#475569]'}
    `}>
      {children}
    </label>
  );
};
export default Label;
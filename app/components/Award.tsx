'use client';

import { Key, memo } from 'react';

export type PropertyAwardProps = {
  title: string;
  info: string;
  key?: Key;
};

const PropertyAward = memo(function PropertyAward(props: PropertyAwardProps) {
  return (
    <div className='flex flex-col gap-[8px]'>
      <p className='text-[14px] font-bold uppercase leading-[120%] text-lugar-blue'>
        {props.title}
      </p>
      <span className='text-[48px] font-light leading-[120%] text-lugar-dark'>{props.info}</span>
    </div>
  );
});

export default PropertyAward;

'use client';

import Image from 'next/image';
import { Key, memo } from 'react';

export type PropertyCardProps = {
  address: string;
  title: string;
  url: string;
  key?: Key;
};

const PropertyCard = memo(function PropertyCard(props: PropertyCardProps) {
  return (
    <div className='relative h-[388px] w-[350px] bg-lugar-white'>
      <Image src={props.url} alt={`${props.title} photo`} width={350} height={350} />
      <div className='absolute bottom-0 left-[30px] right-[30px] flex h-[80px] w-[290px] flex-col items-start gap-[6px] bg-lugar-white px-[18px] pb-[23px] pt-[22px] text-lugar-dark shadow-[0px_2px_18px_0px_rgba(0,0,0,0.04)]'>
        <div className='ml-[2px] text-[14px] font-bold leading-[120%]'>{props.title}</div>
        <div className='flex flex-row items-center gap-1'>
          <Image
            src={'/images/ic_outline-location-on.svg'}
            alt={'location icon'}
            width={12}
            height={12}
          />
          <span className='text-[10px] font-normal leading-[120%]'>{props.address}</span>
        </div>
      </div>
    </div>
  );
});

export default PropertyCard;

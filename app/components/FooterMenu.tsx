'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Key, memo } from 'react';

type FooterMenuTitle = { title: string };
type FooterMenuTitleImg = {
  titleImg: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};
type FooterMenuTitles = FooterMenuTitle & FooterMenuTitleImg;
type BaseFooterMenu = {
  items: Array<{
    icon?: string;
    iconAlt?: string;
    text: string;
    url?: string;
    isInnerHtml?: boolean;
  }>;
  key?: Key;
};

export type FooterMenuProps = Partial<FooterMenuTitles> & BaseFooterMenu;

const FooterMenu = memo(function FooterMenu(props: FooterMenuProps) {
  return (
    <div className='flex flex-col gap-[12px]'>
      <div className='flex h-[23px] items-center'>
        {props.titleImg ? (
          <Image
            src={props.titleImg.src}
            alt={props.titleImg.alt}
            width={props.titleImg.width}
            height={props.titleImg.height}
          />
        ) : null}
        {!props.titleImg && props.title ? (
          <p className='text-[18px] font-bold uppercase leading-[23px] text-lugar-white'>
            {props.title}
          </p>
        ) : null}
      </div>
      {props.items.map((item, index) => (
        <div key={index} className='flex flex-row items-start gap-[8px] text-lugar-gray'>
          {item.icon && item.iconAlt ? (
            <Image
              className='relative top-[2px]'
              src={item.icon}
              alt={item.iconAlt}
              width={14}
              height={14}
            />
          ) : null}
          {item.url ? (
            item.isInnerHtml ? (
              <Link
                href={item.url}
                className='text-[14px] font-normal leading-[18px]'
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            ) : (
              <Link href={item.url} className='text-[14px] font-normal leading-[18px]'>
                {item.text}
              </Link>
            )
          ) : (
            <span className='text-[14px] font-normal leading-[18px]'>{item.text}</span>
          )}
        </div>
      ))}
    </div>
  );
});

export default FooterMenu;

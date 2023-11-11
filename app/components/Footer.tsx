'use client';

import { memo } from 'react';
import { MenuId } from '../models/menu.model';
import FooterMenu, { FooterMenuProps } from './FooterMenu';

export type FooterProps = {
  left: FooterMenuProps;
  right: FooterMenuProps[];
};

const Footer = memo(function Footer(props: FooterProps) {
  return (
    <footer
      id={MenuId.CONTACT}
      className='flex min-h-[400px] flex-row justify-center bg-lugar-dark'
    >
      <div className='mb-[45px] mt-[90px] flex w-full max-w-[1110px]'>
        <div className='flex w-[255px] flex-col justify-between'>
          <FooterMenu {...props.left} />
          <span className='text-[12px] font-normal leading-[15px] text-lugar-gray'>
            {'Copyright @ 2022 Lugar Inc.'}
          </span>
        </div>
        <div className='ml-[315px] flex flex-row gap-[76px]'>
          {props.right.map((menu, index) => (
            <FooterMenu key={index} {...menu} />
          ))}
        </div>
      </div>
    </footer>
  );
});

export default Footer;

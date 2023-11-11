'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

export interface HeaderMenu {
  id: string;
  title: string;
  url: string;
}

export type HeaderProps = {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  menus: HeaderMenu[];
  className?: string;
};

const Header = memo(function Header(props: HeaderProps) {
  return (
    <header className='absolute top-[54.5px] flex w-full items-center justify-center'>
      <nav className='flex w-full max-w-[1110px] flex-row justify-between'>
        <Image
          src={props.logo.src}
          alt={props.logo.alt}
          width={props.logo.width}
          height={props.logo.height}
        />
        <ul className='flex flex-row gap-[70px]'>
          {props.menus.map((menu) => (
            <li
              key={menu.id}
              className='whitespace-nowrap text-[14px] uppercase leading-[18px] text-lugar-dark'
            >
              <Link href={menu.url}>{menu.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
});

export default Header;

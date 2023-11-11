'use client';

import { useQuery } from '@apollo/client';
import Image from 'next/image';
import { useState } from 'react';

import Link from 'next/link';
import { GET_PROPERTIES } from './apis/properties.api';
import PropertyAward from './components/Award';
import Footer, { FooterProps } from './components/Footer';
import Header, { HeaderProps } from './components/Header';
import PropertyCard from './components/PropertyCard';
import { MenuId } from './models/menu.model';
import { IPropertiesResponse, IPropertyCategory } from './models/properties.model';

const headerConfig: HeaderProps = {
  logo: {
    src: '/images/Lugar Logo black.svg',
    alt: 'black lugar logo',
    width: 109.2,
    height: 16.79,
  },
  menus: [
    {
      id: MenuId.HOME,
      title: 'Home',
      url: `#${MenuId.HOME}`,
    },
    {
      id: MenuId.ABOUT,
      title: 'About',
      url: `#${MenuId.ABOUT}`,
    },
    {
      id: MenuId.PROJECTS,
      title: 'Projects',
      url: `#${MenuId.PROJECTS}`,
    },
    {
      id: MenuId.CONTACT,
      title: 'Contact',
      url: `#${MenuId.CONTACT}`,
    },
  ],
};
const footerConfig: FooterProps = {
  left: {
    titleImg: {
      src: '/images/Lugar Logo white.svg',
      alt: 'white lugar logo',
      width: 94.72,
      height: 14.56,
    },
    items: [
      {
        text: '2118 Thornridge Cir.<br/>Dubai, UAE 35624',
        icon: '/images/ic_round-location-on.svg',
        iconAlt: 'location icon',
        url: 'https://maps.google.com/?q=2118 Thornridge Cir. Dubai, UAE 35624',
        isInnerHtml: true,
      },
      {
        text: '+33 415 65356 - 9',
        icon: '/images/ic_baseline-phone.svg',
        iconAlt: 'phone icon',
        url: 'tel:+3341565356',
      },
      {
        text: 'contact@lugar.com',
        icon: '/images/ic_baseline-email.svg',
        iconAlt: 'email icon',
        url: 'mailto:contact@lugar.com',
      },
    ],
  },
  right: [
    {
      title: 'Quick links',
      items: [
        {
          text: 'Home',
          url: `#${MenuId.HOME}`,
        },
        {
          text: 'About',
          url: `#${MenuId.ABOUT}`,
        },
        {
          text: 'Project',
          url: `#${MenuId.PROJECTS}`,
        },
        {
          text: 'Contact',
          url: `#${MenuId.CONTACT}`,
        },
      ],
    },
    {
      title: 'Legal Links',
      items: [
        {
          text: 'Terms',
        },
        {
          text: 'Conditions',
        },
        {
          text: 'Policy',
        },
      ],
    },
    {
      title: 'Social media',
      items: [
        {
          text: 'Facebook',
        },
        {
          text: 'Twitter',
        },
        {
          text: 'YouTube',
        },
        {
          text: 'LinkedIn',
        },
      ],
    },
  ],
};
const categories = ['All categories', ...Object.values(IPropertyCategory)];
const awards = [
  {
    label: 'Previous projects',
    value: '34+',
  },
  {
    label: 'years experience',
    value: '20y',
  },
  {
    label: 'Ongoing projects',
    value: '12',
  },
];

const initCategory = 0;
const initOffset = 0;
const initLimit = 3;

export default function Landing() {
  const [idxCategory, setIdxCategory] = useState<number>(initCategory);
  const { loading, error, data, fetchMore, refetch } = useQuery<IPropertiesResponse>(
    GET_PROPERTIES,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        offset: initOffset,
        limit: initLimit,
        category: initCategory ? categories[initCategory] : null,
      },
    },
  );

  const handleChangeCategory = (newCategory: IPropertyCategory) => {
    const _newIdxCategory = categories.findIndex((item) => item === newCategory);
    setIdxCategory(_newIdxCategory);
    refetch({
      offset: initOffset,
      category: _newIdxCategory ? categories[_newIdxCategory] : null,
    });
  };

  const handleLoadMore = () => {
    const newOffset = data?.propertyCollection.items.length!;
    fetchMore({
      variables: {
        offset: newOffset,
      },
    });
  };

  return (
    // TODO: Pending optimise responsive design on screens smaller than 1280vw
    <main className='relative flex w-full min-w-[1280px] flex-col overflow-y-auto overflow-x-hidden'>
      <Header {...headerConfig} />
      {/* TODO: Move section to funcional comp */}
      <section
        id={MenuId.HOME}
        className='flex min-h-[800px] flex-col items-center justify-center bg-lugar-blue bg-house-1 bg-right-bottom bg-no-repeat'
      >
        <div className='flex w-full max-w-[1110px] items-start'>
          <div className='flex w-[635px] flex-col text-lugar-dark'>
            <h1 className='text-[90px]  font-bold leading-[120%] text-lugar-dark'>
              {'A home is built with love and dreams'}
            </h1>
            <p className='mt-[18px] text-[18px] leading-[120%]'>
              {'Real estate farm that makes your dreams true'}
            </p>
            <div className='mt-[32px] flex flex-row gap-[30px]'>
              <Link
                href={`#${MenuId.PROJECTS}`}
                className='flex items-center justify-center bg-lugar-dark px-[24px] py-[18px] text-[14px] font-normal leading-[120%] text-lugar-white'
              >
                {'Our projects'}
              </Link>
              <Link
                href={`#${MenuId.CONTACT}`}
                className='bg-transparent flex items-center justify-center border border-solid border-lugar-dark px-[24px] py-[18px] text-[14px] font-normal leading-[120%] text-lugar-dark'
              >
                {'Contact us'}
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* TODO: Move section to funcional comp */}
      {!error && !!data?.propertyCollection.items.length && (
        <section id={MenuId.PROJECTS} className='w-full bg-lugar-white'>
          <div className='mx-auto mb-[48px] mt-[150px] flex w-full max-w-[1110px] flex-col text-lugar-dark'>
            <h2 className='max-w-[540px] text-[48px] font-bold leading-[120%] text-lugar-dark'>
              {'Properties'}
            </h2>
            <p className='mt-[12px] max-w-[540px] text-[18px] font-normal leading-[120%] text-lugar-gray'>
              {'Turpis facilisis tempor pulvinar in lobortis ornare magna.'}
            </p>
            <div className='mt-[30px] flex flex-col'>
              <div className='mb-[10px] flex flex-row justify-end'>
                <select
                  className='bg-white cursor-pointer appearance-none whitespace-nowrap py-2 text-lugar-dark'
                  value={categories[idxCategory]}
                  disabled={loading}
                  onChange={($event) =>
                    handleChangeCategory($event.target.value as IPropertyCategory)
                  }
                >
                  {categories.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className='grid grid-cols-3 gap-[30px]'>
                {data?.propertyCollection.items.map((property) => (
                  <PropertyCard
                    key={property.id}
                    address={property.address}
                    title={property.title}
                    url={property.image.url}
                  />
                ))}
              </div>
              {data?.propertyCollection.total > data?.propertyCollection.items.length && (
                <button
                  type='button'
                  className='mx-auto mt-[32px] flex items-center justify-center bg-lugar-dark px-[24px] py-[18px] text-[14px] font-normal leading-[120%] text-lugar-white'
                  disabled={loading}
                  onClick={() => handleLoadMore()}
                >
                  {loading ? 'Loading...' : 'Load more'}
                </button>
              )}
            </div>
          </div>
        </section>
      )}
      {/* TODO: Move section to funcional comp */}
      <section
        id={MenuId.ABOUT}
        className='flex min-h-[800px] flex-col items-center justify-center'
      >
        <div className='flex w-full max-w-[1110px] items-center'>
          <div className='h-[500px] w-[445px] flex-shrink-0'>
            <Image
              src={'/images/left bg.png'}
              alt={'white building front picture'}
              width={445}
              height={500}
            />
          </div>
          <div className='ml-[125px] flex flex-grow flex-col gap-[40px]'>
            <h2 className='max-w-[540px] text-[48px] font-bold leading-[120%] text-lugar-dark'>
              {'Award winning real estate company in Dubai'}
            </h2>
            <p className='text-[18px] font-normal leading-[120%] text-lugar-gray'>
              {
                'Semper arcu mauris aliquam lacus. Massa erat vitae ultrices pharetra scelerisque. Ipsum, turpis facilisis tempor pulvinar in lobortis ornare magna.'
              }
            </p>
            <div className='flex flex-row gap-[44px]'>
              {awards.map((item, index) => (
                <PropertyAward key={index} title={item.label} info={item.value} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer {...footerConfig} />
    </main>
  );
}

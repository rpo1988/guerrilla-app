'use client';

import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { GET_PROPERTIES } from './apis/properties.api';
import PropertyCard from './components/PropertyCard';
import { IPropertiesResponse, IPropertyCategory } from './models/properties.model';

const categories = ['All categories', ...Object.values(IPropertyCategory)];
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
    <main className='flex w-full flex-col overflow-y-auto overflow-x-hidden'>
      <section
        id='welcome'
        className='bg-lugar-blue bg-house-1 relative h-[800px] w-full bg-right-bottom bg-no-repeat'
      >
        <div className='mx-auto flex w-[1110px] items-start'>
          <div className='text-lugar-dark mt-[176px] flex w-[635px] flex-col'>
            <h1 className='text-lugar-dark  text-[90px] font-bold leading-[120%]'>
              {'A home is built with love and dreams'}
            </h1>
            <p className='mt-[18px] text-[18px] leading-[120%]'>
              {'Real estate farm that makes your dreams true'}
            </p>
            <div className='mt-[32px] flex flex-row gap-[30px]'>
              <button
                type='button'
                className='bg-lugar-dark text-lugar-white flex items-center justify-center px-[24px] py-[18px] text-[14px] font-normal leading-[120%]'
              >
                {'Our projects'}
              </button>
              <button
                type='button'
                className='border-lugar-dark text-lugar-dark flex items-center justify-center border border-solid bg-transparent px-[24px] py-[18px] text-[14px] font-normal leading-[120%]'
              >
                {'Contact us'}
              </button>
            </div>
          </div>
        </div>
      </section>
      {!error && !!data?.propertyCollection.items.length && (
        <section id='properties' className='bg-lugar-white w-full'>
          <div className='text-lugar-dark mx-auto mb-[48px] mt-[150px] flex w-[1110px] flex-col'>
            <h2 className='text-lugar-dark max-w-[540px] text-[48px] font-bold leading-[120%]'>
              {'Properties'}
            </h2>
            <p className='text-lugar-gray mt-[12px] max-w-[540px] text-[18px] font-normal leading-[120%]'>
              {'Turpis facilisis tempor pulvinar in lobortis ornare magna.'}
            </p>
            <div className='mt-[30px] flex flex-col'>
              <div className='mb-[10px] flex flex-row justify-end'>
                <select
                  className='text-lugar-dark cursor-pointer appearance-none whitespace-nowrap bg-white py-2'
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
                  className='bg-lugar-dark text-lugar-white mx-auto mt-[32px] flex items-center justify-center px-[24px] py-[18px] text-[14px] font-normal leading-[120%]'
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
      <section id='history'></section>
      <footer></footer>
    </main>
  );
}

import React, { FC } from 'react';
import { Client } from '@/features/clients';

export const ClientDetail: FC<Client> = ({ name, image, age }) => {
  return (
    <div className={'flex flex-col gap-3'}>
      <h1>Client: {name}</h1>
      <img src={image} alt={name} className={'h-20 w-20'} />
      <p>Age: {age}</p>
    </div>
  );
};

import React, { FC } from 'react';
import { Client } from '@/features/clients';
import { calculateAge } from '@/features/clients/utils/date';

export const ClientDetail: FC<Client> = ({ name, image, born, active, lastName, partners }) => {
  return (
    <div className={'flex flex-col gap-3'}>
      <h1>
        Client: {name} {lastName}
      </h1>
      <img src={image} alt={name} className={'h-20 w-20'} />
      <p>Born: {(born as Date).toLocaleDateString()}</p>
      <p>Age: {calculateAge(born as Date)}</p>
      <p>Active: {active ? 'Yes' : 'No'}</p>
      <p>Partners: {partners}</p>
    </div>
  );
};

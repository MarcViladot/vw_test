import React, { Suspense } from 'react';
import { lazyImport } from '@/utils/lazyImport';
const { Clients } = lazyImport(async () => await import('@/features/clients'), 'Clients');

function App() {
  return (
    <div className={'p-5'}>
      <Suspense fallback={<div>Loading</div>}>
        <Clients />
      </Suspense>
    </div>
  );
}

export default App;

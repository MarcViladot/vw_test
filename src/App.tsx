import { DataTable } from '@/components/DataTable';

function App() {
  return (
    <div className={'p-3'}>
      <h1 className={'mb-5'}>VW TEST</h1>
      <DataTable
        data={[{ name: 'Jose', age: 20 }]}
        columnDefs={[
          { headerName: 'Name', field: 'name' },
          { headerName: 'Age', field: 'age' },
        ]}
      />
    </div>
  );
}

export default App;

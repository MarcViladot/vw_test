import { DataTable } from '@/components/DataTable';

function App() {
  return (
    <div className={'p-3'}>
      <h1 className={'mb-5'}>VW TEST</h1>
      <DataTable
        newRowModel={{ name: '', age: 0 }}
        data={[
          { name: 'Jose', age: 20 },
          { name: 'Pol', age: 85 },
          { name: 'Eloi', age: 30 },
        ]}
        columnDefs={[
          { headerName: 'Name', field: 'name', type: 'text' },
          { headerName: 'Age', field: 'age', type: 'text' },
        ]}
        onRowEdit={console.log}
        onRowAdded={console.log}
        onRowDeleted={console.log}
      />
    </div>
  );
}

export default App;

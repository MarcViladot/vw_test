import { DataTable } from '@/components/DataTable';

function App() {
  return (
    <>
      <h1>VW TEST</h1>
      <DataTable data={[{ name: 'Jose', age: 20 }]} columnDefs={[{ headerName: 'Name', field: 'name' }]} />
    </>
  );
}

export default App;

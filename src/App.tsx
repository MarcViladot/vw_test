import { DataTable, TableOptions } from '@/components/DataTable';

interface Person {
  name: string;
  age: number;
}

function App() {
  const options: TableOptions<Person> = {
    newRowModel: { name: '', age: 0 },
    data: [
      { name: 'Jose', age: 20 },
      { name: 'Pol', age: 85 },
      { name: 'Eloi', age: 30 },
    ],
    columnDefs: [
      { headerName: 'Name', field: 'name', type: 'text' },
      { headerName: 'Age', field: 'age', type: 'text' },
    ],
    onRowEdit: (values) => {
      console.log(values);
    },
    onRowAdded: (values) => {
      console.log(values);
    },
    onRowDeleted: (values) => {
      console.log(values);
    },
  };

  return (
    <div className={'p-3'}>
      <h1 className={'mb-5'}>VW TEST</h1>
      <DataTable options={options} />
    </div>
  );
}

export default App;

import { DataTable, TableOptions } from '@/components/DataTable';

interface Person {
  name: string;
  age: number;
  registered: Date;
}

function App() {
  const options: TableOptions<Person> = {
    newRowModel: { name: '', age: 0, registered: new Date() },
    data: [
      { name: 'Jose', age: 20, registered: new Date(1290250220) },
      { name: 'Pol', age: 85, registered: new Date(1676737164) },
      { name: 'Eloi', age: 30, registered: new Date(1661990970) },
    ],
    columnDefs: [
      { headerName: 'Name', field: 'name', type: 'text' },
      { headerName: 'Age', field: 'age', type: 'number' },
      {
        headerName: 'Registered',
        field: 'registered',
        type: 'date',
        cellRenderer: (date: Date) => date.toLocaleString(),
      },
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

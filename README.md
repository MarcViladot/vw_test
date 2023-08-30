###  VW TEST: Marc Viladot

<h2>Run the application</h2>

- Run `yarn install` to install all the dependencies.
- To execute the application run `yarn run dev` and go to **localhost:3000**
- Run `yarn run test` to run the tests.


<h2>Decisions and Technologies</h2>

<h3>Technologies</h3>

I used Vite as a bundler for the app since it's the fastest and easiest way right now to set up a React project. 
As for the styling, I used tailwind, because I find it more comfortable to use than the CSS-in-Js libraries like Styled components or Emotion.

To mockup the REST API I used msw.js, it's the library I usually use, and you don't need to start it manually,
and for the tests I used vitest and React Testing library.

To handle the http requests, I used Axios along with ReactQuery, since it's the recommended way to handle external data, and you don't have to fetch with the useEffect and store the data manually.

I also used the libraries React Icons, React DatePicker, and Formik to handle the forms.

<h3>Decisions</h3>

<h5>Project structure:</h5>

- components: global components, only the DataTable in this project
- features: features modules
- mocks: msw server and handlers
- services: only axios config right now
- utils: shared utility functions

The project is structured in features modules (although there is only the clients feature here), each feature should have his own types, components, hooks, 
that should be used only within the feature. Each feature should have a routes with the entry point or routes of the feature.


<h5>DataTable component</h5>

Inside the global components folder there is the DataTable component. This component is structured in three main parts, the Utilities (with the search bar and the add row button),
the table header and the table body.

The component uses a React Context to couple the table components together, avoiding the prop drilling in most of the components. 
I used Context instead of state managers like Redux or Zustand, because I didn't need to have a global data for the table,
I needed the data stored inside the DataTable component.

To define the table configuration, I used the approach of having two arrays, one for the data, and the other for the column definitions, since it's the one that feels more natural and easy to work with. 
Here you can define the data field name for that column, the header name, the type (this is used for the edit and right now only admits text/number/date), 
the cellRenderer (if you want to render a custom component through the value inside the table cell you can use this function) 
and an editOptions field (if you want to replace the base edit function with anything else, although right now only admits a Select component). This definitions could be extended in a 
future admitting new options such as sortable (if you want to disable the sorting function in a column) or a width field to modify the column width.

In the table options there is a set of callbacks for the table operations of delete/edit/add/preview, the icons to perform the operations will only show up in the Actions columns if the callback is defined.

The sort function sorts by the typeof of the data, here I used a StrategyPattern to allow more types of data to be sorted in the future, avoiding an if/else infinite block. 
You can sort columns with cellRenderer, but it will sort by the column value and not the rendered value.








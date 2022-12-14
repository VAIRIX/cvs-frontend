import { Admin, Resource } from 'react-admin';
import { ProfessionalList, ProfessionalCreate } from './professionals';
import { dataProvider } from './api/dataProvider';

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="professionals"
      list={ProfessionalList}
      create={ProfessionalCreate}
    />
  </Admin>
);
export default App;

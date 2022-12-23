import { Admin, Resource } from 'react-admin';
import { ProfessionalList, ProfessionalCreate } from './professionals';
import { dataProvider } from './api/dataProvider';
import authProvider from './api/authProvider';
import LoginPage from './pages/Login';

const App = () => (
  <Admin
    loginPage={LoginPage}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="professionals"
      list={ProfessionalList}
      create={ProfessionalCreate}
    />
  </Admin>
);
export default App;

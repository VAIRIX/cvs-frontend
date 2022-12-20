import { Admin, Resource } from 'react-admin';
import { UserList, UserCreate } from './users';
import { dataProvider } from './api/dataProvider';
import authProvider from './api/authProvider';
import LoginPage from './pages/Login';

const App = () => (
  <Admin
    loginPage={LoginPage}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource name="users" list={UserList} create={UserCreate} />
  </Admin>
);
export default App;

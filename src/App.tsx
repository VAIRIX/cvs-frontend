import { Admin, Resource } from 'react-admin';
import { UserList, UserCreate } from './users';
import { dataProvider } from './api/dataProvider';

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} create={UserCreate} />
  </Admin>
);
export default App;

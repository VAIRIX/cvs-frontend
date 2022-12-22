import { Admin, Resource } from 'react-admin';
import {
  ProfessionalList,
  ProfessionalCreate,
  ProfessionalShow,
  ProfessionalEdit,
} from './professionals';
import { dataProvider } from './api/dataProvider';
import authProvider from './api/authProvider';
import LoginPage from './pages/Login';
import { ProjectEdit, ProjectList, ProjectShow } from './projects';

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
      show={ProfessionalShow}
      edit={ProfessionalEdit}
    />
    <Resource
      name="projects"
      list={ProjectList}
      show={ProjectShow}
      edit={ProjectEdit}
    />
  </Admin>
);
export default App;

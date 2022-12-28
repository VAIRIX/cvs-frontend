import { Admin, Resource } from 'react-admin';
import { ProjectsList, ProjectsCreate, ProjectsEdit } from './projects';
import {
  ProfessionalList,
  ProfessionalCreate,
  ProfessionalShow,
  ProfessionalEdit,
} from './professionals';

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
      show={ProfessionalShow}
      edit={ProfessionalEdit}
    />
    <Resource
      name="projects"
      list={ProjectsList}
      create={ProjectsCreate}
      edit={ProjectsEdit}
    />
  </Admin>
);
export default App;

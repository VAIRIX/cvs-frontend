import { Admin, Login, Resource } from 'react-admin';
import {
  ProjectsList,
  ProjectsCreate,
  ProjectsEdit,
  ProjectShow,
} from './resources/projects';
import {
  ProfessionalList,
  ProfessionalCreate,
  ProfessionalShow,
  ProfessionalEdit,
} from './resources/professionals';

import { dataProvider } from './api/dataProvider';
import authProvider from './api/authProvider';

const App = () => (
  <Admin
    loginPage={<Login />}
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
      show={ProjectShow}
    />
  </Admin>
);
export default App;

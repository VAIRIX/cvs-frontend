import { Admin, Login, Resource } from 'react-admin';
import {
  ProjectsList,
  ProjectsCreate,
  ProjectsEdit,
  ProjectShow,
} from 'resources/projects';
import {
  ProfessionalList,
  ProfessionalCreate,
  ProfessionalShow,
  ProfessionalEdit,
} from 'resources/professionals';

import { dataProvider } from 'api/dataProvider';
import authProvider from 'api/authProvider';
import { RESOURCES } from 'api/resources';

const App = () => (
  <Admin
    loginPage={<Login />}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name={RESOURCES.PROFESSIONALS}
      list={ProfessionalList}
      create={ProfessionalCreate}
      show={ProfessionalShow}
      edit={ProfessionalEdit}
    />
    <Resource
      name={RESOURCES.PROJECTS}
      list={ProjectsList}
      create={ProjectsCreate}
      edit={ProjectsEdit}
      show={ProjectShow}
    />
  </Admin>
);
export default App;

import { Admin, Resource } from 'react-admin';
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
import Dashboard from 'components/Dashboard';
import Login from 'components/Login';
import Layout from 'components/Layout';
import { theme } from 'utils';

const App = () => (
  <Admin
    theme={theme}
    dashboard={Dashboard}
    layout={Layout}
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

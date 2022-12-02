// in src/App.tsx
import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./users";
import { PostList } from "./posts";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} recordRepresentation="name" />
    <Resource name="posts" list={PostList} />
  </Admin>
);
export default App;

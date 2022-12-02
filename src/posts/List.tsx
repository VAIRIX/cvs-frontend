import { Datagrid, List, ReferenceField, TextField } from "react-admin";
import { useGetList } from "react-admin";

export const PostList = () => {
  const { data, total, isLoading, error } = useGetList("users", {
    pagination: { page: 1, perPage: 10 },
    sort: { field: "published_at", order: "DESC" },
  });

  console.log(isLoading);
  return (
    <List>
      <Datagrid rowClick="edit">
        <ReferenceField source="userId" reference="users" />
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="body" />
      </Datagrid>
    </List>
  );
};

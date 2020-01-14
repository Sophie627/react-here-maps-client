import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const PostList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="titulo" />
        </Datagrid>
    </List>
);
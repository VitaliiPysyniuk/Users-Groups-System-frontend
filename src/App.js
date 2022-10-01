import React, {useState} from 'react';
import './App.css';
import {Route, Routes, Navigate} from "react-router-dom";
import {
    NavigationComponent,
    GroupsComponent,
    GroupAddComponent,
    GroupEditComponent,
    UsersComponent,
    UserAddComponent,
    UserEditComponent
} from './components';


function App() {
    const [groupToEdit, setGroupToEdit] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);

    const onGroupEdit = (group) => {
        setGroupToEdit(group)
    }

    const onUserEdit = (user) => {
        setUserToEdit(user)
    }

    return (
        <div>
            <NavigationComponent/>
            <Routes>
                <Route path={'/groups'} exact={true} element={<GroupsComponent onGroupEdit={onGroupEdit}/>}/>
                <Route path={'/groups/add'} exact={true} element={<GroupAddComponent/>}/>
                <Route path={'/groups/:id'} exact={true} element={<GroupEditComponent groupToEdit={groupToEdit}/>}/>
                <Route path={'/users'} exact={true} element={<UsersComponent onUserEdit={onUserEdit}/>}/>
                <Route path={'/users/add'} exact={true} element={<UserAddComponent/>}/>
                <Route path={'/users/:id'} exact={true} element={<UserEditComponent userToEdit={userToEdit}/>}/>
                <Route path='*' element={<Navigate to='/users'/>}/>
            </Routes>
        </div>
    )
}

export default App;

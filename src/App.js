import React, {useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {
    NavigationComponent,
    GroupsComponent,
    GroupAddComponent,
    GroupEditComponent
} from './components';


function App() {
    const [groupToEdit, setGroupToEdit] = useState(null);

    const onGroupEdit = (group) => {
        setGroupToEdit(group)
    }

    return (
        <div>
            <NavigationComponent/>
            <Routes>
                <Route path={'/groups'} exact={true} element={<GroupsComponent onGroupEdit={onGroupEdit}/>}/>
                <Route path={'/groups/add'} exact={true} element={<GroupAddComponent/>}/>
                <Route path={'/groups/:id'} exact={true} element={<GroupEditComponent groupToEdit={groupToEdit}/>}/>
                {/*<Route path='*' element={<Navigate to='/'/>}/>*/}
            </Routes>
        </div>
    )
}

export default App;

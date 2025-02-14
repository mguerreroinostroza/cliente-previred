import {createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout'
import Users, {loader as userLoader} from './views/users/Users'
import EditUser, { loader as editUserLoader, action as editUserAction} from './views/users/EditUser'
import AddUser, {action as addProductAction} from './views/users/AddUser'
import { action as deleteUserAction } from './components/users/UserDetails'

export const router = createBrowserRouter([

    {
        path: '/',
        element: <Layout/>,
        children : [
            {
                index : true,
                element : <Users/>,
                loader : userLoader
            },
            {
                path : 'usuarios/agregar',
                element : <AddUser/>,
                action : addProductAction
            }
            
            ,{
                path:'usuarios/:id/editar', 
                element: <EditUser/>,
                loader: editUserLoader,
                action: editUserAction
            }, 
            {
                path:'usuarios/:id/eliminar',
                action: deleteUserAction
            }
        ]
    }
])
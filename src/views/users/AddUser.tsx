import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router-dom";
import UserForm from "../../components/users/UserForm";
import ErrorMessage from "../../components/ErrorMessage";
import {addUser} from '../../services/UserService'

export async function action({request} : ActionFunctionArgs) {

    const data = Object.fromEntries(await request.formData())
    let error = ''

    if (Object.values(data).includes('')) {

        error = 'todos los campos son obligatorios'
        
    }
    if (error.length) {
        return error
        
    }

    await addUser(data)
    return redirect('/')
}

export default function AddUser() {

    const error = useActionData() as string 

    return (
        <>
            <div className='flex justify-between px-2 max-w-xl mx-auto my-4'>
            <h2 className='text-2xl font-black text-slate-500'>Agregar Usuario</h2>
                <Link
                    to="/"
                    className='rounded-md bg-indigo-600 p-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 cursor-pointer'
                >
                    Volver a lista de usuarios
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <Form
                className="mt-10 px-2 max-w-xl mx-auto my-4"  
                method='POST'
            >
            
                <UserForm/>

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer hover:bg-indigo-500 rounded cursor-pointer"
                    value="Agregar usuario"
                />
            </Form>

        </>
    )
}
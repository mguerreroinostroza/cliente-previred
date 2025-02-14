import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import { getUserById, updateUser, } from '../../services/UserService'
import { User } from '../../types/users/Index'
import UserForm from '../../components/users/UserForm'




export async function loader({params} : LoaderFunctionArgs) {

    if(params.id !== undefined) {
        const user = await getUserById(params.id)

        if(!user) {
            return redirect('/')
        }
        return user
    }
}

export async function action({request, params} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) {
        return error
    }

    if(params.id !== undefined) {
        await updateUser(data, params.id)
        return redirect('/')
    }

}


export default function EditUser() {
    const user = useLoaderData() as User
    const error = useActionData() as string

    return (
        <>
            <div className='flex justify-between px-2 max-w-xl mx-auto my-4'>
                <h2 className='text-2xl font-black text-slate-500'>Editar Usuarios</h2>
                <Link
                    to="/"
                    className='rounded-md bg-indigo-600 p-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 cursor-pointer'
                >
                    Volver a Usuarios
                </Link>
            </div>

           {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10 px-2 max-w-xl mx-auto my-4"  
                method='POST'
            >
            
                <UserForm
                    user={user}
                />

                

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg hover:bg-indigo-500 cursor-pointer rounded"
                    value="Guardar Cambios"
                />
            </Form>
        
        </>
    )
}

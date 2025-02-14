import { useNavigate, Form, ActionFunctionArgs, redirect } from 'react-router-dom'
import { User } from "../../types/users/Index"
import { deleteUser } from '../../services/UserService'



type UserDetailsProps = {
    user: User
}

export async function action({params} : ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteUser(params.id)
        return redirect('/')
    }
}

export default function UserDetails({user} : UserDetailsProps) {

    const navigate = useNavigate()

    return (
        <tr >
            <td className="py-2 px-4 border-b border-b-gray-50">
                <span className="text-[13px] font-medium text-gray-400">
                {user.nombres}
                </span>
            </td>
            <td className="py-2 px-4 border-b border-b-gray-50">
                <span className="text-[13px] font-medium text-gray-400">
                {user.apellidos}
                </span>
            </td>
            <td className="py-2 px-4 border-b border-b-gray-50">
                <span className="text-[13px] font-medium text-gray-400">
                {user.rut}
                </span>
            </td>
           
            <td className="py-2 px-4 border-b border-b-gray-50">
            <span className="inline-block p-1 rounded bg-amber-400/70 text-gray-500 font-medium text-[12px] leading-none">
                {user.fechaNacimiento}
                </span>
            </td>
            <td className="py-2 px-4 border-b border-b-gray-50">
            <span className="inline-block p-1 rounded bg-blue-900/70 text-amber-50 font-medium text-[12px] leading-none">
                {user.correoElectronico}
                </span>
            </td>
            

           
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/usuarios/${user.id}/editar`)}
                        className='bg-indigo-600 text-white rounded-lg w-full p-1 uppercase font-bold text-xs text-center  hover:bg-indigo-500 cursor-pointer'
                        
                    >Editar</button>

                    <Form
                        className='w-full'
                        method='POST'
                        action={`usuarios/${user.id}/eliminar`}
                        onSubmit={ (e) => {
                            if( !confirm('¿Eliminar?') ) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input
                            type='submit'
                            value='Eliminar'
                            className='bg-red-600 text-white rounded-lg w-full p-1 uppercase font-bold text-xs text-center  hover:bg-red-500 cursor-pointer'
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}

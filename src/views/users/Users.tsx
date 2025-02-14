import { Link, useLoaderData } from 'react-router-dom'
import { getUsers } from '../../services/UserService'
import { User } from '../../types/users/Index'
import UserDetails from '../../components/users/UserDetails'


export async function loader() {

  const users = await getUsers()

  return users

}
export default function Users() {


  const data = useLoaderData() as User[]

  return (

    <>

      <div className="flex justify-between mb-4 items-start">
      <h2 className='text-2xl font-black text-slate-500'>Lista de Usuarios</h2>
        <div className='flex justify-between'>
                
                <Link
                    to="/usuarios/agregar"
                    className='rounded-md bg-indigo-600 p-2 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                   Agregar Usuario
                </Link>
            </div>
      </div>
      
      <div className="overflow-x-auto mt-6">
        <table className="w-full min-w-[540px]">
          <thead>
            <tr>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                Nombres
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                Apellidos
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                Rut
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                Fecha de nacimiento
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                Email
              </th>
              <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              
            </tr>
            {data.map(user => (
              <UserDetails
                key={user.id}
                user={user}
              />
            ))}
          </tbody>
        </table>





      </div>




    </>
  )
}
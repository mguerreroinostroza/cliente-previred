import { safeParse} from 'valibot';
import axios from 'axios';
import { DraftUserSchema, UserSchema, User, UsersSchema} from "../types/users/Index";

type UserData = {
    [k: string]: FormDataEntryValue;
}

export async function addUser(data : UserData) {


    try {
        const result = safeParse(DraftUserSchema, {
            nombres: data.nombres,
            apellidos: data.apellidos,
            rut: data.rut,
            fechaNacimiento: data.fechaNacimiento,
            correoElectronico: data.correoElectronico,
            contrasena: data.contrasena
        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}`
            await axios.post(url, {
            nombres: result.output.nombres,
            apellidos: result.output.apellidos,
            rut: data.rut,
            //validar y trasnformar date
            fechaNacimiento: result.output.fechaNacimiento,
            correoElectronico: result.output.correoElectronico,
            contrasena: result.output.contrasena
            })
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getUsers() {
    try {
        
        const url = `${import.meta.env.VITE_API_URL}`
 
        const { data } = await axios(url)
        const result = safeParse(UsersSchema, data)
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }

       
        
        
}

export async function getUserById(id : User['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        const { data } = await axios(url)
        const result = safeParse(UserSchema, data)
        
        if(result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
}


export async function deleteUser(id: User['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updateUser(data : UserData, id: User['id'] ) {
    try {
        
        const result = safeParse(UserSchema, {
            id,
            nombres: data.nombres,
            apellidos: data.apellidos,
            rut: data.rut,
            fechaNacimiento: data.fechaNacimiento,
            correoElectronico: data.correoElectronico,
            contrasena: data.contrasena,
        })
       
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/${id}`
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}

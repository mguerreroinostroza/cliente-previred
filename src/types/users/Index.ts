

import { object, string, array, Output} from 'valibot'

export const DraftUserSchema = object({
    nombres: string(),
    apellidos: string(),
    rut: string(), 
    fechaNacimiento: string(),
    correoElectronico: string(),
    contrasena: string()
})

export const UserSchema = object({ //dto
    id: string(), 
    nombres: string(),
    apellidos: string(),
    rut: string(), 
    fechaNacimiento: string(),
    correoElectronico: string(),
    contrasena: string()
})
export const UsersSchema = array(UserSchema)
export type User = Output<typeof UserSchema>
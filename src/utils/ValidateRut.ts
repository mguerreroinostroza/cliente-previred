import { validateRut } from '@fdograph/rut-utilities';


export async function isValidateRut(rut : string) {
    return validateRut(rut)
    
}
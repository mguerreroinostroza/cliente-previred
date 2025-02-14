import { useState } from "react";
import { User } from "../../types/users/Index"

type UserFormProps = {
    user?: User
}

export default function UserForm({ user }: UserFormProps) {


    const [, setNombre] = useState(user?.nombres || "")
    const [errorNombres, setErrorNombres] = useState("")

    const [, setApellido] = useState(user?.apellidos || "")
    const [errorApellidos, setErrorApellidos] = useState("")

    const [, setRut] = useState(user?.rut || "");
    const [errorRut, setErrorRut] = useState("")

    const [, setEmail] = useState(user?.correoElectronico || "");
    const [errorEmail, setErrorEmail] = useState("");

    const validateString = (value: string, type: string) => {


        if (type === 'nombres') {

            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                setErrorNombres("Solo se permiten letras y espacios.")
                return false
            }

            setErrorNombres(""); 
            return true
        }

        if (type === 'apellidos') {


            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                setErrorApellidos("Solo se permiten letras y espacios.")
                return false
            }

            setErrorApellidos(""); 
            return true

        }


    }
    const validateRut = (value: string) => {
        if (!/^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/.test(value)) {
            setErrorRut("Formato incorrecto. Usa puntos y guion o solo guion (Ej: 12.345.678-9) o (Ej: 12345678-9)");
            return false;
        }

        const [num, dv] = value.replace(/\./g, "").split("-");
        if (calculateDV(num) !== dv.toUpperCase()) {
            setErrorRut("RUT inválido, revisa el dígito verificador");
            return false
        }

        setErrorRut(""); 
        return true;
    }

    const calculateDV = (rut: any) => {
        let sum = 0,
            mul = 2;
        for (let i = rut.length - 1; i >= 0; i--) {
            sum += rut[i] * mul;
            mul = mul === 7 ? 2 : mul + 1
        }
        const dv = 11 - (sum % 11)
        return dv === 11 ? "0" : dv === 10 ? "K" : dv.toString()
    }

    const validateEmail = (email: string )  => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
          setErrorEmail("El correo electrónico no es válido.");
          return false;
        }
      
        setErrorEmail(""); 
        return true;
      };

    const handleChangeRut = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        console.log(value)
        setRut(value);
        validateRut(value)
    }

    const handleChangeNombres = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setNombre(value)
        validateString(value, 'nombres')
    }

    const handleChangeApellidos = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setApellido(value)
        validateString(value, 'apellidos')
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
      };

    return (
        <>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >Nombres:</label>
                <input
                    id="nombres"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombres"
                    name="nombres"
                    defaultValue={user?.nombres}
                    onChange={handleChangeNombres}
                />
                {errorNombres && <p className="text-red-500 text-xs mt-1">{errorNombres}</p>}
            </div>

            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >Apellidos:</label>
                <input
                    id="apellidos"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Apellidos"
                    name="apellidos"
                    defaultValue={user?.apellidos}
                    onChange={handleChangeApellidos}
                />
                {errorApellidos && <p className="text-red-500 text-xs mt-1">{errorApellidos}</p>}
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >Rut:</label>
                <input
                    id="rut"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Rut completo con guion"
                    name="rut"
                    defaultValue={user?.rut}
                    onChange={handleChangeRut}
                />
                {errorRut && <p className="text-red-500 text-xs mt-1">{errorRut}</p>}
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="fecha de nacimiento"
                >Fecha Nacimiento:</label>
                <input
                    id="fecha de nacimiento"
                    type="date"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Fecha de nacimiento"
                    name="fechaNacimiento"
                    min={new Date(new Date().setFullYear(new Date().getFullYear() - 140)).toISOString().split("T")[0]}
    
                    max={new Date().toISOString().split("T")[0]}
                    defaultValue={user?.fechaNacimiento}
                />
            </div>

            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="fecha de nacimiento"
                >Correo Electronico:</label>
                <input
                    id="correo electronico"
                    type="email"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Correo electronico"
                    name="correoElectronico"
                    defaultValue={user?.correoElectronico}onChange={handleEmailChange}
                    />
                    {errorEmail && <p className="text-red-500">{errorEmail}</p>}
            </div>

            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="Contraseña"
                >Contraseña:</label>
                <input
                    id="contraseña"
                    type="password"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Contraseña"
                    name="contrasena"
                    defaultValue={user?.contrasena}
                />
            </div>






        </>
    )
}
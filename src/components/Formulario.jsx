import {useState, useEffect} from 'react';
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    useEffect( () => {
        if( Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    }, [paciente])

    const generarId = () => {
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)

        return random + fecha
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validación de formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            console.log('Hay por lo menos un campo vacio');
            setError(true);
            return;
        }

        setError(false)

        //Objeto Paciente
        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas,
            id: generarId()
        }

        if(paciente.id){
            //Editando el registro
            objetoPaciente.id = paciente.id

            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
            setPacientes(pacientesActualizados)
            setPaciente({})
        }else{
            //nuevo registro
            // ...pacientes es para tomar copia del objeto existente, objetoPaciente es la nueva información que se va a escribir en un nuevo objeto
            objetoPaciente.id = generarId()
            setPacientes([...pacientes, objetoPaciente])
        }

        //console.log(objetoPaciente);

        //Reiniciar el formulario
        setNombre('')
        setEmail('')
        setFecha('')
        setPropietario('')
        setSintomas('')
    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className=" font-black text-3xl text-center">Seguimiento Pacientes</h2>
            
            <p className=" text-lg mt-5 text-center mb-10">Añade pacientes y <span className=" font-bold text-indigo-600">administralos</span></p>

            <form className=" bg-white shadow-md rounded-lg pt-10 pb-2 px-5 mb-10" onSubmit={handleSubmit}> 

                { error && <Error><p>Todos los campos son obligatorios</p></Error> }
                <div className=" mb-5">
                    <label className=" block text-gray-700 uppercase font-bold" htmlFor="mascota">Nombre Mascota: </label>
                    <input className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" placeholder="Nombre de la mascota" id="mascota" value={nombre} onChange={ (e) => setNombre(e.target.value) }/>
                </div>

                <div className=" mb-5">
                    <label className=" block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre del propietario: </label>
                    <input className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="text" placeholder="Nombre del propietario" id="propietario" value={propietario} onChange={ (e) => setPropietario(e.target.value) }/>
                </div>

                <div className=" mb-5">
                    <label className=" block text-gray-700 uppercase font-bold" htmlFor="correo">Correo: </label>
                    <input className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="email" placeholder="Correo Electrónico" id="correo" value={email} onChange={ (e) => setEmail(e.target.value) }/>
                </div>

                <div className=" mb-5">
                    <label className=" block text-gray-700 uppercase font-bold" htmlFor="alta">Fecha de alta: </label>
                    <input className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" type="date" id="alta" value={fecha} onChange={ (e) => setFecha(e.target.value) }/>
                </div>

                <div className=" mb-5">
                    <label className=" block text-gray-700 uppercase font-bold" htmlFor="sintomas">Síntomas: </label>
                    <textarea className=" border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" id="sintomas" placeholder="Describe los síntomas" value={sintomas} onChange={ (e) => setSintomas(e.target.value) }/>
                </div>

                <input type="submit" className=" bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded-lg" value={ paciente.id ? 'Guardar cambios' : 'Agregar paciente'}/>
            </form>
        </div>
    )
}

export default Formulario


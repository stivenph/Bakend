import { useEffect, useState } from "react";

function App() {
  const [personas, setPersonas] = useState([]);

  const [persona, setPersona] = useState({
    tipoDocumento: "",
    numeroDocumento: "",
    nombres: "",
    apellidos: "",
    direccion: "",
    ciudad: "",
    fechaNacimiento: "",
    correo: ""
  });

  const [id, setId] = useState(null);

  // Cargar las personas
  useEffect(() => {
    cargarPersonas();
  }, []);

  const cargarPersonas = async () => {
    const respuesta = await fetch("http://localhost:3000/personas");
    const datos = await respuesta.json();

    setPersonas(datos);
  };

  // Cambiar los datos del formulario
  const cambiarDato = (e) => {
    setPersona({
      ...persona,
      [e.target.name]: e.target.value
    });
  };

  // Guardar una persona
  const guardar = async () => {
    if (
      persona.tipoDocumento === "" ||
      persona.numeroDocumento === "" ||
      persona.nombres === "" ||
      persona.apellidos === ""
    ) {
      alert("Complete los campos obligatorios");
      return;
    }

    const respuesta = await fetch("http://localhost:3000/personas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(persona)
    });

    if (respuesta.ok) {
      alert("Persona guardada");

      cargarPersonas();
      limpiar();
    }
  };

  // Cargar una persona en el formulario
  const seleccionarPersona = (personaSeleccionada) => {
    setPersona(personaSeleccionada);
    setId(personaSeleccionada.id);
  };

  // Actualizar una persona
  const actualizar = async () => {
    const respuesta = await fetch(
      `http://localhost:3000/personas/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(persona)
      }
    );

    if (respuesta.ok) {
      alert("Persona actualizada");

      cargarPersonas();
      limpiar();
    }
  };

  // Eliminar una persona
  const eliminar = async (idPersona) => {
    const confirmar = window.confirm(
      "¿Está seguro de que desea eliminar esta persona?"
    );

    if (confirmar) {
      const respuesta = await fetch(
        `http://localhost:3000/personas/${idPersona}`,
        {
          method: "DELETE"
        }
      );

      if (respuesta.ok) {
        alert("Persona eliminada");

        cargarPersonas();

        if (id === idPersona) {
          limpiar();
        }
      }
    }
  };

  // Limpiar formulario
  const limpiar = () => {
    setPersona({
      tipoDocumento: "",
      numeroDocumento: "",
      nombres: "",
      apellidos: "",
      direccion: "",
      ciudad: "",
      fechaNacimiento: "",
      correo: ""
    });

    setId(null);
  };

  return (
    <>
      <form>
        <table width="650">
          <tbody>
            <tr>
              <td width="150"></td>
              <td align="center">
                <img src="/logTdea.png" width="70" alt="Logo" />
              </td>
            </tr>

            <tr>
              <td></td>
              <td align="center">
                Tecnológico de Antioquia - Institución Universitaria
              </td>
            </tr>

            <tr>
              <td></td>
              <td align="center">
                Mi primer formulario
              </td>
            </tr>

            <tr>
              <td>
                <label>Tipo de documento</label>
              </td>
              <td>
                <select
                  name="tipoDocumento"
                  value={persona.tipoDocumento}
                  onChange={cambiarDato}
                >
                  <option value="">Seleccione...</option>
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="TI">Tarjeta de identidad</option>
                  <option value="CE">Cédula de extranjería</option>
                  <option value="PAS">Pasaporte</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>
                <label>Número de documento</label>
              </td>
              <td>
                <input
                  type="text"
                  name="numeroDocumento"
                  size="50"
                  value={persona.numeroDocumento}
                  onChange={cambiarDato}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>Nombres</label>
              </td>
              <td>
                <input
                  type="text"
                  name="nombres"
                  size="50"
                  value={persona.nombres}
                  onChange={cambiarDato}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>Apellidos</label>
              </td>
              <td>
                <input
                  type="text"
                  name="apellidos"
                  size="50"
                  value={persona.apellidos}
                  onChange={cambiarDato}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>Dirección</label>
              </td>
              <td>
                <input
                  type="text"
                  name="direccion"
                  size="50"
                  value={persona.direccion}
                  onChange={cambiarDato}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>Ciudad</label>
              </td>
              <td>
                <select
                  name="ciudad"
                  value={persona.ciudad}
                  onChange={cambiarDato}
                >
                  <option value="">Seleccione...</option>
                  <option value="medellin">Medellín</option>
                  <option value="bogota">Bogotá</option>
                  <option value="cali">Cali</option>
                  <option value="cucuta">Cúcuta</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>
                <label>Fecha de nacimiento</label>
              </td>
              <td>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={persona.fechaNacimiento}
                  onChange={cambiarDato}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>Correo electrónico</label>
              </td>
              <td>
                <input
                  type="email"
                  name="correo"
                  size="50"
                  value={persona.correo}
                  onChange={cambiarDato}
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                <br />

                <button
                  type="button"
                  onClick={guardar}
                  disabled={id !== null}
                >
                  Guardar
                </button>

                &nbsp;&nbsp;

                <button
                  type="button"
                  onClick={actualizar}
                  disabled={id === null}
                >
                  Actualizar
                </button>

                &nbsp;&nbsp;

                <button
                  type="button"
                  onClick={limpiar}
                >
                  Limpiar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <br />

      <table border="1">
        <thead>
          <tr>
            <th>Tipo de Documento</th>
            <th>Número de Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>Fecha de Nacimiento</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {personas.map((p) => (
            <tr key={p.id}>
              <td>{p.tipoDocumento}</td>
              <td>{p.numeroDocumento}</td>
              <td>{p.nombres}</td>
              <td>{p.apellidos}</td>
              <td>{p.direccion}</td>
              <td>{p.ciudad}</td>
              <td>{p.fechaNacimiento}</td>
              <td>{p.correo}</td>

              <td>
                <button
                  type="button"
                  onClick={() => seleccionarPersona(p)}
                >
                  Actualizar
                </button>

                <button
                  type="button"
                  onClick={() => eliminar(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
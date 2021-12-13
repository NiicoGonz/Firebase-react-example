import React, { useState, useEffect } from "react";
import { firebaseNow } from "../firebase";

const UsuarioForm = (props) => {
  const [values, setValues] = useState({
    nombre: "",
    edad: 0,
    password: "",
    time: firebaseNow,
  });

  const setForm = (props) => {
    setValues({
      nombre: props.nombre,
      edad: props.edad,
      password: props.password,
      time: firebaseNow,
    });

  };
  
  useEffect(() => {
    console.log(props)
    if (props.usuarioEditar.id !== "") {
      setForm(props.usuarioEditar);
    } else {
      setValues({
        nombre: "",
        edad: 0,
        password: "",
        time: firebaseNow,
      });
    }
  }, [props.usuarioEditar]);

  const capturarDatos = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const submit = (e) => {
    e.preventDefault();
   if(props.usuarioEditar.id ===""){
    props.pushfirebase(values);
   }else{
     props.editarfirebase(values,props.usuarioEditar.id);
     limpiar();
   }
  };
  const limpiar=() =>{
    props.limpiar();
  }
  return (
    <form className="card-cardbody " onSubmit={submit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="ingrese su nombre completo"
          name="nombre"
          value={values.nombre||""}
          onChange={capturarDatos}
        ></input>
      </div>
      <div className="form-group">
        <input
          type="number"
          className="form-control"
          placeholder="ingrese su edad"
          name="edad"
          value={values.edad  ||""}
          onChange={capturarDatos}
        ></input>
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="ingrese su contraseña"
          name="password"
          value={values.password ||""}
          onChange={capturarDatos}
        ></input>
      </div>
      {props.usuarioEditar.id === "" ? (
        <button className="btn btn-info btn-block">Guardar</button>
      ) : (
        <div>
        <button className="btn btn-info btn-block">Editar</button>
        <button className="btn btn-info btn-block" onClick={limpiar}>camcelar</button>
        </div>
      )}
    </form>
  );
};

export default UsuarioForm;

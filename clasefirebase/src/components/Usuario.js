import React, { useState, useEffect } from "react";
import UsuarioForm from "./UsuarioForm";
import { firebaseNow, firestore } from "../firebase.js";

const Usuario = () => {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [usuario,setUsuario] = useState({
    id:"",
    nombre:"",
    edad:0,
    password:"",
    time:firebaseNow
  });
  const limpiar=()=>{
    setUsuario({
      id:"",
      nombre:"",
      edad:0,
      password:"",
      time:firebaseNow
    })
  }
   const pushfirebase = async (values) => {
    await firestore.collection("usuarios").doc().set(values);
    alert("usuarios registrado");
  };

  /*const getUser = () => {
    firestore
      .collection("usuarios")
      .get()
      .then((date) => {
          const docs=[];
        date.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setDataUsuarios(docs);
      });
  };*/

  const getUsers = () => {
    firestore.collection("usuarios").onSnapshot((query) => {
      const docs = [];

      query.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setDataUsuarios(docs);
     
    });
  };
  const deleteUser = (values) => {
    const ususariosRef = firestore.collection("usuarios");
    ususariosRef
      .doc(values)
      .delete()
      .then((resp) => console.log("borrado"))
      .catch((e) => console.log("error", e));
      limpiar();
  };
  const editarfirebase = async (values,id)=>{
    await firestore.collection("usuarios").doc(id).set(values);

    alert("usuarios editado");
  }
  const editUser =(values) =>{
    setUsuario(values);


  }
  useEffect(() => {
    getUsers();

  }, []);
  return (
    <>
    <div>
      <div>
        <UsuarioForm pushfirebase={pushfirebase} editarfirebase={editarfirebase} limpiar={limpiar} usuarioEditar={usuario}/>
      </div>
      <div className="col-md-4 mt-5">
        {dataUsuarios.map(({ nombre, edad, time, id,password}) => (
            <div className="card mb-1" key={id}>
              <div className="card-body">
                <div className="col-6">
                  <h4>{nombre}</h4>
                  <h4>{edad}</h4>
                </div>

                <i className="btn btn-primary" onClick={() => deleteUser(id)}>
                  borrar
                </i>
                <i className="btn btn-danger" onClick={()=>editUser({nombre,edad,time,id,password})}>editar</i>
              </div>
            </div>
        ))}
      </div>
    </div>
    </>
  );
};
export default Usuario;

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	return (
		<>
		{store.user==null && <h1>Cargando...</h1>}
		{store.user==false && <>
			<h1 className="text-danger">Debes iniciar sesion para ver esta pagina</h1>
			<button className="btn btn-primary" onClick={()=> navigate("/login")}>Ir a login</button>
		</>}
		</>
	);
};

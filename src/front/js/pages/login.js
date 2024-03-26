import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	return (
		<>
		{store.user==null || store.user == false ? <h1>Aquin ira el login</h1>: <h1 className="text-danger">Ya has iniciado sesion</h1>}
		</>
	);
};

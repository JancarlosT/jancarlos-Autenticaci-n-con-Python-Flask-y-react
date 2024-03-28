import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleSignup = async (email, password) => {
		const response = await actions.signup(email, password)
		if (response) {
			navigate("/login")
		} else {
			alert("ocurrio un error en el registro!")
		}
	}

	return (
		<>
			{store.user == null || store.user == false ?
				<div className="container">
					<div className="mb-3 w-50 mx-auto">
						<h1>Signup</h1>
					</div>
					<div className="mb-3 w-50 mx-auto">
						<label for="emailInput" className="form-label">Email address</label>
						<input value={email} type="email" className="form-control" id="emailInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="mb-3 w-50 mx-auto">
						<label for="passwordInput" className="form-label">Password</label>
						<input value={password} type="password" className="form-control" id="passwordInput" placeholder="*****" onChange={(e) => setPassword(e.target.value)} />
					</div>
					<div className="mb-3 w-50 mx-auto">
						<button type="button" className="btn btn-primary mx-auto" onClick={() => handleSignup(email, password)}>Signup</button>
					</div>
				</div>
				: <h1 classNameName="text-danger">Ya has iniciado sesion</h1>}
		</>
	);
};

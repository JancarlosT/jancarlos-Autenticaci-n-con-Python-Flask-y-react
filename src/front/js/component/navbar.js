import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate} from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	const handleLogout = () => {
		actions.logout()	
		navigate("/login")
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Authentication System</span>
				</Link>
				{store.user == null && <span>Cargando...</span>}
				{store.user == false && 
					<div className="ml-auto">
					<button className="btn btn-primary mx-2" onClick={() => navigate("/login")}>Login</button>	
					<button className="btn btn-primary" onClick={() => navigate("/signup")}>Signup</button>	
			</div>
				}
				{store.user && 
				<div className="ml-auto">
				<button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>	
		</div>
				}
			</div>
		</nav>
	);
};

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			signup: async (email, password) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/signup", {
						method: "POST",
						body: JSON.stringify({email:email, password:password}),
						headers: {
							"Content-Type": "application/json"
						}
					})
					const data = await resp.json()
					if (resp.ok){
						console.log(data)
						return true
					}
					// don't forget to return something, that is how the async resolves
					return false;
				}catch(error){
					console.log("Error loading message from backend", error)
					return false
				}
			},
			login: async (email, password) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/login", {
						method: "POST",
						body: JSON.stringify({email:email, password:password}),
						headers: {
							"Content-Type": "application/json"
						}
					})
					const data = await resp.json()
					if (resp.ok){
						console.log(data)
						localStorage.setItem("token", data.access_token)
						setStore({user: data.user})
						return true
					}
					// don't forget to return something, that is how the async resolves
					setStore({user: false})
					return false;
				}catch(error){
					console.log("Error loading message from backend", error)
					setStore({user: false})
					return false
				}
			},
			private: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/private", {
						method: "GET",
						headers: {
							"Authorization": "Bearer "+localStorage.getItem("token")
						}
					})
					const data = await resp.json()
					if (resp.ok){
						console.log(data)
						setStore({user: data})
						return true
					}
					// don't forget to return something, that is how the async resolves
					setStore({user: false})
					return false;
				}catch(error){
					console.log("Error loading message from backend", error)
					setStore({user: false})
					return false
				}
			},
			logout: () => {
				localStorage.removeItem("token")
				setStore({user: false})
			}

		}
	};
};

export default getState;

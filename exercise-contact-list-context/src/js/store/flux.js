const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			apiURL: "https://assets.breatheco.de/apis/fake/contact",
			agendas: null,
			agenda: null, //agenda seleccionada en ese momento
			contacts: null, // donde van a estar guardados toedos los contactos
			contact: null// contacto seleccionado para guardarlo o editarlo
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			handleChangeAgenda: e => {
				const { name, value } = e.target;
				setStore({
					[name]: value ? value : null // si tiene un valor, pornerle el valor o null
				});
			},

			getAgendas: url => {
				const store = getStore();
				fetch(store.apiURL + + url)
					.then(resp => resp.json())
					.then(data => {
						setStore({
							agendas: data
						})
					})
			},

			loadContactByAgenda: () => {
				const store = getStore();
				if (store.agenda !== null) {
					fetch(store, apiURL + "/agenda/" + store.agenda)
						.then(resp => resp.json())
						.then(data => {
							setStore({
								contacts: data
							});
						});
				} else {
					alert("Debe seleccionar una agenda")
				}
			},

			addContact: (url, data) => {
				const store = getStore();
				fetch(store, apiURL + "/", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						getActions().loadContactByAgenda();
					});
			},

			editContact: (url, data) => {
				const store = getStore(); //para saber la agenda preseleccionada
				fetch(store, apiURL + url, {
					method: "PUT",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						getActions().loadContactByAgenda();
					});
			},

			deleteContact: (url) => {
				const store = getStore(); 
				fetch(store, apiURL + url, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						getActions().loadContactByAgenda(); //elimina el contacto y vuelve a cargar la lista de contactos
					});
			},
		}
	};
};


export default getState;
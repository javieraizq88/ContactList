import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const EditContact = props => {
	const { store, actions } = useContext(Context);
	const contactId = props.match.params.id; //id del contacto q se ubtiene por el URL
	const [contact, setContact] = useState({
		full_name: "",
		email: "",
		agenda_slug: "",
		address: "",
		phone: ""
	});

	useEffect(() => {
		if (store.contacts !== null) {
			let contact = store.contacts.filter((contact) => {
				return contact.id === contactId;
			})
			setContact(contact[0]); //le paso el parametro nuevo con los obj q coincidan con el id
		}
	}, []);

	const handleChange = e => {
		const { name, value } = e.target;
		setContact({ ...contact, [name]: value }); // si el atributo existe dentro de contacto lo cambia por el valor q estoy obteniendo
	};


	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit a contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input type="text"
							name="full_name"
							className="form-control"
							placeholder="Full Name"
							value={contact.full_name}
							onChange={handleChange} />
					</div>
					<div className="form-group">
						<label>Email</label>
						<input type="email" name="email" className="form-control" placeholder="Enter email" value={contact.email}
							onChange={handleChange} />
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input type="phone" name="phone" className="form-control" placeholder="Enter phone" value={contact.phone}
							onChange={handleChange} />
					</div>
					<div className="form-group">
						<label>Address</label>
						<input type="text" name="address" className="form-control" placeholder="Enter address" value={contact.address}
							onChange={handleChange} />
					</div>
					<button type="button" className="btn btn-success form-control" onClick={() => {
						actions.editContact("/" + contactId, contact)
						//manda el url a flux para q cambie el nombre
						//recibe el id del contacto q esta guardado en contactId y contact pq son los datos q quiero actualizar del usuario
						// al apretar el boton, va a guardar la informacion 
					}} >
						Save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};



/**
 * Define the data-types for
 * your component's properties
 **/
EditContact.propTypes = {
	history: PropTypes.object,
	match: PropTypes.object,
};

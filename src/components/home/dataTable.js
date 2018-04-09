import React from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';

const TableRow = (props) =>{
	const{employee, refreshData} = props;
	const name = employee[0];
	const id = employee[1];
	const phone = '('+employee[2].slice(0,3)+') '+employee[2].slice(3,6)+'-'+employee[2].slice(6);
	const supervisor = employee[3];

	const deleteEmp = ()=>{
		const dURL = 'localhost:8080/HouseCoffee/delete_emp'
	};

	return(
		<tr>
			<td>{name}</td>
			<td>{id}</td>
			<td>{supervisor}</td>
			<td>{phone}</td>
			<td>
				<Button className='btn-danger'>
					Delete
				</Button>
			</td>
		</tr>
	)
}

export default TableRow;
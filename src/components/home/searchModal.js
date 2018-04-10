import React, {Component} from 'react';
import axios from 'axios';
import {FormGroup, Glyphicon, FormControl, Button} from 'react-bootstrap';

class SearchModal extends Component{
	constructor(props){
		super(props);
		this.state={
			firstName: '',
			lastName: '',
			empId: ''
		}
		this.firstNameInput = this.firstNameInput.bind(this);
		this.lastNameInput = this.lastNameInput.bind(this);
		this.idInput = this.idInput.bind(this);
		this.searchPerson = this.searchPerson.bind(this);
		this.searchById = this.searchById.bind(this);
		this.searchByFirstName = this.searchByFirstName.bind(this);
		this.searchByLastName = this.searchByLastName.bind(this);
	}
	firstNameInput(e){
		this.setState({
			firstName: e.target.value
		});
	}
	lastNameInput(e){
		this.setState({
			lastName: e.target.value
		});
	}
	idInput(e){
		this.setState({
			empId: e.target.value
		});
	}
	searchPerson(){
		// this.searchById();
		// this.searchByFirstName();
		this.searchByLastName();
	}
	searchById(){
		const {empId} = this.state;
		const idSearchURL = `http://localhost:8080/HouseCoffee/search_id?id=${empId}`;
		const request = axios({
			method: 'GET',
			url: idSearchURL
		})
			.then((res)=>{
				console.log(res);
			})
			.catch((err)=>{
				console.log(err);
			})
	}
	searchByFirstName(){
		const {firstName} = this.state;
		const searchURL = "http://localhost:8080/HouseCoffee/search_firstname?name=" + firstName;
		// console.log(searchURL);
		const request = axios({
			method: 'GET',
			url: searchURL
		})
			.then((res)=>{
				console.log(res);
			})
			.catch((err)=>{
				console.log(err);
			})
	}
	searchByLastName(){
		const {lastName} = this.state;
		const searchURL = `http://localhost:8080/HouseCoffee/search_lastname?name=${lastName}`;
		const request = axios({
			method: 'GET',
			url: searchURL
		}).then((res)=>{
			console.log(res);
		}).catch((err=>{
			console.log(err);
		}))
	}

	render(){
		return(
			<div className='form-horizontal'>
				<form>
					<FormGroup className='input-group'>
						<span className='input-group-addon'>
							<Glyphicon glyph="pencil"/>
						</span>
						<FormControl 
							type='text'
							value={this.state.firstName}
							placeholder="Search by first name"
							onChange={this.firstNameInput}
						/>
					</FormGroup>
					<FormGroup className='input-group'>
						<span className='input-group-addon'>
							<Glyphicon glyph="pencil"/>
						</span>
						<FormControl 
							type='text'
							value={this.state.lastName}
							placeholder="Search by last name"
							onChange={this.lastNameInput}
						/>
					</FormGroup>
					<FormGroup className='input-group'>
						<span className='input-group-addon'>
							<Glyphicon glyph="pencil"/>
						</span>
						<FormControl 
							type='text'
							value={this.state.empId}
							placeholder="Search by employee ID"
							onChange={this.idInput}
						/>
					</FormGroup>

					<Button className='btn-block btn-info' onClick={this.searchPerson}>
						Search
					</Button>
				</form>
			</div>
		)
	}
}

export default SearchModal;
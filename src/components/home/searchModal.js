import React, {Component} from 'react';
import axios from 'axios';
import {FormGroup, Glyphicon, FormControl, Button} from 'react-bootstrap';

class SearchModal extends Component{
	constructor(props){
		super(props);
		this.state={
			firstName: '',
			lastName: '',
			empId: '',
			noResult: false
		}
		this.firstNameInput = this.firstNameInput.bind(this);
		this.lastNameInput = this.lastNameInput.bind(this);
		this.idInput = this.idInput.bind(this);
		this.searchPerson = this.searchPerson.bind(this);
		this.searchById = this.searchById.bind(this);
		this.searchByFirstName = this.searchByFirstName.bind(this);
		this.searchByLastName = this.searchByLastName.bind(this);
		this.displayResults = this.displayResults.bind(this);
		this.displayNoResult = this.displayNoResult.bind(this);
	}
	firstNameInput(e){
		this.setState({
			firstName: e.target.value,
			noResult : false
		});
	}
	lastNameInput(e){
		this.setState({
			lastName: e.target.value,
			noResult : false
		});
	}
	idInput(e){
		this.setState({
			empId: e.target.value,
			noResult : false
		});
	}
	searchPerson(){
		const {firstName, lastName, empId} = this.state;
		if(firstName.length){
			this.searchByFirstName();
		}else if(lastName.length){
			this.searchByLastName();
		}else if(empId.length){
			this.searchById();
		}
	}
	searchById(){
		const {empId} = this.state;
		const idSearchURL = `http://localhost:8080/HouseCoffee/search_id?id=${empId}`;
		const request = axios({
			method: 'GET',
			url: idSearchURL
		})
			.then((res)=>{
				if(res.data.length){
					this.displayResults(res.data);
				}else{
					this.displayNoResult();
				}
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
				if(res.data.length){
					this.displayResults(res.data);
				}else{
					this.displayNoResult();
				}
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
			if(res.data.length){
				this.displayResults(res.data);
			}else{
				this.displayNoResult();
			}
		}).catch((err=>{
			console.log(err);
		}))
	}
	displayResults(dataStr){
		const {convertData, setData, closeModal} = this.props;
		const dataArr =	convertData(dataStr);
		setData(dataArr);
		closeModal();
	}
	displayNoResult(){
		this.setState({
			firstName: '',
			lastName: '',
			empId: '',
			noResult: true
		});
	}

	render(){
		const {noResult} = this.state;
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
					<span className={`text-danger ${noResult ? 'show' : 'hidden'}`}>
						<h4>No results found</h4>
					</span>
				</form>
			</div>
		)
	}
}

export default SearchModal;
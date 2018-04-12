import React, {Component} from 'react';
import axios from 'axios';
import {PageHeader, Table, FormControl, FormGroup, Button, Glyphicon, Modal, Label, Popover, OverlayTrigger} from 'react-bootstrap';
import $ from 'jquery';
import './home.css';
import DataTable from './dataTable';
import SearchModal from './searchModal';

class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			empData : null,
			empName: '',
			empId: '',
			empPhone: '',
			empSuper: '',
			addError: false,
			modalShow: false
		};
		this.getEmployeeData = this.getEmployeeData.bind(this);
		this.dataConvert = this.dataConvert.bind(this);
		this.setDataState = this.setDataState.bind(this);
		this.empNameInput = this.empNameInput.bind(this);
		this.empIdInput = this.empIdInput.bind(this);
		this.empPhoneInput = this.empPhoneInput.bind(this);
		this.empSuperInput = this.empSuperInput.bind(this);
		this.handleEmpAdd = this.handleEmpAdd.bind(this);
		this.clearInput = this.clearInput.bind(this);
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.downloadCSV = this.downloadCSV.bind(this);
	}

	componentDidMount(){
		this.getEmployeeData();
	}
	showModal(){
		this.setState({modalShow:true});
	}
	closeModal(){
		this.setState({modalShow:false});
	}
	getEmployeeData(){
		const apiURL = 'http://localhost:8080/HouseCoffee/get_all';
		const request = axios.get(apiURL)
			.then((res)=>{
				const dataArr = this.dataConvert(res.data);
				this.setDataState(dataArr);
			})
			.catch((err)=>{
				console.log(err);
			});
	}
	dataConvert(data){
		const dataStr = data;
		const qChange = dataStr.replace(/'/g,'"');
		const dataArr = JSON.parse(qChange);
		return dataArr;
	}
	setDataState(data){
		this.setState({
			empData: data
		});
	}
	empNameInput(e){
		this.setState({
			empName: e.target.value,
			addError: false
		});
	}
	empIdInput(e){
		this.setState({
			empId: e.target.value,
			addError: false
		});
	}
	empPhoneInput(e){
		this.setState({
			empPhone: e.target.value,
			addError: false
		});
	}
	empSuperInput(e){
		this.setState({
			empSuper: e.target.value,
			addError: false
		});
	}
	clearInput(){
		this.setState({
			empName: '',
			empId: '',
			empPhone: '',
			empSuper: ''
		});
	}
	downloadCSV(){
		const {empData} = this.state;
		let data = [["Name","ID","Phone","Supervisor"]];
		empData.map((emp, idx)=>{
			data.push(emp);
		});
		let csvContent = "data:text/csv;charset=utf-8,";
		data.forEach((row)=>{
			let emp = row.join(",");
			csvContent += emp+"\n";
		});
		var encodeUri = encodeURI(csvContent);
		let linkElmt = $('<a>',{
			class: 'csvLink',
			href: encodeUri,
			download: "employee_data.csv"
		}).appendTo('body');
		$('.csvLink')[0].click();
		$('.csvLink').remove();
		
	}
	handleEmpAdd(e){
		e.preventDefault();
		const {empName, empId, empPhone, empSuper} = this.state;
		if(!empName.length||!empId.length||!empPhone.length||!empSuper.length){
			this.setState({addError: true});
			return;
		}else{
			const empPhoneEdit = empPhone.replace(/\D/g,'');
			const addURL = `http://localhost:8080/HouseCoffee/add_emp?name=${empName}&id=${empId}&phone=${empPhoneEdit}&supervisor=${empSuper}`;
			const request = axios({
				method: 'POST',
				url: addURL
			})
				.then((res)=>{
					console.log(res);
					this.getEmployeeData();
					this.clearInput();
				})
				.catch((err)=>{
					console.log(err);
				});
		}
	}

	render(){
		const dataArr = this.state.empData;
		// console.log(dataArr);
		const {addError} = this.state;
		const tableRows = dataArr ? dataArr.map((emp, index)=>{
			return <DataTable key={index} index={index} employee={emp} refreshData={this.getEmployeeData} />
		}):<tr></tr>;
		const csvPopover = (
			<Popover id="popover-trigger-hover-focus">
				download as CSV
			</Popover>
		);

		return(
			<div className='container-fluid'>
				<div className='page-header col-xs-12 col-sm-10 col-sm-offset-1'>
					<h1 className='hidden-xs h1-responsive'>
						<strong>Employee Table</strong>
						<small>
							<Label>
								Paddy's Pub
							</Label>
						</small>
					</h1>
					<h3 className='visible-xs h3-responsive'>
						<strong>Employee Table</strong>
						<small>
							<Label>
								Paddy's Pub
							</Label>	
						</small>
					</h3>
				</div>

				<div className='form-horizontal col-sm-2 col-sm-push-9'>
					<h4><strong>Add Employee</strong></h4>
					<form>
						<FormGroup className='input-group'>
							<span className='input-group-addon'>
								<Glyphicon glyph="user"/>
							</span>
							<FormControl 
								type='text'
								value={this.state.empName}
								placeholder="Employee Name"
								onChange={this.empNameInput}
							/>
						</FormGroup>
						<FormGroup className='input-group'>
							<span className='input-group-addon'>
								<Glyphicon glyph="info-sign"/>
							</span>
							<FormControl 
								type='text'
								value={this.state.empId}
								placeholder="Employee ID"
								onChange={this.empIdInput}
							/>
						</FormGroup>
						<FormGroup className='input-group'>
							<span className='input-group-addon'>
								<Glyphicon glyph="earphone"/>
							</span>
							<FormControl 
								type='text'
								value={this.state.empPhone}
								placeholder="Employee Phone"
								onChange={this.empPhoneInput}
							/>
						</FormGroup>
						<FormGroup className='input-group'>
							<span className='input-group-addon'>
								<Glyphicon glyph="king"/>
							</span>
							<FormControl 
								type='text'
								value={this.state.empSuper}
								placeholder="Supervisor"
								onChange={this.empSuperInput}
							/>
						</FormGroup>
						<Button className='btn-success btn-block empAddBtn' onClick={this.handleEmpAdd}>
							Add 
						</Button>
						<span className={`${addError ? 'show':'hidden'} text-danger`}>
							Fill in all fields!
						</span>
						<Button className='btn-primary btn-block' onClick={this.getEmployeeData}>
							Load All
						</Button>
						<Button className='btn-info btn-block' onClick={this.showModal}>
							Search
						</Button>
						<OverlayTrigger trigger={['hover','focus']} placement="left" overlay={csvPopover}>
							<Button className='label-default pull-right csvBtn' onClick={this.downloadCSV}>
								<Glyphicon glyph='download-alt' />
							</Button>
						</OverlayTrigger>
					</form>
				</div>

				<div className='col-sm-8 col-sm-pull-1 table-responsive'>
					<Table striped bordered condensed hover>
						<thead className='font-weight-bold'>
							<tr className='warning'>
								<th className='text-center'>Name</th>
								<th className='text-center'>ID</th>
								<th className='text-center'>Supervisor</th>
								<th className='text-center'>Phone</th>
								<th className='text-center'>Delete</th>
							</tr>
						</thead>
						<tbody className='text-center'>
							{tableRows}
						</tbody>
					</Table>
				</div>
				<Modal show={this.state.modalShow} onHide={this.closeModal}>
					<Modal.Header closeButton>
						<Modal.Title>Search Employee</Modal.Title>
						<Modal.Body>
							<SearchModal convertData={this.dataConvert} setData={this.setDataState} closeModal={this.closeModal}/>
						</Modal.Body>
					</Modal.Header>

				</Modal>
			</div>
		)
	}

}

export default Home;
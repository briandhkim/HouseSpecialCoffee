import React, {Component} from 'react';
import axios from 'axios';
import {PageHeader, Table} from 'react-bootstrap';

class Home extends Component{
	constructor(props){
		super(props);
		this.state={};
		this.getEmployeeData = this.getEmployeeData.bind(this);
	}

	componentDidMount(){
		this.getEmployeeData();
	}

	getEmployeeData(){
		const apiURL = 'http://localhost:8080/HouseCoffee/get_all';
		const request = axios.get(apiURL)
			.then((res)=>{
				const dataStr = res.data;
				const qChange = dataStr.replace(/'/g,'"');
				const dataArr = JSON.parse(qChange);
				
				console.log(dataArr, typeof dataArr);
			})
			.catch((err)=>{
				console.log(err);
			});
	}

	render(){
		
		return(
			<div className='container-fluid'>
				<div className='page-header col-xs-12 col-sm-10 col-sm-offset-1'>
					<h1 className='hidden-xs h1-responsive'>
						<strong>Employee Table</strong>
						<small className='pull-right'>Paddy's Pub</small>
					</h1>
					<h3 className='visible-xs h3-responsive'>
						<strong>Employee Table</strong>
						<small className='pull-right'>Paddy's Pub</small>
					</h3>
				</div>

				<div className='form-horizontal col-sm-2 col-sm-push-9'>
					<h4><strong>Add Employee</strong></h4>
				</div>

				<div className='col-sm-8 col-sm-pull-1 table-responsive'>
					<Table striped bordered condensed hover>
						<thead className='font-weight-bold'>
							<tr>
								<th>Name</th>
								<th>ID</th>
								<th>Supervisor</th>
								<th>Phone</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							
						</tbody>
					</Table>
				</div>

			</div>
		)
	}

}

export default Home;
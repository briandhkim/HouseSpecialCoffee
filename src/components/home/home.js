import React, {Component} from 'react';
import axios from 'axios';
import {PageHeader, Table} from 'react-bootstrap';

import DataTable from './dataTable';

class Home extends Component{
	constructor(props){
		super(props);
		this.state={
			empData : null
		};
		this.getEmployeeData = this.getEmployeeData.bind(this);
		this.dataConvert = this.dataConvert.bind(this);
		this.setDataState = this.setDataState.bind(this);
	}

	componentDidMount(){
		this.getEmployeeData();
	}

	getEmployeeData(){
		const apiURL = 'http://localhost:8080/HouseCoffee/get_all';
		const request = axios.get(apiURL)
			.then((res)=>{
				// const dataStr = res.data;
				// const qChange = dataStr.replace(/'/g,'"');
				// const dataArr = JSON.parse(qChange);
				const dataArr = this.dataConvert(res.data);
				this.setDataState(dataArr);
				// console.log(dataArr, typeof dataArr);
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

	render(){
		const dataArr = this.state.empData;
		// console.log(dataArr);
		const tableRows = dataArr ? dataArr.map((emp, index)=>{
			return <DataTable key={index} index={index} employee={emp} refreshData={this.getEmployeeData} />
		}):<tr></tr>;

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

			</div>
		)
	}

}

export default Home;
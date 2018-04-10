import React, {Component} from 'react';
import axios from 'axios';
import {Button, Well, FormGroup, FormControl, Label, Glyphicon} from 'react-bootstrap';

import './login.css';


class Login extends Component{

	constructor(props){
		super(props);
		this.state={
			userName : '',
			passWord : '',
			loginError : false
		}
		this.userNameInput = this.userNameInput.bind(this);
		this.passWordInput = this.passWordInput.bind(this);
		this.clearInput = this.clearInput.bind(this);
		this.checkUser = this.checkUser.bind(this);
	}

	userNameInput(e){
		this.setState({
			userName: e.target.value
		});
	}
	passWordInput(e){
		this.setState({
			passWord : e.target.value
		});
	}
	clearInput(){
		this.setState({
			userName: '',
			password: '',
			loginError : false
		});
	}

	checkUser(){
		const {userName, passWord} = this.state;
		const apiURL = `http://localhost:8080/HouseCoffee/user_check?userName=${userName}&passWord=${passWord}`;
		const request = axios.get(apiURL)
			.then((res)=>{
				// console.log(res.data, typeof res.data);
				if(res.data[0]){
					this.clearInput();
					this.props.loginChange();
				}else{
					this.setState({
						loginError: true
					});
				}
			}).catch((err)=>{
				console.log(err);
			});
	}

	render(){
		const {loginError} = this.state;

		return(
			<div className='container-fluid'>
				<div className='col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12'>
					<Well bsSize="large">
						<h2 className='hidden-xs text-center'>Log In</h2>
						<h4 className='visible-xs text-center'>Log In</h4>

						<Label bsStyle="primary">Username</Label>
						<FormGroup className='input-group'>
							<span className='input-group-addon'>
								<Glyphicon glyph="user"/>
							</span>
							<FormControl 
								type='text'
								value={this.state.userName}
								placeholder="Username"
								onChange={this.userNameInput}
							/>
						</FormGroup>

						<Label bsStyle="info">Password</Label>
						<FormGroup className='input-group'>
							<span className='input-group-addon'>
								<Glyphicon glyph="lock"/>
							</span>
							<FormControl 
								type='password'
								value={this.state.passWord}
								placeholder="Password"
								onChange={this.passWordInput}
							/>
						</FormGroup>

						<Button className='btn-primary loginBtn' onClick={this.checkUser}>
							Log In
						</Button>
						<span>
							<h4 className={`text-danger ${loginError ? 'show':'hidden'}`}>
								invalid username and/or password
							</h4>
						</span>
					</Well>
				</div>
			</div>
		)
	}

}

export default Login;
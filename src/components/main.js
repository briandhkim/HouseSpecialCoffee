import React, {Component} from 'react';

import Home from './home/home';
import Login from './login/login';

class Main extends Component{
	constructor(props){
		super(props);
		this.state={
			loggedIn: false
		};
		this.renderEmpData = this.renderEmpData.bind(this);
		this.loginSuccess = this.loginSuccess.bind(this);
	}

	renderEmpData(){
		return <Home />
	}

	loginSuccess(){
		this.setState({
			loggedIn : true
		});
	}

	render(){
		const {loggedIn} = this.state;
		const checkUser = ()=>{
			return <Home />
		}

		return(
			<div>
				{loggedIn ? <Home/> : <Login loginChange={this.loginSuccess} />}
			</div>
		)
	}
}

export default Main;
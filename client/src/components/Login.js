import React, { Component } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

class Login extends React.Component {
	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route
	state = {
		credentials : {
			username : '',
			password : '',
		},
		isLoggedIn  : false,
	};

	handleChange = (e) => {
		this.setState({
			credentials : {
				...this.state.credentials,
				[e.target.name]: e.target.value,
			},
		});
	};

	login = (e) => {
		e.preventDefault();
		this.setState({
			isLoggedIn : true,
		});
		axiosWithAuth()
			.post('/login', this.state.credentials)
			.then((res) => {
				localStorage.setItem('token', res.data.payload);
				this.props.history.push('/bubbles');
			})
			.catch((err) => console.log(err));
	};
	render() {
		return (
			<div>
				<h1>Welcome to Stephanie's Bubble App!</h1>
				{/*<p>Build a login page here</p> */}
				<form onSubmit={this.login}>
					<input type='text' name='username' value={this.state.credentials.username} onChange={this.handleChange} />
					<input type='password' name='password' value={this.state.credentials.password} onChange={this.handleChange} />
					<button>Log In</button>
					{this.state.isLoggedIn && 'Attempting login'}
				</form>
			</div>
		);
	}
}

export default Login;

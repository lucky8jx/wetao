import React, { Component } from 'react';

import Header from './header/Header';
import Footer from './footer/Footer';

 class App extends Component {
 	render() {
 		console.log("abc");
 		return (
 			<div className="container">
 				<Header />
 				{this.props.children}
 				<Footer />
 			</div>
 		)
 	}
}

export default App;
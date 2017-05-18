import React, { Component } from 'react';

import Main from './Main';

 class App extends Component {
 	render() {
 		let tags=[
 			{
 				id: 1,
 				src: "/message/new",
 				text: "New Message"
 			},
 			{
 				id: 2,
 				src: "/sendedMessage",
 				text: "Sended Message"
 			}
 		];
 		return (				
 			<Main tags={tags}/>
 		)
 	}
}

export default App;
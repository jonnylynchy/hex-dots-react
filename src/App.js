import React, { Component } from 'react';
import GameBoard from './containers/game-board';
import Hud from './containers/hud';
import Footer from './containers/footer';
import './css/properties.css';
import './css/main.css';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<Hud />
				<GameBoard />
				<Footer />				
			</React.Fragment>
    	);
	}
}

export default App;

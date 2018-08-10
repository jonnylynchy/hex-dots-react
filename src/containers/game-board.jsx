import React, { Component } from 'react';
import CanvasComponent from '../components/canvas';
import Dot from '../components/dot';

const colors = ['yellow', 'red', 'green', 'blue', 'purple'];
const DOT_SIZE = 25;
const DOT_PADDING = 20;
const TEXT_ADJUSTMENT = 5.5;
const PADDING_ADJUSTMENT = 20;

class GameBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dots: [],
            containerStyle: {
                width: null,
                height: null
            },
            mouseDown: false,
            targetGroup: [],
            startLineProps: {
                startX: null,
                startY: null,
                color: null
            },
            endLineProps: {
                endX: null,
                endY: null
            }
        };
        this.onDotDown.bind(this);
        this.onDotEnter.bind(this);
        this.onDotPress.bind(this);
        this.addTargetToGroup.bind(this);
        this.areDotsTheSame.bind(this);
    }

    componentDidMount() {
        const width = (window.innerWidth / 100) * 75;
        const height = (window.innerHeight / 100) * 70;
        const dotPixels = DOT_SIZE + DOT_PADDING + 10;
        const columns = Math.floor(width/dotPixels);
        const dotArray = [];

		let rows = Math.floor(height/dotPixels);
		let position = {top: 0, left: 0};
        
		while (rows) {
			let colNum = columns;
			while (colNum > 0) {
                const color = colors[Math.floor(Math.random() * colors.length)]
                const style = {
                    top: position.top,
                    left: position.left
                };
                const dotData = { color, style };
                dotArray.push(dotData);
				position.left += dotPixels;
				colNum--;
			}

			position.left = 0;
			position.top += dotPixels;
			rows--;
        }

        this.setState({ containerStyle: {
            width,
            height
        }})
        this.addInitialDotsToState(dotArray);
    }

    addInitialDotsToState(dots) {
        this.setState({
            dots
        })
    }

    onDotPress(key) {
        // console.log('clicked dot: ', key);
    }

    onDotDown(e) {
        const y = e.target.offsetTop + DOT_SIZE/2;
        const x = e.target.offsetLeft + DOT_SIZE/2;
        const computedStyle = getComputedStyle(e.target, null);
        const color = computedStyle.color;

        this.setState({
            mouseDown: true,
            startLineProps: {
                startX: x + TEXT_ADJUSTMENT,
                startY: y-1,
                color,
            }
        });

        this.addTargetToGroup(e.target);
        
    }

    onDotUp(e) {
        this.setState({
            mouseDown: false
        });

        const dotsAreSame = this.areDotsTheSame(this.state.targetGroup);
        console.log('dots are same: ', dotsAreSame);
        this.setState({ targetGroup: []});
    }

    onDotEnter(e) {
        if(this.state.mouseDown) {
            const y = e.target.offsetTop + DOT_SIZE/2;
            const x = e.target.offsetLeft + DOT_SIZE/2;
            const lastDot = this.state.targetGroup[this.state.targetGroup.length-1];
            const fullDot = Math.floor(DOT_SIZE + DOT_PADDING);
			const lastDotRealY = parseInt(lastDot.style.top, 10) + DOT_SIZE/2;
			const lastDotRealX = parseInt(lastDot.style.left, 10) + DOT_SIZE/2;

            // if the previous dot is more than a dotsize away,
            // don't connect this dot
            if((y > lastDotRealY + (fullDot + PADDING_ADJUSTMENT)) || (y < lastDotRealY - (fullDot + PADDING_ADJUSTMENT))){
                return false;
            } else if((x > lastDotRealX + (fullDot + PADDING_ADJUSTMENT)) || (x < lastDotRealX - (fullDot + PADDING_ADJUSTMENT))){
                return false;
            } else {
                if(!this.state.targetGroup.includes(e.target)) {
                    this.addTargetToGroup(e.target);
                    this.setState({
                        endLineProps: {
                            endX: x + TEXT_ADJUSTMENT,
                            endY: y-1
                        }
                    })
                }
            }
        }
    }

    addTargetToGroup(dotEl) {
        // console.log(dotEl);
        if(!this.state.targetGroup.includes(dotEl)) {
            this.state.targetGroup.push(dotEl);
        }
    }

    areDotsTheSame(dots) {
        const dotColors = dots.reduce((dotClasses, dot) => {
            dotClasses.push(dot.className.substring(4));
            return dotClasses;
        }, []);

		// Reduce equal colors
        return !!dotColors.reduce((a, b) => {
            return (a === b) ? a : NaN;
        });
    }

    render() {
        return (
            <React.Fragment>
                <div draggable="false" className='dots' style={this.state.containerStyle}>
                    {this.state.dots.map((dot, i) => (
                        <Dot
                            key={i}
                            onDotDown={(e) => this.onDotDown(e)}
                            onDotEnter={(e) => this.onDotEnter(e)}
                            onDotUp={(e) => this.onDotUp(e)}
                            onDotPress={() => this.onDotPress(i)} 
                            color={dot.color} 
                            styleObj={dot.style} 
                        />
                    ))}
                    <CanvasComponent 
                        startLineProps={this.state.startLineProps}
                        endLineProps={this.state.endLineProps}
                        width={this.state.containerStyle.width}
                        height={this.state.containerStyle.height}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default GameBoard;
import React, { Component } from 'react';

class CanvasComponent extends Component {
    constructor(props) {
        super(props);
        this.getCanvas.bind(this);
        this.startDrawLine.bind(this);
        this.completeLine.bind(this);
        this.clearLines.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { startLineProps: {startX, startY, color}, endLineProps: {endX, endY} } = nextProps;
        if(startX && startX !== this.props.startLineProps.startX) {
            this.startDrawLine(startX, startY, color);
        }
        if(endX && endX !== this.props.endLineProps.endX) {
            this.completeLine(endX, endY);
        }
    }

    startDrawLine(x, y, color) {
        const ctx = this.getCanvas();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineWidth = 4;
        ctx.strokeStyle = color;
    }

    completeLine(x, y) {
        const ctx = this.getCanvas();
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    clearLines(x = 0, y = 0, width = this.canvas.canvas.width, height = this.canvas.canvas.height) {
        const ctx = this.getCanvas();        
        ctx.clearRect(x, y, width, height);
    }

    getCanvas() {
        return this.refs.canvas.getContext('2d');
    }

    render() {
        return (
            <canvas ref="canvas" width={this.props.width} height={this.props.height} />
        );
    }
}

export default CanvasComponent;
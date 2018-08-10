import React from 'react';
import '../css/dot.css';

export default props => (
    <div draggable="false" 
        className={`${props.color} dot`} 
        style={props.styleObj} 
        onClick={props.onDotPress} 
        onMouseDown={props.onDotDown} 
        onMouseEnter={props.onDotEnter}
        onMouseUp={props.onDotUp}>
    </div>
);
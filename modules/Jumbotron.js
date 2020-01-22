import React, { Component } from 'react';



class Jumbotron extends Component {
    render() {    
        
        return (
            <section className="jumbotron">
                <h1>{this.props.fields.title}</h1>
                <h2>{this.props.fields.subTitle}</h2>
            </section>
        );
    }
}

export default Jumbotron;

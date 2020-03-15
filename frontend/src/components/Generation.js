import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generationActionCreator } from '../actions/generation';
import regeneratorRuntime from "regenerator-runtime";


const MINIMUM_DELAY = 3000;

class Generation extends Component {


  timer = null;

  componentDidMount() {
    this.fetchNextGeneration();
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  async fetchGeneration() {
    try {

      const data = await (await fetch('http://localhost:3000/generation')).json();
      //console.log("generation data", data);

      await this.props.dispatchGeneration(data.generation);
    } catch (error) {
      console.error("Error in Generation Component fetchGeneration method.  ", error);
    }
  };

  async fetchNextGeneration() {
    try {
      await this.fetchGeneration();

      let delay = new Date(this.props.generation.expiration).getTime() - new Date().getTime();

      if (delay < MINIMUM_DELAY) {
        delay = MINIMUM_DELAY;
      }

      this.timer = setTimeout(() => this.fetchNextGeneration(), delay);
    } catch (error) {
      console.error("Error in Generation Componenet fetchNextGeneration method.   ", error);
    }
  }



  render() {
    console.log("this.props", this.props)

    return (<div>

      <h3>Generation {this.props.generation.generationId} Expires on: </h3>
      <h4>{new Date(this.props.generation.expiration).toString()}</h4>

    </div>)
  }
}

const mapStateToProps = (state) => {
  const generation = state.generation;
  return { generation: generation };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchGeneration: (generation) => { return dispatch(generationActionCreator(generation)) }
  }
}

const componentConnector = connect(mapStateToProps, mapDispatchToProps);

export default componentConnector(Generation);

import logo from './logo.svg';
import React from 'react';
import './App.css';

export default function Results() {

    var sessionStorageExists = sessionStorage.getItem('results') != null;

    if (sessionStorageExists) {
        var data = sessionStorage.getItem('results');

        if (data == "SimulationCraft" || data == "incorrect input") {
            return <div>Incorrect input</div>
        }

        if (data == "Simulation in progress") {
            return <div>Simulation in progress</div>
        }

        return <div>
            <p>Simulation results in {data} DPS</p>
        </div>;
    }

    return <div></div>


}
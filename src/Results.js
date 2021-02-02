import logo from './logo.svg';
import React from 'react';
import './App.css';

export default function Results() {
    var data = localStorage.getItem('results')
    var substring = data.substring(data.search("DPS Ranking:"), data.search("HPS Ranking:"))
    return <div>
        <h2>Your simulation results!</h2>
        <p>{substring}</p>
    </div>;
}
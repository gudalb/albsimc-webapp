import logo from './logo.svg';
import './App.css';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import Results from './Results.js';
import Testa from './Test.js';
import React, { useEffect, useState } from 'react';
import { Simulate } from './simulate.js';
import { SimulateQueue } from './simulate.js';

function App() {



  const [alert, setAlert] = useState(false);
  const [itemInput, setItemInput] = useState('');
  const [list, setList] = useState([]);
  const [res, setRes] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (list.length && !alert) {
      return;
    }
    return () => mounted = false;
  }, [alert, list])

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 1000)
    }
  }, [alert])

  const handleSubmit = (e) => {
    e.preventDefault();

    sessionStorage.setItem('results', "Simulation in progress");

    SimulateQueue(itemInput)
      .then((data) => {
        try {
          sessionStorage.setItem('results', data.data.message);
        } catch {

        }
        //setItemInput('');
        setAlert(true);
      })
  };

  return (
    <div className="App-header">

      <h1>
        albSimc
        </h1>

      {/* {alert && <h2> Submit Successful</h2>} */}

      <div className="profile-submit-form">
        <form onSubmit={handleSubmit} >
          <label>
            <p>Simulate</p>
            <textarea placeholder="Paste your simc output" className="profile-text-field" type="text" onChange={event => setItemInput(event.target.value)} value={itemInput} />
          </label><br />
          <button type="submit">Submit</button>
        </form>
      </div>


      <Results />
      {/* 

      <BrowserRouter>
        <nav>
          <ul>
            <Link
              to={{
                pathname: "Results",
                data: res // your data array of objects
              }}
            >Results</Link>
          </ul>
        </nav>
        <Switch>
          <Route path="/Results">
            <Results />
          </Route>
        </Switch>

      </BrowserRouter> */}

    </div>
  );
}

export default App;

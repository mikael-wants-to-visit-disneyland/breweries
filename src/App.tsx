import React from "react";
import logo from "./logo.svg";
import "./App.css";

const PAGE_SIZE = 8;
const API_URL = `https://api.openbrewerydb.org/breweries?per_page=${PAGE_SIZE}`;

function App() {
  const [breweries, setBreweries] = React.useState<[]>([]);
  React.useEffect(() => {
    getAndSetBreweries();
  }, []);
  const getAndSetBreweries = async () =>
    fetch(API_URL)
      .then((result) => result.json())
      .then((bs) => setBreweries(bs))
      .catch((err) => console.error(err));
  console.log(breweries);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

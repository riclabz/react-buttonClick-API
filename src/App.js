import React from "react";
import "./style.css";
import { useState } from "react";

export default function App() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });
  const [apires, setApires] = useState({
    isLoaded: false,
    fetchInitiated: false,
    apiresponse: null,
        errorMessage: null
});

  const colorList = ["red", "blue", "black", "green"];

  const updateColor = (i) => {
    setCar(previousState => {
      return { ...previousState, color: colorList[i] }
    });
  }

  const updateColor2 = (e) => {
    console.log("$$$$$$$ value: ", e.target.value);
    setCar(previousState => {
      return {...previousState, color: colorList[e.target.value]}
    });
  }

  function fetchData () {
    fetch('https://www.anapioficeandfire.com/api/')
    .then(response => response.json())
    .then((res) => {
      console.log("############ API fetch completed: ", JSON.stringify(res));
      setApires(previousState => {
       return { 
            ...previousState, 
            isLoaded: true,
            fetchInitiated: false,
            apiresponse: res }
          });
    },
    (error) => {
      setApires(previousState => {
       return { 
            ...previousState,
            fetchInitiated: false,
            errorMessage: error }
          });
    });
    setApires(previousState => {
      return { 
           ...previousState,  
           fetchInitiated: true
          }
         });
  }

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
      {colorList.map((bColor, i) => (
        <button
        type="button" key={i}
        onClick={() => updateColor(i)}
      >{colorList[i]}</button>))
      }
      <br/>
      {colorList.map((bColor, i) => (
        <button
        type="button" key={i} value={i}
        onClick={(e) => updateColor2(e)}
      >{colorList[i]} 2</button>))
      }
      <br/>
      <button onClick={fetchData}>Fetch Data</button>
      { apires.fetchInitiated && <p>Loading....</p> }
      <table>
        <tbody>
        {
          apires.isLoaded && 
          Object.entries(apires.apiresponse).map(([key,value], i) => (
            <tr>
              <th>{key}</th>: 
              <td>{value}</td>
            </tr>
            ))
        }
        </tbody>
      </table>
    </div>
  );
}


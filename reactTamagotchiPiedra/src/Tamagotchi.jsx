import React, { useState, useEffect } from 'react';


function Tamagotchi() {

  const [hunger, setHunger] = useState(50);
  const [energy, setEnergy] = useState(50);
  const [happiness, setHappiness] = useState(50);
  let id = 1;
  const sendData = async (data) => {
    const response = await fetch("http://localhost:3000/tamagotchi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
  };
  const request = async () => {
    const response = await fetch("http://localhost:3000/tamagotchi");
    const result = await response.json();
    console.log(result);
  };
  const putData = async (data) => {
    const response = await fetch("http://localhost:3000/tamagotchi/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
  };

  useEffect(() => {
    const updateHealthBar = () => {
      const healthBar = document.getElementById('health-bar');
      const healthValue = Math.max(0, Math.min(100, hunger + energy));
      const healthColor = getBarColor(healthValue);
      healthBar.style.width = `${healthValue}%`;
      healthBar.style.backgroundColor = healthColor;

    };
    const data = {
      hunger: hunger,
      energy: energy,
      happiness: happiness,
    }
    putData(data);
    const updateHappinessBar = () => {
      const happinessBar = document.getElementById('happiness-bar');
      const happinessColor = getBarColor(happiness);
      happinessBar.style.width = `${happiness}%`;
      happinessBar.style.backgroundColor = happinessColor;
    };

    updateHealthBar();
    updateHappinessBar();
  }, [hunger, energy, happiness]);
  const feedTamagotchi = () => {
    setHunger(Math.max(0, hunger - 10));
    setHappiness(happiness + 10);
  };

  const playWithTamagotchi = () => {
    setEnergy(Math.max(0, energy - 10));
    setHappiness(happiness + 10);
  };

  const sleepTamagotchi = () => {
    setEnergy(100);
    setHappiness(Math.max(0, happiness - 10));
  };

  const getBarColor = (value) => {
    if (value > 80) {
      return 'green';
    } else if (value > 20) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  return (
    <div className="tamagotchi">
      <h1>Tamagotchi</h1>
      <div className="health-bar-container">
        <div id="health-bar" className="health-bar"></div>
        <p>Health: {hunger + energy}</p>
      </div>
      <div className="happiness-bar-container">
        <div id="happiness-bar" className="happiness-bar"></div>
        <p>Happiness: {happiness}</p>
      </div>
      <button onClick={feedTamagotchi}>Feed</button>
      <button onClick={playWithTamagotchi}>Play</button>
      <button onClick={sleepTamagotchi}>Sleep</button>
    </div>
  );
}

export default Tamagotchi;
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [hours, setHours] = useState<number>(0);
  const [mins, setMins] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: String) => {
    let val: string = e.target.value;

    switch (type) {
      case "mins":
        setMins(Number(val));
        return;
      case "seconds":
        setSeconds(Number(val));
        return;
      case "hours":
        setHours(Number(val));
        return;
      default:
        break;
    }

  }

  useEffect(() => {
    let myInterval: NodeJS.Timer | undefined = undefined;
    if (start) {
      myInterval = setInterval(() => {
        console.log(seconds)
        if (seconds > 0) {
          setSeconds(seconds - 1);
          return;
        }

        if (seconds === 0) {
          if (mins === 0) {
            if (hours === 0) {
              clearInterval(myInterval);
              setStart(false);
              return;
            }

            setSeconds(59);
            setMins(59)
            setHours(hours - 1);
            return
          }

          setSeconds(59);
          if(mins > 0){
            setMins(mins-1);
          }
          return
        }
      }, 1000)
    }

    return () => {
      clearInterval(myInterval);
    }
  }, [start, hours, mins, seconds])

  return (
    <div className="App">
      <div className="time-inputs">
        <input type='text' className='hour' value={hours} onChange={(e) => handleChange(e, "hours")} placeholder="Hours" />
        <span>{"Hours"}</span>
        <input type='text' className='min' value={mins} onChange={(e) => handleChange(e, "mins")} placeholder="Minutes" />
        <span>{"Minutes"}</span>
        <input type='text' className='seconds' value={seconds} onChange={(e) => handleChange(e, "seconds")} placeholder="Seconds" />
        <span>{"Seconds"}</span>
      </div>
      <div className="button-container">
        <button onClick={() => setStart(true)} className="start-button">START</button>
      </div>
    </div>
  );
}


export default App;

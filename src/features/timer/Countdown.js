import { useEffect, useState } from 'react';
import  convertSeconds  from "../../utils/convertSeconds"

const Countdown = ({target,onTimerEnd}) => {
 
  const [seconds, setSeconds] = useState(0);
 
  const [time, setTime] = useState(target);
  
  useEffect(()=> {
    
      const interval = setInterval(()=> {

          setTime((time) => {

              if(time <= 0) {
                  clearInterval(interval);
                  setSeconds(0);
                  onTimerEnd()
                  return 0;
              } else {
                  setSeconds(time);
                  return time - 1;
              }
              
          }); 
      }, 1000);

      return () => clearInterval(interval);

  }, []);

  return (
    <h1 className="timer-text m-0 p-0" >{convertSeconds(seconds)} </h1>
  )
}

export default Countdown;
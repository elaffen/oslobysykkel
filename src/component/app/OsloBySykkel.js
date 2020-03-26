import React, { useState, useEffect } from 'react';
import './OsloBySykkel.css';
import VisSykkelsStatus from '../vissykkelsstatus/VisSykkelsStatus';

const stasjonInformasjonUrl = `https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json`;
const stasjonStatusUrl = `https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json`;

const mergeArrayById = (array1, array2) =>
array1.map(item1 => ({
        ...item1,
        ...array2.find((item2) => (item2.station_id === item1.station_id) && item2)
    }));

    
const OsloBySykkel = () => {
  const [stasjonDetaljertInformasjon, setStasjonDetaljertInformasjon] = useState([]); // initial value = empty array
  const [erOppdatert, setErOppdatert] = useState(false); // initial value = false
  
  useEffect(() => { // Same as componentDidMount
    const fetchData = async () => {
      const stasjonInformasjonResponse = await fetch(stasjonInformasjonUrl);
      const stasjonStatusResponse = await fetch(stasjonStatusUrl);
      return Promise.all([stasjonInformasjonResponse.json(), stasjonStatusResponse.json()]);
    } 
    fetchData()
    .then(responses => {
      // Running setter for state variable stasjonDetaljertInformation
      setStasjonDetaljertInformasjon(mergeArrayById(responses[0].data.stations, responses[1].data.stations));
    })
    .catch(error => {
      console.log(error.message);
    });
    setErOppdatert(true); // Running setter for erOpdatert state.
  }, []); // Adding second argument == run only once

  if(!erOppdatert) {
      return(<div className="OsloBySykke1"> Lasting ...  </div>);
  }
  return (
    <div className="OsloBySykkel">
        <VisSykkelsStatus stations = {stasjonDetaljertInformasjon} />
    </div>
  );
}


export default OsloBySykkel;

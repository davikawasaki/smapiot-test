import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ViewMap from './components/ViewMap';
import Sidebar from './components/Sidebar';
import './data/test.json';
import { CustomMachine } from './models/MachineModel';
import { MapMarkerWrapper, MapMarker } from './models/ViewModel';
import { GoogleMapsConfig, defZoom, defCenter } from './models/ConfigModel';
import { MachineStreamApi } from './services/APIService';
import GoogleMapsApiKeyEnv from './ConfigConstants'
import { toCustomMachine, modifyOriginalMachines, toMarkers } from './services/DataService';
import MachineInfo from './components/MachineInfo';

const App: React.FC = () => {
  let [customMachines, setCustomMachines] = useState(Array<CustomMachine>());
  let [markers, setMarkers] = useState(Array<MapMarkerWrapper>());
  let [centerMarker, setCenterMarker] = useState(defCenter);
  let [zoom, setZoom] = useState(1);
    
  const api = new MachineStreamApi();

  useEffect(() => {
    api.getMachines()
      .then(res => {
        const updatedCustomMachines = toCustomMachine(modifyOriginalMachines(res.data));
        setCustomMachines(updatedCustomMachines);

        const updatedMarkers = toMarkers(updatedCustomMachines);
        setMarkers(updatedMarkers);
        
        if (updatedMarkers.length > 0) setCenterMarker({lat: updatedMarkers[0].lat, lng: updatedMarkers[0].lng});
        setZoom(defZoom);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Router>
      <Sidebar sections={customMachines} />
      <div id="content">
        <Switch>
          <Route exact path="/" component={() => (
            <ViewMap center={new MapMarker(centerMarker.lat, centerMarker.lng)}
              markers={markers}
              config={new GoogleMapsConfig(GoogleMapsApiKeyEnv.prod, zoom)} />
          )} />
          <Route exact path="/machines/:id" component={MachineInfo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

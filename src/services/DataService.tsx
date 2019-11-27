import { CustomMachine, Machine, MachineWrapper } from "../models/MachineModel";
import { MapMarkerWrapper } from "../models/ViewModel";
import moment from "moment";

/**
 * Modify received machines from API to format date
 * @param data 
 */
export const modifyOriginalMachines = (data: Array<Machine>) : Array<Machine> => {
  return data.map(m => modifyOriginalMachine(m));
}

/**
 * Modify generic machine (without events) to format date
 * @param m 
 */
export const modifyOriginalMachine = (m: Machine) : Machine => {
  return new Machine(
    m.status, m.machine_type, m.longitude, m.latitude,
    moment(m.last_maintenance).format("DD/MM/YYYY HH:mm:ss"),
    moment(m.install_date).format("DD/MM/YYYY"),
    m.id, m.floor);
}

/**
 * Modify specific machine to format date
 * @param mw
 */
export const modifyOriginalMachineWrapper = (m: MachineWrapper) : MachineWrapper => {
  m.events.map(e => e.timestamp = moment(e.timestamp).format("DD/MM/YYYY HH:mm:ss"));
  return new MachineWrapper(
    m.events, m.status, m.machine_type, m.longitude, m.latitude,
    moment(m.last_maintenance).format("DD/MM/YYYY HH:mm:ss"),
    moment(m.install_date).format("DD/MM/YYYY"),
    m.id, m.floor);
}

/**
 * Modify specific timestamp to format date
 * @param t
 */
export const modifyOriginalTimestamp = (t: string) => {
  return moment(t).format("DD/MM/YYYY HH:mm:ss");
}
  
/**
 * Convert received machines from API to more details
 * @param data 
 */
export const toCustomMachine = (data: Array<Machine>) : Array<CustomMachine> => {
    return data.map(t => 
      new CustomMachine(
        t.id, t.machine_type, `/machines`, `Machine ${t.id}`,
        `Device located at floor ${t.floor}, installed in ${t.install_date} and with a last maintenance in ${t.last_maintenance}.`,
        t.status, t.latitude, t.longitude))
  }
  
/**
 * Convert custom machines from sidebar to pinpoint markers
 * @param customMachines 
 */
export const toMarkers = (customMachines: Array<CustomMachine>) : Array<MapMarkerWrapper> => {
    return customMachines.map(m =>
        new MapMarkerWrapper(m.lat, m.lng, m.subtext, m.text,
            "blue", m.status === "running"));
}
import { Machines, MachineWrapperApi } from "../models/MachineModel";

const _msApiEndpoints = {
    getMachines: '/machines',
}

class DefaultApi {
    uri: string;

    constructor(uri: string) {
        this.uri = uri
    }
}

export class MachineStreamApi extends DefaultApi {
    constructor() {
        super('https://machinestream.herokuapp.com/api/v1');
    }

    public getMachines = async () : Promise<Machines> => {
        return await new Promise((resolve, reject) => {
            fetch(`${this.uri}${_msApiEndpoints.getMachines}`)
                .then(res => resolve(res.json()))
                .catch(err => reject(err))
        });
        // reject("It wasn't possible to fetch machines due to the following error: " + error);
    }

    public getMachine = async (id: string) : Promise<MachineWrapperApi> => {
        const res = await fetch(`${this.uri}${_msApiEndpoints.getMachines}/${id}`);
        return await res.json();
        // reject("It wasn't possible to fetch machines due to the following error: " + error);
    }
}
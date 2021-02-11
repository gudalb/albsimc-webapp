import axios from "axios";



const util = require('util')

export async function Simulate(profile) {
    if (ValidateProfile(profile)) {
        var res = await axios.post('http://localhost:8080/simulate', { profile: profile });
        return res;
    } else {
        return "incorrect input";
    }
};

export async function SimulateQueue(profile) {
    if (ValidateProfile(profile)) {
        const json = JSON.stringify({ UUID: uuidv4(), profile: profile, timeRequested: Date.now() });
        var res = await axios.post('http://localhost:8080/queuesim', json, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(util.inspect(res, false, null, true /* enable colors */))

        return res;
    } else {
        return "incorrect input";
    }
};

export async function GetResult(uuid) {
    // todo http://localhost:8080/qetresult
}

export async function GetPlaceInQueue(uuid) {
    // todo http://localhost:8080/placeinqueue
}

export async function SimulateArmory(region, realm, charname) {
    var url = "http://localhost:8080/simulate-armory?region=" + region + "&realm=" + realm + "&charName=" + charname;
    var res = await axios.get(url);
    return res;
};

function ValidateProfile(profile) {
    if (profile.includes("level=60")) {
        return true;
    } else {
        return false;
    }
}


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

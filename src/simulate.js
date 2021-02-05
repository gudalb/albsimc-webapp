import axios from "axios";



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
        var res = await axios.post('http://localhost:8080/queue', json, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
            }
        });
        return res;
    } else {
        return "incorrect input";
    }
};

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

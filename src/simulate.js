import axios from "axios";


export async function Simulate(profile) {

    sessionStorage.setItem("queueplace", "-2")

    SimulateQueue(profile);

    var intervalId = window.setInterval(function () {
        var placeinqueue = GetPlaceInQueue();
        console.log(placeinqueue);

        var queueplace = sessionStorage.getItem("queueplace")

        if (queueplace === "-1") {
            console.log("sim no longer in queue, fetching result")
            clearInterval(intervalId)
            GetResult()
        }
    }, 4000);

}

export async function SimulateQueue(profile) {
    var uuid = uuidv4();
    sessionStorage.setItem("uuid", uuid);

    if (ValidateProfile(profile)) {
        const json = JSON.stringify({ UUID: uuid, profile: profile, timeRequested: Date.now() });
        var res = await axios.post('http://localhost:8080/queuesim', json, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return res;
    } else {
        return "error";
    }
}

export async function GetResult() {
    return await axios.get("http://localhost:8080/getresult?uuid=" + sessionStorage.getItem("uuid"))
        .then((response) => {
            console.log(response)
            sessionStorage.setItem("result", response.data.dps)
        });
}

export async function GetAllResult() {
    return axios.get("http://localhost:8080/getallresult")
        .then((response) => {
            console.log(response)
        });
}

export async function GetPlaceInQueue() {
    return await axios.get("http://localhost:8080/placeinqueue?uuid=" + sessionStorage.getItem("uuid"))
        .then((response) => {
            sessionStorage.setItem("queueplace", response.data)
            console.log(response)
        });
}

export async function SimulateArmory(region, realm, charname) {
    var url = "http://localhost:8080/simulate-armory?region=" + region + "&realm=" + realm + "&charName=" + charname;
    var res = await axios.get(url);
    return res;
}

function ValidateProfile(profile) {
    if (profile.includes("level=60")) {
        return true;
    } else {
        return false;
    }
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

import axios from "axios";



export async function Simulate(profile) {
    var res = await axios.post('http://localhost:8080/simulate', { profile: profile });
    console.log(res.data.result);
    return res;
};

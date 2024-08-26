//const fetch = require('node-fetch');
import("node-fetch")
async function get_json(Hub, Station, Email, Password) {
  let acuriteHubName = String(Hub);
  let acuriteStationName = String(Station);
  let EmailS = String(Email);
  let PasswordS = String(Password);
  let accountId = null;
  let token = null;

  // pretending-ish to be a browser
  let headers = {
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://www.myacurite.com/",
    "Accept-Language": "en-us",
    "Accept": "application/json",
    "Referer": "https://www.myacurite.com/",
    "DNT": "1"
  };

  // Function to get a new token
  async function getNewToken() {
    const credentials = {
      "remember": true,
      "email": EmailS,
      "password": PasswordS
    };

    let response = await fetch('https://marapi.myacurite.com/users/login', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(credentials)
    });
    let tokenData = await response.json();

    accountId = tokenData['user']['account_users'][0]['account_id'].toString();
    token = tokenData['token_id'];

    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  if (!token) {
    await getNewToken();
  }

  headers['x-one-vue-token'] = token;

  let hubs;
  try {
    let response = await fetch('https://marapi.myacurite.com/accounts/' + accountId + '/dashboard/hubs/', { headers: headers });
    hubs = await response.json();
  } catch (e) {
    await getNewToken();
    headers['x-one-vue-token'] = token;

    let response = await fetch('https://marapi.myacurite.com/accounts/' + accountId + '/dashboard/hubs/', { headers: headers });
    hubs = await response.json();
  }

  //console.log(JSON.stringify(hubs));

  let hubId = hubs.account_hubs.find(hub => hub.name === acuriteHubName).id.toString();

  let response = await fetch('https://marapi.myacurite.com/accounts/' + accountId + '/dashboard/hubs/' + hubId, { headers: headers });
  let sensors = await response.json();

  //  console.log(JSON.stringify(sensors));
 

  // Examples for how to read specific values from your weather station
  //note the syntax may be different depending on your model of weather station, replace the varaible name
  //
  //const DATAVARIABLE = sensors.devices[0].wired_sensors.find(sensor => sensor.sensor_code === "NAME-OF-JSON-HEADER").last_reading_value;
  //
  //This example saves the current lightning strike count to the variable named LightningStrikeCnt
  //const lightningStrikeCnt = sensors.devices[0].wired_sensors.find(sensor => sensor.sensor_code === "LightningStrikeCnt").last_reading_value;






  return (JSON.stringify(sensors));
}


// The get_json function takes 4 input parameters in the following order
//
//Hub - The name of your weatherhub in myacurite
//Station - The name of you station in myacurite
//Email - The email used for signing into your myacurite account
//Password - The password for your myacurite account
//

// this prints the json to your console for debug purposes
get_json('Hub', 'Station', 'Email', 'Password').then(data => {
  console.log(data);
}).catch(error => {
  console.error('Error:', error);
});
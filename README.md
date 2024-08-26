### Acurite JSON Scraper

This project was created as a way to get data from your myacurite connected weather station. 
It is useful because acurite, currently, does not provide an API.
It works by pretending to be a web browser and fetches the data that would be displayed in your dashboard, outputting the raw JSON string 
allowing you to easily integrate your weather data into your projects/databases.


HOW TO USE:

Simply input the four required parameters into the function and it will output the JSON data obtained from myacurite

Hub - The name of your weatherhub in myacurite
Station - The name of you station in myacurite
Email - The email used for signing into your myacurite account
Password - The password for your myacurite account

Examples for how to read specific values from your weather station
 
 note the syntax may be different depending on your model of weather station, replace the varaible name 

  const DATAVARIABLE = sensors.devices[0].wired_sensors.find(sensor => sensor.sensor_code === "NAME-OF-JSON-HEADER").last_reading_value;
  
  This example saves the current lightning strike count to the variable named LightningStrikeCnt

  const lightningStrikeCnt = sensors.devices[0].wired_sensors.find(sensor => sensor.sensor_code === "LightningStrikeCnt").last_reading_value;


# Based on WundergroundStationForwarder
The code for this project is based on a modified version of the refreshFromAcurite function from [WundergroundStationForwarder](https://github.com/leoherzog/WundergroundStationForwarder) 
No other parts of the original code are used.
I also ported the function away from Google Apps Script to pure javascript allowing you to run it locally on node.js


# Dependencies
The only dependency is node-fetch.
I have tested it only on Node.js v20.16.0, support for earlier versions is not guaranteed (but will likely work)

## License
Acurite JSON Scraper is licensed under the following:


[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)

Acurite JSON Scraper is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).







## License of Wunderground Station Forwarder

This source is licensed as follows:

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)

Station Forwarder is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).


import { writeToInflux } from '../../lib/influxClient.mjs';

const bucket = 'Microgrid';

const batterySimulator = async (req, res) => {
    //Inintialize battery parameters
    let chargeLevel = 50;
    const voltage = 12.0;
    const capacity = 100;
    const chargeRate = 5;
    const dischargeRate = 5;

    //Simulate battery level every second
    setInterval(async() => {
        if(Math.random() > 0.5) {
            chargeLevel += (chargeRate/capacity) * 100;
        } else {
            chargeLevel -= (dischargeRate/capacity) * 100;
        }

        //Ensure charge level stays within 0 - 100%
        chargeLevel = Math.max(0, Math.min(100, chargeLevel));

        //Prepare data point for influxDB
        
    })
}
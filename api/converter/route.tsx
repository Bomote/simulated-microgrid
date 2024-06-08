import { writeToInflux } from "@/lib/influxClient.mjs";

const bucket = 'Microgrid';

const converterSimulator = async(req:any, res:any) => {
    //Simulate converter behaviour every second
    setInterval(async() => {
        const inputVoltage = 12 + Math.random() * 1; //Randomize input voltage
        const outputVoltage = 120 + Math.random() * 10; //Randomize output voltage
        const status = Math.random() > 0.1 ? 'ON' : 'OFF'; //Randomize status

        //Prepare data point for InfluxDB
        const data = {
            measurement: 'converter',
            tags: {device: 'converter_1'},
            fields: {value: inputVoltage},
            timestamp: Date.now(),
            bucket: bucket,
        };

        //write data to InfluxDB
        await writeToInflux(data);

        console.log(`Converter input voltage: ${inputVoltage.toFixed(2)}V, Output voltage: ${outputVoltage.toFixed(2)}V, Status: ${status}`);
    }, 1000);

    res.status(200).json({message: 'Converter simulation started'});
}

export default converterSimulator;
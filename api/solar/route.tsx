import { writeToInflux } from "@/lib/influxClient.mjs";

const bucket = 'Microgrid';

const solarSimulator = async(req:any, res:any) => {
    //Simulate solar panel behaviour every second
    setInterval(async() => {
        const hourOfDay = new Date().getHours();
        let output;
        if(6 <= hourOfDay && hourOfDay <= 18) {
            output = ((hourOfDay - 6)/12) * 100; //Simulate peak output at noon
        } else {
            output = 0; //No output at night
        }

        //Prepare data point for InfluxDB
        const data = {
            measurement: 'solar_panel',
            tags: {device: 'solar_panel_1'},
            fields: {value: output},
            timestamp: Date.now(),
            bucket: bucket,
        };

        //Write to InfluxDB
        await writeToInflux(data);

        console.log(`Solar Output: ${output.toFixed(2)}W`);
    }, 1000)

    res.status(200).josn({message: 'Solar panel simulation started'});
}

export default solarSimulator;
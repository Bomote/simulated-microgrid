import { useEffect, useState } from "react";

import axios from "axios";
import { Line } from "react-chartjs-2";

const BatteryChart = () => {
    //State to hold chart data
    const [ data, setData ] = useState({
        labels: [],
        datasets: [
            {
                label: 'Battery charge level',
                data: [],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    });


    useEffect(()=>{
        const fetchData = async() => {
            //Fetch battery data from API
            const result = await axios.get('/api/battery');
            const labels = result.data.map((entry:any) => new Date(entry.timestamp).toLocaleTimeString());
            const values = result.data.map((entry:any) => entry.value);

            setData({
                labels: labels,
                datasets: [
                    {
                        label: 'Battery charge level',
                        data: values,
                        fill: false,
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderColor: 'rgba(75,192,192,1)',
                    },
                ],
            });
        };

        fetchData()
    }, []);

    return <Line data={data}/>
};

export default BatteryChart;
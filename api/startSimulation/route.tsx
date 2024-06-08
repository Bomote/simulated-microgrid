import axios from "axios";

const startSimulations = async (req:any, res:any) => {
    const startSimulation = async(path:any) => {
        await axios.get(`http://localhost:3000/api/${path}`);
    };

    //Start simulation for battery, converter and solar panel
    await startSimulation('battery');
    await startSimulation('converter');
    await startSimulation('solar');

    res.status(200).json({message: 'All simulations started'});
}

export default startSimulations
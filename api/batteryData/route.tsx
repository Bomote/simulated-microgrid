import { queryInflux } from "@/lib/influxClient.mjs";

export default async function handler(req:any, res:any) {
    const query = `SELECT * FROM 'battery' WHERE time >= now() - interval '1 hour' ORDER BY time ASC`;
    const bucket = 'Microgrid';
    const data = await queryInflux(query, bucket);

    res.status(200).json(data);
}
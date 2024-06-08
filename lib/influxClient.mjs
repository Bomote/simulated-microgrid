import {InfluxDBClient, Point} from '@influxdata/influxdb3-client';

//Load token from env
const token = process.env.INFLUXDB_TOKEN

//Initialize the influxDB client
const client = new InfluxDBClient({ host: 'https://eu-central-1-1.aws.cloud2.influxdata.com', token });

/**
 * Function to write data to influxDB
 * @param {object} data - Data to be written to influxDB
 */

export const writeToInflux = async (data) => {
    const point = new Point(data.measurement)
    .setTag('device', data.tags.device)
    .setFloatField('value', data.tags.vlaue)
    .timestamp(new Date(data.timestamp));

    await client.write(point, data.bucket)
}

/**
 * Function to query data from influxDB
 * @param {string} query - SQL query string
 * @param {string} bucket - InfluxDB bucket name
 * @returns {Array} - Array of query results
 */

export const queryInflux = async (query, bucket) => {
    const rows  = await client.query(query, bucket);
    const results = [];
    for await (const row of rows) {
        result.push(row);
    }
    return results;
};
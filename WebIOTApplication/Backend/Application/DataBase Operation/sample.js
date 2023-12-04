const { InfluxDB, FieldType } = require('influx');

const influx = new InfluxDB({
    host: 'localhost', // InfluxDB server address
    port: 8086,        // InfluxDB server port
    database: 'mydb',  // Database name
});

async function createDatabaseAndMeasurement() {
    try {
        // Create the database if it doesn't exist
        await influx.createDatabase('mydb');

        // Define the schema for the measurement (table)
        const schema = [
            {
                measurement: 'sensorData',  // Measurement (table) name
                fields: {
                    temperature: FieldType.FLOAT,
                    humidity: FieldType.FLOAT,
                },
                tags: [],
            },
        ];

        // Create the measurement with the defined schema
        await influx.createRetentionPolicy('defaultPolicy', {
            database: 'mydb',
            duration: '7d',
            replication: 1,
            isDefault: true,
        });
        await influx.createMeasurement('sensorData', schema);

        console.log('Database and measurement created successfully.');
    } catch (err) {
        console.error('Error creating database and measurement:', err);
    }
}

createDatabaseAndMeasurement();

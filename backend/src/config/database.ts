const { createConnection } = require("typeorm");

async function connectDB() {
    try {
        const connection = await createConnection();
        if (connection?.isConnected) {
            const { host, database, port } = connection?.options;
            console.log(`@@@@ Querying at http://${host}:${port}`);
        } else {
            throw new Error("@@@@ Failed to Connect Database");
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connectDB;

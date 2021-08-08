const { createConnection } = require("typeorm");

class DatabaseManager {
    static connectDatabse = async () => {
        try {
            const connection = await createConnection();
            await connection.synchronize();
            if (connection?.isConnected) {
                const { host, database, port } = connection?.options;
                console.log(`@@@@ Persiting at http://${host}:${port}`);
            } else {
                throw new Error("@@@@ Failed to Connect Database");
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = DatabaseManager;

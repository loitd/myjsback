// Support Oracle connection from Node
// https://oracle.github.io/node-oracledb/INSTALL.html#instwin
// - Oracle client 19 requires the Visual Studio 2017 Redistributable.
// - Oracle client 18 and 12.2 require the Visual Studio 2013 Redistributable.
// - Oracle client 12.1 requires the Visual Studio 2010 Redistributable.
// - Oracle client 11.2 requires the Visual Studio 2005 Redistributable.

const oracledb = require('oracledb');

try {
    // oracledb.initOracleClient({libDir: 'D:\\code\\myjsback\\setup\\oracle\\instantclient_19_9'});
    oracledb.initOracleClient({libDir: 'setup\\oracle\\instantclient_19_9'});
} catch (err) {
    console.error('Whoops!');
    console.error(err);
    process.exit(1);
}

( async()=>{
    let conn;
    
    try {
        conn = await oracledb.getConnection({
            user: "test",
            password: "123",
            connectString: "localhost/XEPDB1"
        });

        const res = await conn.execute(`SELECT * FROM dual WHERE id = :id`, [10101]);

        console.log(res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err){
                console.error(err);
            }
        }
    }

} )();
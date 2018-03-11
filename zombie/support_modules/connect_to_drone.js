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

    // send an awake message on the channel
    drone.publish({
        room: 'core',
        message: process.env.USERDOMAIN + ' is now awake'
    });
});

// create a new connection to the scaledrone server
// TODO remove key before push
var drone = new Scaledrone('TNjlnJtr3GgwfY8t');

// open the connection to the server
drone.on('open', function(error) {
    if (error)
        console.log(error);

    console.log('connected to channel');
    // set up channel listener
    var channel = drone.subscribe('core');
    startListening(channel);
});

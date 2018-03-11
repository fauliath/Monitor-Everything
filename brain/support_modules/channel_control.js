const storage = require('electron-json-storage');

function startListening(channel) {

    // create a new connection to the scaledrone channel
    console.log('attempting channel connection ...');

    channel.on('open', function(error) {
        if (error)
            console.log(error);

        // if we reach this point, we have connected to the channel
        console.log('connected to channel, setting up listeners ...');
    });

    listen(channel);
}

function listen(channel) {
    // this will trigger whenever data is received
    channel.on('data', function(data) {
        appendToPage(data);
    });
}

function appendToPage(data) {

    var id = data.id;

    // check if the zombie already exists in the platform
    if (document.getElementById(id)) {
        materialize.toast('A machine that already exists is trying to connect.', 4000);
        return;
    }

    // generate the sonar for insertion
    new_sonar = appendNew(data, id);

    // insert the sonar to the main window, which will be white
    document.getElementById('all_zombies').innerHTML += new_sonar;

    // after 1 minute, the sonar will change to an okay state colour
    setTimeout(function () {
        document.getElementById(id).innerHTML = appendOkay(data, id);
    }, 60000);
}

function appendNew(data, id) {

    var append_new = `
        <div id="`+ id +`">
            <div class="col s4" style="margin-top: 2%; text-align: center">
                <div class="new-emitter" style="margin-bottom: 3%">
                    <div class="new-wave"></div>
                </div>
                <h5 class="c-header">`+ data.name +`</h5>
            </div>
        </div>
    `;

    return append_new;
}

function appendOkay(data, id) {
    var append_okay = `
        <div id="`+ id +`">
            <div class="col s4" style="margin-top: 2%; text-align: center">
                <div class="okay-emitter" style="margin-bottom: 3%">
                    <div class="okay-wave"></div>
                </div>
                <h5 class="c-header">`+ data.name +`</h5>
            </div>
        </div>
    `;

    return append_okay;
}

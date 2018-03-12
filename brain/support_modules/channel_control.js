const Store = require('electron-store');
const store = new Store();

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

        // check if the zombie already exists in the platform
        if (document.getElementById(data.id)) {
            //return;
        }

        appendToPage(data);
    });
}

function appendToPage(data) {

    var id = data.id;

    // write the new id to the list of the existing machines
    var existing_machines = store.get('machine_ids');

    store.set('machine_ids', existing_machines + ',' + id);

    // generate the sonar for insertion
    new_sonar = appendNew(data, id);

    // insert the sonar to the main window, which will be white
    document.getElementById('all_zombies').innerHTML += new_sonar;

    // after 1 minute, the sonar will change to an okay state colour
    setTimeout(function () {
        document.getElementById(id).innerHTML = appendOkay(data, id);
    }, 6000);
}

function appendNew(data, id) {

    var append_new = `
        <div class="col-sm-4" style="margin-top: 2%; text-align: center" id="`+ id +`">
            <div class="new-emitter" style="margin-bottom: 1%">
                <div class="new-wave"></div>
            </div>
            <h5 class="c-header">`+ data.name +`</h5>
        </div>
    `;

    return append_new;
}

function appendOkay(data, id) {
    var append_okay = `
        <div class="okay-emitter" style="margin-bottom: 1%">
            <div class="okay-wave"></div>
        </div>
        <h5 class="c-header">`+ data.name +`</h5>
    `;

    return append_okay;
}

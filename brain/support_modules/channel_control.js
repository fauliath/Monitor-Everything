var sonar_id = 0;

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
        console.log(data);
    });
}

function appendToPage(data) {

    var id = generateNewId();

    new_sonar = appendNew(data, id);

    // add a new pulsating sonar to the main window, which will be white
    document.getElementById('all_zombies').innerHTML += new_sonar;

    // after 1 minute, the sonar will change to an okay state colour
    setTimeout(function () {
        document.getElementById(id).innerHTML = appendOkay(data, id);
    }, 6000);
}

function appendNew(data, id) {

    var append_new = `
        <div id="`+ id +`">
            <div class="col-md-4" style="margin-top: 5%; text-align: center">
                <div class="new-emitter" style="margin-bottom: 2%">
                    <div class="new-wave"></div>
                </div>
                <h4 class="c-header">`+ data.name +`</h4>
            </div>
        </div>
    `;

    return append_new;
}

function appendOkay(data, id) {
    var append_okay = `
        <div id="`+ id +`">
            <div class="col-md-4" style="margin-top: 5%; text-align: center">
                <div class="okay-emitter" style="margin-bottom: 2%">
                    <div class="okay-wave"></div>
                </div>
                <h4 class="c-header">`+ data.name +`</h4>
            </div>
        </div>
    `;

    return append_okay;
}

function generateNewId() {
    return Math.floor((Math.random() * 100000) + 1);
}

var Cylon = require('cylon');
var ws = require('nodejs-websocket');


// Initialise the robot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .on("ready", fly);
    

// Fly the bot
var bot;
var maxSpeed = 1;
function fly(robot) {
    bot = robot;
    bot.drone.disableEmergency();
    bot.drone.ftrim();
    bot.drone.takeoff();
    front(maxSpeed);
    left(0.43);
    up(0.1);

    after(5.2 * 1000, function () {
        left(0);
        front(0);
        up(0);
        right(maxSpeed)
    });
    after(3.6 * 1000, function() {
        right(0);
        back(maxSpeed);
        left(0.43);
        down(0.1)
    });
    after(5.2 * 1000, function(){
        bot.drone.land()
    });
    afterfter(7.5 * 1000, function () {
        bot.drone.stop();

    });
    bot.nav.on("navdata", function (data) {
        console.log(data);
    });
    bot.nav.on("batteryChange", function(data) {
        console.log("Battery level:", data);
    });
    bot.nav.on("altitudeChange", function(data) {
        console.log("Altitude:", data);
        if (altitude > 1.5) {
            bot.drone.land();
        }
    });

}

Cylon.start();


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
    bot.drone.up(1);
    after( 1000, function() {
        bot.drone.front(maxSpeed);
        bot.drone.left(0.35);
    });

    after(3 * 1000, function () {
        bot.drone.stop();
        bot.drone.right(maxSpeed)
    });
    after(4.35 * 1000, function() {
        bot.drone.stop();
        bot.drone.back(maxSpeed);
        bot.drone.left(0.35);

    });
    after(6.35 * 1000, function() {
        bot.drone.down(1)
    });
    after(7.35 * 1000, function(){
        bot.drone.land()
    });
    after(8.35 * 1000, function () {
        bot.drone.stop();

    });



}

Cylon.start();


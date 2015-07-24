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
        bot.drone.right(0.35);
    });

    after(3.2 * 1000, function () {
        bot.drone.stop();
        bot.drone.left(maxSpeed)
    });
    after(5.55 * 1000, function() {
        bot.drone.stop();
        bot.drone.back(maxSpeed);
        bot.drone.right(0.35);

    });
    after(8.75 * 1000, function() {
        bot.drone.down(1)
    });
    after(9.75 * 1000, function(){
        bot.drone.land()
    });
    after(10.75 * 1000, function () {
        bot.drone.stop();

    });



}

Cylon.start();


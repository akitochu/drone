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
    bot.drone.up(0.7);
    after(3 * 1000, function() {
        bot.drone.front(maxSpeed);
        bot.drone.right(1.5);
    });

    after(5 * 1000, function () {
        bot.drone.hover();
        bot.drone.left(maxSpeed)
    });
    after(7.35 * 1000, function() {
        bot.drone.hover();
        bot.drone.back(maxSpeed);
        bot.drone.right(1.5);

    });
    after(8.2 * 1000, function() {
        bot.drone.down(0.7)
    });
    after(9.2 * 1000, function(){
        bot.drone.land()
    });
    after(10.2 * 1000, function () {
        bot.drone.stop();

    });



}

Cylon.start();


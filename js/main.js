var particlesWaterList;
var particlesMistList;
var gun;
var car;
var shapes;

class PixelCars extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("gun", "assets/gun.png");
    this.load.image("character", "assets/character.png");

    this.load.image("car", "assets/car_test.png");
    this.load.json("shapes", "assets/car_test.json");

    this.load.plugin("rexvirtualjoystickplugin", "js/rexvirtualjoystickplugin.min.js", true)
    this.load.atlas("water", "assets/water.png", "assets/water.json");
    this.load.atlas("mist", "assets/mist.png", "assets/mist.json");
  }

  create() {
    /*
    this.joyStick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: 400,
      y: 300,
      radius: 100,
      base: this.add.circle(0, 0, 100, 0x888888),
      thumb: this.add.circle(0, 0, 50, 0xcccccc)
    }).on("update", this.dumpJoyStickState, this);

    this.text = this.add.text(0, 0);
    this.dumpJoyStickState();
    */

    var shapes = this.cache.json.get("shapes");
    this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
    var car = this.matter.add.sprite(300, game.scale.height - 27, "car", "car", { shape: shapes.car_test });
    this.matter.add.sprite(260, game.scale.height - 70, "car", "car", { shape: shapes.car_test });
    this.matter.add.sprite(330, game.scale.height - 100, "car", "car", { shape: shapes.car_test });
    this.matter.add.sprite(330, game.scale.height - 160, "car", "car", { shape: shapes.car_test });
    //car.setScale(1);

    var character = this.add.sprite(100, game.scale.height - 32, "character");
    gun = this.add.sprite(100, 250, "gun");

    var particlesWater = this.add.particles("water");
    var particlesMist = this.add.particles("mist");

    var emitterX = 600;
    var emitterY = 100;
    var emitterAngle = {
      min: 150,
      max: 180
    };
    var emitterSpeed = { min: 220, max: 350};
    var emitterGravityY = 50;
    var emitterBounce = 0.1;
    var emitterLifespan = {
      min: 500,
      max: 700
    };
    var emitterScale = {
      start: 10,
      end: 0
    };
    var emitterBounds = {
      x: 0,
      y: 0,
      width: 800,
      height: 600
    };
    var emitterAlpha = { start: 0.35, end: 0 };

    particlesWaterList = [];
    particlesMistList = [];

    // Create pressure washer particle emitters.
    for (let i = 0; i < 3; i++) {
      let rotateStart = 0;
      let rotateEnd = 360;
      if (i == 0) {
        rotateStart = 0;
        rotateEnd = 360;
      } else if (i == 1) {
        rotateStart = 0;
        rotateEnd = 140;
      }
      let emitter = particlesMist.createEmitter({
        frame: ["mist1", "mist2", "mist3"],
        x: emitterX,
        y: emitterY,
        angle: { min: 140, max: 190 },
        speed: { min: 300, max: 30 },
        gravityY: -50,
        //bounce: emitterBounce,
        //maxParticles: 6000,
        //frequency: 10,
        lifespan: { min: 1800, max: 2000},
        scale: {
          start: 2,
          end: 4
        },
        rotate: { start: rotateStart, end: rotateEnd },
        //bounds: emitterBounds,
        alpha: { start: 0.25, end: 0 }
        //blendMode: "ADD"
      });

      emitter.on = false;
      particlesMistList.push(emitter);
    }

    for (let i = 0; i < 20; i++) {
      let emitter = particlesWater.createEmitter({
        frame: ["water1", "water2", "water3"],
        targets: gun,
        x: emitterX,
        y: emitterY,
        angle: emitterAngle,
        speed: emitterSpeed,
        gravityY: -70,
        bounce: emitterBounce,
        //maxParticles: 6000,
        //frequency: 100,
        lifespan: emitterLifespan,
        scale: {
          start: 2,
          end: 6
        },
        rotate: {
          start: i * 30,
          end: i + 360
        },
        bounds: emitterBounds,
        alpha: emitterAlpha
        //blendMode: "ADD"
      });

      emitter.on = false;
      particlesWaterList.push(emitter);
    }
  }

  update() {
    gun.setDepth(1);

    for (let i = 0; i < particlesWaterList.length; i++) {
      //gun.addChild(particlesWaterList[i]);
      particlesWaterList[i].setPosition(gun.x + 30, gun.y - 16);
      particlesWaterList[i].setAngle({ min: gun.angle - 20, max: gun.angle + 20 });
    }
    particlesWaterList[particlesWaterList.length - 1].setAngle({ min: gun.angle - 25, max: gun.angle + 25 });
    particlesWaterList[particlesWaterList.length - 2].setAngle({ min: gun.angle - 30, max: gun.angle + 30 });

    for (let i = 0; i < particlesMistList.length; i++) {
      particlesMistList[i].setPosition(gun.x + 30, gun.y - 16);
      particlesMistList[i].setAngle({ min: gun.angle - 30, max: gun.angle + 30 });
    }

    if (game.input.activePointer.isDown) {
      for (let i = 0; i < particlesMistList.length; i++) {
        particlesMistList[i].on = true;
      }
      for (let i = 0; i < particlesWaterList.length; i++) {
        particlesWaterList[i].on = true;
      }
    } else {
      for (let i = 0; i < particlesMistList.length; i++) {
        particlesMistList[i].on = false;
      }
      for (let i = 0; i < particlesWaterList.length; i++) {
        particlesWaterList[i].on = false;
      }
    }

    this.input.on("pointermove", function(pointer) {
      let cursor = pointer;
      let angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(gun.x, gun.y, pointer.x, pointer.y);
      gun.setAngle(angle);
      for (let i = 0; i < particlesMistList.length; i++) {
        particlesMistList[i].setPosition(gun.x + 30, gun.y - 16);
        particlesMistList[i].setAngle({ min: gun.angle - 30, max: gun.angle + 30 });
      }
      for (let i = 0; i < particlesWaterList.length; i++) {
        //particlesWaterList[i].setPosition(gun.x + 30, gun.y - 16);
        //let radians = gun.angle * Math.PI / 180;
        //let newY = gun.y * Math.cos(radians) - gun.x * Math.sin(radians);
        //let newX = gun.y * Math.sin(radians) - gun.x * Math.cos(radians);
        //particlesWaterList[i].setPosition(newX, newY);
        //particlesWaterList[i].setAngle({ min: gun.angle - 30, max: gun.angle + 30 });
      }
    });
  }

  /*
  dumpJoyStickState() {
    var cursorKeys = this.joyStick.createCursorKeys();
    var s = "Key down: ";
    for (var name in cursorKeys) {
      if (cursorKeys[name].isDown) {
        s += name + " ";
      }
    }
    s += "\n";
    s += ('Force: ' + Math.floor(this.joyStick.force * 100) / 100 + '\n');
    s += ('Angle: ' + Math.floor(this.joyStick.angle * 100) / 100 + '\n');
    this.text.setText(s);
  }
  */
}

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#555",
  pixelArt: true,
  physics: {
    default: "matter",
    matter: {
      debug: true
    }
  },
  //parent: "phaser-example",
  scene: PixelCars
};

var game = new Phaser.Game(config);
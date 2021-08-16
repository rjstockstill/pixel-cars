class PixelCars extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    //this.load.image("spark", "assets/blue.png");
    this.load.plugin("rexvirtualjoystickplugin", "js/rexvirtualjoystickplugin.min.js", true)
    this.load.atlas("water", "assets/water.png", "assets/water.json");
    this.load.atlas("mist", "assets/mist.png", "assets/mist.json");
  }

  create() {
    this.joyStick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: 400,
      y: 300,
      radius: 100,
      base: this.add.circle(0, 0, 100, 0x888888),
      thumb: this.add.circle(0, 0, 50, 0xcccccc)
    }).on("update", this.dumpJoyStickState, this);

    this.text = this.add.text(0, 0);
    this.dumpJoyStickState();

    var particlesWater = this.add.particles("water");
    var particlesMist = this.add.particles("mist");

    var emitterX = 600;
    var emitterY = 100;
    var emitterAngle = {
      min: 150,
      max: 180
    };
    var emitterSpeed = 300;
    var emitterGravityY = 50;
    var emitterBounce = 0.1;
    var emitterLifespan = {
      min: 1200,
      max: 1500
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

    var particlesWaterList = [];
    var particlesMistList = [];

    // Create pressure washer particle emitters.
    for (let i = 0; i < 10; i++) {
      let emitter = particlesWater.createEmitter({
        frame: ["water1", "water2", "water3"],
        x: emitterX,
        y: emitterY,
        angle: emitterAngle,
        speed: emitterSpeed,
        gravityY: emitterGravityY,
        bounce: emitterBounce,
        //maxParticles: 6000,
        //frequency: 100,
        lifespan: emitterLifespan,
        scale: {
          start: 2,
          end: 10
        },
        rotate: {
          min: 60,
          max: 360
        },
        bounds: emitterBounds,
        alpha: emitterAlpha,
        blendMode: "ADD"
      });

      particlesWaterList.push(emitter);
    }

    for (let i = 0; i < 2; i++) {
      let emitter = particlesMist.createEmitter({
        frame: ["mist1", "mist2", "mist3"],
        x: emitterX,
        y: emitterY,
        angle: { min: 120, max: 210 },
        speed: 200,
        gravityY: 10,
        //bounce: emitterBounce,
        //maxParticles: 6000,
        //frequency: 10,
        lifespan: { min: 3000, max: 3500},
        scale: {
          start: 2,
          end: 8
        },
        rotate: { min: 60, max: 360 },
        //bounds: emitterBounds,
        alpha: emitterAlpha,
        blendMode: "ADD"
      });

      particlesMistList.push(emitter);
    }
  }

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
}

var config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  backgroundColor: "0x333333",
  pixelArt: true,
  //parent: "phaser-example",
  scene: PixelCars
};

var game = new Phaser.Game(config);
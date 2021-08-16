var config = {
  type: Phaser.WEBGL,
  width: 800,
  height:600,
  backgroundColor: "#000",
  //parent: "phaser-example",
  scene: {
    preload: preload,
    create: create
  }
};

var game = new Phaser.Game(config);

function preload () {
  //this.load.image("spark", "assets/blue.png");
  this.load.atlas("water", "assets/water.png", "assets/water.json");
  this.load.atlas("mist", "assets/mist.png", "assets/mist.json");
}

function create () {
  var particles = this.add.particles("water");
  var particlesMist = this.add.particles("mist");

  var emitterX = 600;
  var emitterY = 100;
  var emitterAngle = { min: 150, max: 180 };
  var emitterSpeed = 800;
  var emitterGravityY = 200;
  var emitterBounce = 0.1;
  var emitterLifespan = { min: 1500, max: 1800};
  var emitterScale = { start: 10, end: 0 };
  var emitterBounds = { x: 0, y: 0, width: 800, height: 600 };
  var emitterAlpha = 0.35;

  var emitter1 = particles.createEmitter({
    frame: ["water1", "water2", "water3"],
    x: emitterX,
    y: emitterY,
    angle: emitterAngle,
    speed: emitterSpeed,
    gravityY: emitterGravityY,
    bounce: emitterBounce,
    maxParticles: 6000,
    //frequency: 10,
    lifespan: emitterLifespan,
    scale: emitterScale,
    rotate: { min: 60, max: 360 },
    bounds: emitterBounds,
    alpha: emitterAlpha,
    blendMode: "ADD"
  });

  var emitter2 = particles.createEmitter({
    frame: ["water1", "water2", "water3"],
    x: emitterX,
    y: emitterY,
    angle: emitterAngle,
    speed: emitterSpeed,
    gravityY: emitterGravityY,
    bounce: emitterBounce,
    maxParticles: 6000,
    //frequency: 10,
    lifespan: emitterLifespan,
    scale: emitterScale,
    rotate: { min: 60, max: 360 },
    bounds: emitterBounds,
    alpha: emitterAlpha,
    blendMode: "ADD"
  });

  var emitter3 = particles.createEmitter({
    frame: ["water1", "water2", "water3"],
    x: emitterX,
    y: emitterY,
    angle: emitterAngle,
    speed: emitterSpeed,
    gravityY: emitterGravityY,
    bounce: emitterBounce,
    maxParticles: 6000,
    //frequency: 10,
    lifespan: emitterLifespan,
    scale: emitterScale,
    rotate: { min: 60, max: 360 },
    bounds: emitterBounds,
    alpha: emitterAlpha,
    blendMode: "ADD"
  });

  var emitter4 = particles.createEmitter({
    frame: ["water1", "water2", "water3"],
    x: emitterX,
    y: emitterY,
    angle: emitterAngle,
    speed: emitterSpeed,
    gravityY: emitterGravityY,
    bounce: emitterBounce,
    maxParticles: 6000,
    //frequency: 10,
    lifespan: emitterLifespan,
    scale: emitterScale,
    rotate: { min: 60, max: 360 },
    bounds: emitterBounds,
    alpha: emitterAlpha,
    blendMode: "ADD"
  });

  var emitter5 = particles.createEmitter({
    frame: ["water1", "water2", "water3"],
    x: emitterX,
    y: emitterY,
    angle: emitterAngle,
    speed: emitterSpeed,
    gravityY: emitterGravityY,
    bounce: emitterBounce,
    maxParticles: 6000,
    //frequency: 10,
    lifespan: emitterLifespan,
    scale: emitterScale,
    rotate: { min: 60, max: 360 },
    bounds: emitterBounds,
    alpha: emitterAlpha,
    blendMode: "ADD"
  });



  // Mist emitters, set to white sprites
  var emitter6 = particlesMist.createEmitter({
    frame: ["mist1", "mist2", "mist3"],
    x: emitterX,
    y: emitterY,
    angle: { min: 110, max: 220 },
    speed: 500,
    gravityY: 10,
    //bounce: emitterBounce,
    maxParticles: 6000,
    //frequency: 10,
    lifespan: { min: 3500, max: 4000},
    scale: 8,
    rotate: { min: 60, max: 360 },
    //bounds: emitterBounds,
    alpha: 0.2,
    blendMode: "ADD"
  });

  var emitter7 = particlesMist.createEmitter({
    frame: ["mist1", "mist2", "mist3"],
    x: emitterX,
    y: emitterY,
    angle: { min: 110, max: 220 },
    speed: 500,
    gravityY: 10,
    //bounce: emitterBounce,
    maxParticles: 6000,
    //frequency: 10,
    lifespan: { min: 3500, max: 4000},
    scale: 8,
    rotate: { min: 60, max: 360 },
    //bounds: emitterBounds,
    alpha: 0.2,
    blendMode: "ADD"
  });

  var emitter8 = particlesMist.createEmitter({
    frame: ["mist1", "mist2", "mist3"],
    x: emitterX,
    y: emitterY,
    angle: { min: 110, max: 220 },
    speed: 500,
    gravityY: 10,
    //bounce: emitterBounce,
    maxParticles: 6000,
    //frequency: 10,
    lifespan: { min: 3500, max: 4000},
    scale: 8,
    rotate: { min: 60, max: 360 },
    //bounds: emitterBounds,
    alpha: 0.2,
    blendMode: "ADD"
  });
}
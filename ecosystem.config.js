module.exports = {
  apps : [{
    name   : "XdMinds",
    script : "./app.js",
    log:"./logs/combined.outerr.log",
    output:"./logs/out.log",
    error:"./logs/error.log",
    watch:true,
    ignore_watch:["logs/*","public","node_modules/*", "node_modules"],
    env:{
      NODE_ENV:"local"
    },
    env_devel:{
      NODE_ENV:"devel"
    }
  }]
}

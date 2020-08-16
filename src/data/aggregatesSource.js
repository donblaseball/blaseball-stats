const fetch = require('node-fetch');
const players = require('./players');
const events = require('./events');
const eventNames=require('./eventNames');
const playerStlats=require('./playerStlats');
const stlatNames=require('./stlatNames');
var aggregates = {}
for (const event of eventNames){
    var mean=0;
    var count=0;
    var stdDev=0;
    for(const player of players){
        if(!!events[player][event+"Average"]){
            mean+=events[player][event+"Average"];
        }
    }
    mean /= players.length

    for(const player of players){
        if(!!events[player][event+"Average"]){
            stdDev+=(events[player][event+"Average"]-mean)*(events[player][event+"Average"]-mean);
        }else{
            stdDev+=mean*mean;
        }
    }
    stdDev/=players.length
    stDev = Math.sqrt(stdDev)
    if(stdDev > 0.0001){
        aggregates[event]={}
        aggregates[event].mean=mean
        aggregates[event].stdDev=stdDev
    }
}
for (const stat of stlatNames){
    var mean=0;
    var stdDev=0;
    for(const player of players){
        if(!!playerStlats[player][stat]){
            mean+=playerStlats[player][stat];
        }
    }
    mean /= players.length

    for(const player of players){
        if(!!playerStlats[player][stat]){
            stdDev+=(playerStlats[player][stat]-mean)*(playerStlats[player][stat]-mean);
        }else{
            stdDev+=mean*mean;
        }
    }
    stdDev/=players.length
    stDev = Math.sqrt(stdDev)
    
    if(stdDev > 0.0001){
        aggregates[stat]={}
        aggregates[stat].mean=mean
        aggregates[stat].stdDev=stdDev
    }
}
console.log(JSON.stringify(aggregates))
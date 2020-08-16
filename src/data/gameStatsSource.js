const players = require('./players');
const events = require('./events');
const eventNames=require('./eventNames');
var values={};
for (const player of players){
    var stats={}
    var raw={}
    stats.plateAperances=events[player].plateAperances
    for(const event of eventNames){
        raw[event]=events[player][event]
        stats[event.toLocaleLowerCase()+"Average"]=raw[event]/stats.plateAperances
    }
    stats.AB=stats.plateAperances-raw.WALK
    stats.H=raw.SINGLE+raw.DOUBLE+raw.TRIPLE+raw.HOME_RUN+raw.FIELDERS_CHOICE
    stats.AVG=stats.H/stats.AB
    stats.BB_K=raw.WALK/raw.STRIKEOUT
    stats.OBP=(stats.H+raw.WALK)/stats.plateAperances
    stats.TB=raw.SINGLE+2*raw.DOUBLE+3*raw.TRIPLE+4*raw.HOME_RUN
    stats.SLG=stats.TB/stats.AB
    stats.OPS=stats.SLG+stats.OBP
    stats.stealAttempts=(raw.STOLEN_BASE+raw.CAUGHT_STEALING)/(raw.SINGLE+raw.DOUBLE+raw.WALK)
    stats.stealSuccesses=raw.STOLEN_BASE/(raw.STOLEN_BASE+raw.CAUGHT_STEALING)
    values[player]=stats
}

console.log(JSON.stringify(values))
const players = require('./players');
const events = require('./events');
const eventNames=require('./eventNames');
var values={};
for (const player of players){
    var stats={}
    stats.plateAperances=events[player].plateAperances
    for(const event of eventNames){
        stats[event]=events[player][event]
        stats[event.toLocaleLowerCase()+"Average"]=stats[event]/stats.plateAperances
    }
    stats.AB=stats.plateAperances-stats.WALK
    stats.H=stats.SINGLE+stats.DOUBLE+stats.TRIPLE+stats.HOME_RUN+stats.FIELDERS_CHOICE
    stats.AVG=stats.H/stats.AB
    stats.BB_K=stats.WALK/stats.STRIKEOUT
    stats.OBP=(stats.H+stats.WALK)/stats.plateAperances
    stats.TB=stats.SINGLE+2*stats.DOUBLE+3*stats.TRIPLE+4*stats.HOME_RUN
    stats.SLG=stats.TB/stats.AB
    stats.OPS=stats.SLG+stats.OBP
    stats.stealAttempts=(stats.STOLEN_BASE+stats.CAUGHT_STEALING)/(stats.SINGLE+stats.DOUBLE+stats.WALK)
    stats.stealSuccesses=stats.STOLEN_BASE/(stats.STOLEN_BASE+stats.CAUGHT_STEALING)
    values[player]=stats
}

console.log(JSON.stringify(values))
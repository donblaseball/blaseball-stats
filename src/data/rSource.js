const fetch = require('node-fetch');
const players = require('./players');
const gameStats = require('./gameStats');
const gameStatsNames=require('./gameStatsNames');
const playerStlats=require('./playerStlats');
const stlatNames=require('./stlatNames');
var values=[];
for (const stat of gameStatsNames){
    for (const stlat of stlatNames){
        var x=0,y=0,x2=0,y2=0,xy=0;
        var n=players.length;
        for(const player of players){
            x+=playerStlats[player][stlat]
            y+=gameStats[player][stat]
            x2+=playerStlats[player][stlat]*playerStlats[player][stlat]
            y2+=gameStats[player][stat]*gameStats[player][stat]
            xy+=gameStats[player][stat]*playerStlats[player][stlat]
        }
        values.push({
            stat,
            stlat,
            r:(n*xy-x*y)/Math.sqrt((n*x2-x*x)*(n*y2-y*y))
        })
    }
}
values.sort((a,b)=>{
    return Math.abs(b.r)-Math.abs(a.r)
})
console.log(JSON.stringify(values))
module.exports=values
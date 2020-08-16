import  fetch from 'node-fetch';
import  players from './players';
import  gameStats from './gameStats';
import  gameStatsNames from './gameStatsNames';
import  playerStlats from './playerStlats';
import  stlatNames from './stlatNames';


var values=[];
for (const stat of gameStatsNames){
    for (const stlat of stlatNames){
        var x=0,y=0,x2=0,y2=0,xy=0;
        var n=players.length;
        for(const player of players){
            if(gameStats[player].plateAperances > 200){
                x+=playerStlats[player][stlat]
                y+=gameStats[player][stat]
                x2+=playerStlats[player][stlat]*playerStlats[player][stlat]
                y2+=gameStats[player][stat]*gameStats[player][stat]
                xy+=gameStats[player][stat]*playerStlats[player][stlat]
            } else{
                n--;
            }
        }
        var r=(n*xy-x*y)/Math.sqrt((n*x2-x*x)*(n*y2-y*y))
        if(!!r){
            values.push({
                stat,
                stlat,
                r:r
            })
        }
    }
}
values.sort((a,b)=>{
    return Math.abs(b.r)-Math.abs(a.r)
})
console.log(values)
export default values
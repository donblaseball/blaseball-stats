const fetch = require('node-fetch');
const players = require('./players');
var apperances = require('./apperances');
const eventNames=require('./eventNames');

var n=0
for (const event of eventNames){
    n++;
 fetch('https://api.blaseball-reference.com/v1/countByType?eventType='+event.toLocaleUpperCase()+'&pitcherId=-')
    .then(function(response) {
        return response.json();

    }).then(function(response) {
        for(const p of response.batters){
            apperances[p.batter_id][event]=p.count
        }
        n--;
        if(n==0){

            for(var player in apperances){
                for (const e of eventNames){
                    if(!apperances[player][e]){
                        apperances[player][e]=0
                    }
                }
            }
            console.log(JSON.stringify(apperances));
        }
    })
}
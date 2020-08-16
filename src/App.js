import React from 'react'
//
import { Chart } from 'react-charts'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const players = require('./data/players');
const gameStats = require('./data/gameStats');
const gameStatsNames=require('./data/gameStatsNames');
const playerStlats=require('./data/playerStlats');
const stlatNames=require('./data/stlatNames');
const rSource=require('./data/rSource');
export default () => {
  const [stlat, setStlat] = React.useState("divinity");
  const [stat, setStat] = React.useState("HOME_RUN");


  const data = React.useMemo(
    () => {
        var data=[];
        for(var player of players){
          data.push({
            data:[[
              playerStlats[player][stlat],
              gameStats[player][stat]
            ]],
            label: playerStlats[player].name
          })
        }
        return data
    },
    [stlat,stat]
  )
  const series = React.useMemo(
    () => ({
      type: 'bubble',
      showPoints: false
    }),
    []
  )
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
  const stlatOptions = React.useMemo(
    () => {
        return rSource.filter(x => x.stat==stat).map(x => {
          return {
            value: x.stlat,
            label: x.stlat+" "+x.r
          }
        })
    },
    [stat]
  )
  const statOptions = React.useMemo(
    () => {
        return rSource.filter(x => x.stlat==stlat).map(x => {
          return {
            value: x.stat,
            label: x.stat+" "+x.r
          }
        })
    },
    [stlat]
  )
  return (
    <div>
      <div
        style={{
          width: '800px',
          height: '600px'
        }}
      >
          <Chart
            data={data}
            series={series}
            axes={axes}
            grouping="single"
            tooltip
          />
      </div>
      <div
        style={{
          width: '400px'
        }}
      >
        <Dropdown 
          options={stlatOptions} 
          onChange={(e)=> {
            setStlat(e.value)
          }}
          value={stlat} 
        />
      </div>
      <div
        style={{
          width: '400px'
        }}
      >
        <Dropdown 
          options={statOptions} 
          onChange={(e)=> {
            setStat(e.value)
          }} 
          value={stat}
        />
      </div>
    </div>
  )
}
"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function Dashboard(){

  const data = {
    labels:["Seg","Ter","Qua","Qui","Sex"],
    datasets:[
      {
        label:"Vendas",
        data:[120,90,150,200,180],
        backgroundColor:"green"
      }
    ]
  }

  return(

    <div style={{padding:"30px"}}>

      <h1>Dashboard de Vendas</h1>

      <div style={{width:"600px"}}>
        <Bar data={data}/>
      </div>

    </div>

  )

}
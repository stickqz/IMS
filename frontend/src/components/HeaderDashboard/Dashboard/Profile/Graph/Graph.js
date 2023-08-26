import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import './Graph.css';

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Sales-Graph",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const LineChart = () => {
  return (
    <div className="graph">
      <Line data={data} />
    </div>
  );
};

export default LineChart;
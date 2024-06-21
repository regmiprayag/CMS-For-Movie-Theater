import React from "react";
import { Bar } from "react-chartjs-2";
import PieChart from "./PieChart";
import CancelledTickets from "./CancelledTickets";

const viewSales = () => {
  return (
    <div className="bg-slate-300 text-black text-3xl mt-16 mb-10 mr-10 w-full">
      <div className="bg-slate-100 flex justify-center">View Sales</div>
      <div className="overflow-x-auto">
        <div className="mx-auto" style={{ padding: "20px", width: "40%" }}>
          <PieChart />
        </div>
      </div>
      <div className="justify-center bg-slate-200 flex ">
        <CancelledTickets/>
      </div>
    </div>
  );
};

export default viewSales;

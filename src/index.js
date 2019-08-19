import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import seatLayoutList from "./seatLayout";
import SelectSeatOptions from "./SelectSeatOptions";
import SeatLayOutComponent from "./SeatLayOutComponent";

var tempSelected = [];
function App() {
  const [seatLayout, setSeatLayoutList] = useState(seatLayoutList);
  const [numberOfSeat, selectNumberOfseat] = useState(1);

  const updateSeatLayoutList = seat => {
    for (var k = 0; k < tempSelected.length; k++) {
      var val = tempSelected;
      for (var p = 0; p < seatLayout.length; p++) {
        var rows = seatLayout[p];
        for (var j = 0; j < rows.length; j++) {
          if (
            val[k].row === rows[j].row &&
            rows[j].seatAvailable === val[k].seatAvailable &&
            rows[j].seatId === val[k].seatId
          ) {
            seatLayout[p][j].seatAvailable = seat;
          }
        }
      }
    }
    var SeatList = JSON.parse(JSON.stringify(seatLayout));
    setSeatLayoutList(SeatList);
  };

  const selectSeat = (el, e, row) => {
    if (
      e.currentTarget.className === "seat-disable" ||
      e.currentTarget.className === "selected"
    ) {
      return;
    }
    if (!(tempSelected.length < numberOfSeat)) {
      updateSeatLayoutList("empty");
      tempSelected = [];
    }
    if (
      tempSelected.length > 0 &&
      !(el.seatType === tempSelected[0].seatType)
    ) {
      updateSeatLayoutList("empty");
      tempSelected = [];
    }

    for (var i = +el.seatId; i < row.length; i++) {
      if (el.row === row[0].row && "empty" === row[i].seatAvailable) {
        if (tempSelected.length < numberOfSeat) {
          tempSelected.push(row[i]);
        }
      } else {
        break;
      }
    }
    updateSeatLayoutList("selected");
    console.log(tempSelected);
  };

  let totalAmountPay =
    tempSelected.length > 0
      ? tempSelected.map(
          (item, index) =>
            item.clubRate ||
            item.ExecutiveRate + item.clubRate ||
            item.ExecutiveRate
        )
      : "";
  totalAmountPay =
    tempSelected.length === numberOfSeat ? (
      <div className="amount-pay">
        <span>
          Total amount Rs : {totalAmountPay[0] * totalAmountPay.length}{" "}
        </span>{" "}
        <input type="button" value="Pay now" />
      </div>
    ) : (
      ""
    );
  return (
    <div className="App">
      <h3>How Many Seats ?</h3>
      <SelectSeatOptions selectNumberOfseat={selectNumberOfseat} />
      <SeatLayOutComponent seatLayout={seatLayout} selectSeat={selectSeat} />
      {totalAmountPay}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

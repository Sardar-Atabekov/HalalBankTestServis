import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./total.css";

const NavBar = ({ data, currency = "сом" }) => {
  return (
    <div className="totals">
      <div className="totalContainer">
        <div className="total">
          <div className="text-center">
            <div>
              <span>ЗА ВЕС ПЕРИОД</span>
              <h6 className="totalSum">
                {data && data.totalSum} {currency}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="totalContainer">
        <div className="total">
          <div className="text-center">
            <div>
              <span>ЗА МЕСЯЦ</span>
              <h6 className="totalSum">
                {data && data.totalSumMonth} {currency}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="totalContainer">
        <div className="total">
          <div className="text-center">
            <div>
              <span>ЗА НЕДЕЛЮ</span>
              <h6 className="totalSum">
                {data && data.totalSumWeek} {currency}
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className="totalContainer">
        <div className="total">
          <div className="text-center">
            <span>ЗА СЕГОДНЯ</span>
            <h6 className="totalSum">
              {data && data.totalSumToday} {currency}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

import React from "react";
import { drawing } from "../constants";

export default function NoData() {
  return (
    <div className="noDataWrapper">
      <div className="noData">
        <span>
          <img src={drawing} alt="drawing" />
        </span>
        <span>
          <div className="dataList">
            <ul className="listUnstyled">
              <li>
                <h2 className="heading2">
                  Hey! Something’s off! <br />
                  We couldn’t display the given data.
                </h2>
              </li>
              <li>
                <p className="heading4">
                  Try changing your your filters or selecting a different date.
                </p>
              </li>
            </ul>
          </div>
        </span>
      </div>
    </div>
  );
}

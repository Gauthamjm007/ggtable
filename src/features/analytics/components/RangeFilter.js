import { useState, useEffect, useMemo } from "react";
import "rc-slider/assets/index.css";
import FontAwesome from "react-fontawesome";
import { Button, ClickAwayListener } from "../../../shared_ui_components";
import Slider from "rc-slider";
import { numberWithCommas } from "../../../utils";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function RangeFilter({
  id,
  handleUpdateTableRangeFilter,
  min,
  max,
  filter_min,
  filter_max,
}) {
  const [range, setRange] = useState([0, 0]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (filter_min > -1 && filter_max > -1) {
      setRange([filter_min, filter_max]);
    } else {
      setRange([min, max]);
    }
  }, [min, max, filter_min, filter_max]);

  const filterApplied = useMemo(() => {
    if (filter_max !== max || filter_min !== min) {
      return true;
    }

    return false;
  }, [filter_max, filter_min, min, max]);

  const handleApply = () => {
    handleUpdateTableRangeFilter(id, { min: range[0], max: range[1] });
    setOpen(false);
  };

  const handleReset = () => {
    handleUpdateTableRangeFilter(id, { min, max });
    setOpen(false);
  };

  return (
    <div className="appFilter">
      <ClickAwayListener
        onClickAway={() => {
          setOpen(false);
        }}
      >
        <FontAwesome
          name={"filter"}
          size="2x"
          style={{
            color: filterApplied ? "#136FED" : "#707070",
            cursor: "pointer",
          }}
          onClick={() => {
            setOpen(!open);
          }}
        />
        {open && (
          <div className={"appFilterWrapper"}>
            <div className="requestRange">
              <Range
                onChange={(val) => {
                  setRange([...val]);
                }}
                min={min}
                railStyle={{ color: "#fff1f1 !important" }}
                max={max}
                value={range}
                defaultValue={[0, 100]}
                tipFormatter={(value) => `${value}`}
              />
              <ul className="listInlineAway">
                <li className="paragraph">{numberWithCommas(range[0])}</li>
                <li className="paragraph">{numberWithCommas(range[1])}</li>
              </ul>
            </div>
            <div className="btnGroupWrapper">
              <ul className="listInline">
                <li className="listInlineItem mr16">
                  <Button className="secondaryBtn" onClick={handleReset}>
                    Reset
                  </Button>
                </li>
                <li className="listInlineItem">
                  <Button className="primaryBtn" onClick={handleApply}>
                    Apply{" "}
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </ClickAwayListener>
    </div>
  );
}

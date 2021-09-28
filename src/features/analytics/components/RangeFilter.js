import { useState, useEffect } from "react";
import "rc-slider/assets/index.css";
import FontAwesome from "react-fontawesome";
import { Button, ClickAwayListener } from "../../../shared_ui_components";
import Slider from "rc-slider";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export default function RangeFilter({ apps, handleUpdateFilter }) {
  const [appsList, setAppsList] = useState([
    { id: 1, name: "App 1" },
    { id: 2, name: "App 2" },
  ]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  //   useEffect(() => {
  //     if (apps?.length) {
  //       let _apps = apps.map((item) => {
  //         return { ...item, selected: false };
  //       });
  //       setAppsList(_apps);
  //     } else {
  //       setAppsList([]);
  //     }
  //   }, [apps]);

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
          style={{ color: "#707070", cursor: "pointer" }}
          onClick={() => {
            setOpen(!open);
          }}
        />
        {open && (
          <div className={"appFilterWrapper"}>
            <div className="header">
              <p className="paragraph">Select App</p>
            </div>
            <div className="requestRange">
              <Range
                min={0}
                railStyle={{ color: "#fff1f1 !important" }}
                max={20}
                defaultValue={[3, 10]}
                tipFormatter={(value) => `${value}`}
              />
            </div>
            <div className="btnGroupWrapper">
              <ul className="listInline">
                <li className="listInlineItem mr16">
                  <Button className="secondaryBtn">Clear</Button>
                </li>
                <li className="listInlineItem">
                  <Button className="primaryBtn">Apply </Button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </ClickAwayListener>
    </div>
  );
}

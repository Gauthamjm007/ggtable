import { useState, useEffect, useMemo } from "react";
import FontAwesome from "react-fontawesome";
import { Button, ClickAwayListener } from "../../../shared_ui_components";
import { updateArrayOfObj, searchFunctionality } from "../../../utils";

export default function AppFilter({
  apps,
  handleUpdateAppFilter,
  appFilterArray,
}) {
  const [appsList, setAppsList] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (apps?.length) {
      let _apps = apps.map((item) => {
        return {
          ...item,
          selected: appFilterArray.includes(item.app_id),
        };
      });
      setAppsList(_apps);
    } else {
      setAppsList([]);
    }
  }, [apps, appFilterArray]);

  const handleSelectApp = (app_id, val) => {
    let _apps = updateArrayOfObj(
      appsList,
      { selected: !val },
      "app_id",
      app_id
    );
    setAppsList(_apps);
  };
  const selectedApps = useMemo(() => {
    return appsList
      .filter((item) => {
        return item.selected;
      })
      .map((item) => item.app_id);
  }, [appsList]);

  const handleApply = () => {
    handleUpdateAppFilter(selectedApps);
    setOpen(false);
  };

  const handleReset = () => {
    handleUpdateAppFilter([]);
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
          style={{ color: "#707070", cursor: "pointer" }}
          onClick={() => {
            setOpen(!open);
          }}
        />
        {open && (
          <div className={"appFilterWrapper"}>
            <div className="header">
              <p className="paragraph">Select App</p>
              <input
                type="text"
                value={search}
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filterList">
              <ul className="listUnstyled">
                {searchFunctionality(appsList, "app_name", search).map(
                  (item) => (
                    <li
                      className="listInlineItem"
                      key={item.app_id}
                      onClick={() =>
                        handleSelectApp(item.app_id, item.selected)
                      }
                    >
                      {
                        <span
                          className={`filterItem paragraph ${
                            item.selected ? "active" : ""
                          }`}
                        >
                          {item.app_name}
                        </span>
                      }
                    </li>
                  )
                )}
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
                  <Button className={`primaryBtn `} onClick={handleApply}>
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

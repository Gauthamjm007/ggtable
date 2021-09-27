import { useState } from "react";
import styles from "../../../assets/styles/analytics.module.scss";
import { Button } from "../../../shared_ui_components";
import IconButton from "../../../shared_ui_components/IconButton";
import FilterOption from "../../../shared_ui_components/FilterOption";
import FontAwesome from "react-fontawesome";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { format } from "date-fns";

export default function AnalyticsContainer() {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.analyticsContainer}>
      <div className={styles.analyticsHeader}>
        <div></div>
        <h3 className="heading3">Analytics Page</h3>

        <div className={styles.analyticsFilter}>
          <span>
            <IconButton
              iconName={"calendar"}
              onClick={() => {
                setOpen(true);
              }}
            >
              {format(value[0], "do MMM")} - {format(value[1], "do MMM y")}
            </IconButton>
            <div className={styles.dataRangePicker}>
              <DateRangePicker
                onChange={onChange}
                onCalendarClose={() => {
                  if (open) {
                    setOpen(false);
                  }
                }}
                value={value}
                closeCalendar={false}
                calendarIcon={null}
                isClose
                isOpen={open}
                format="MM-dd-y"
              />
            </div>
          </span>
          <span>
            <IconButton iconName={"sliders"}>Settings</IconButton>{" "}
          </span>
        </div>

        <div className={styles.analyticsSettingsWrapper}>
          <h6 className="paragraph">Dimension and Metrics</h6>
          <div className={styles.filterOptions}>
            <ul className="listInline">
              <li className="listInlineItem mr16">
                <FilterOption>Date</FilterOption>
              </li>
              <li className="listInlineItem mr16">
                <FilterOption>Date</FilterOption>
              </li>
              <li className="listInlineItem mr16">
                <FilterOption>Date</FilterOption>
              </li>
              <li className="listInlineItem mr16">
                <FilterOption>Date</FilterOption>
              </li>
              <li className="listInlineItem mr16">
                <FilterOption>Date</FilterOption>
              </li>
              <li className="listInlineItem mr16">
                <FilterOption>Date</FilterOption>
              </li>
              <li className="listInlineItem mr16">
                <FilterOption>Date</FilterOption>
              </li>
              <li className="listInlineItem mr16">
                <FilterOption>Date</FilterOption>
              </li>
              <li className="listInlineItem mr16">
                <FilterOption>Date</FilterOption>
              </li>
              <li className="listInlineItem mr16">
                <FilterOption>Date</FilterOption>
              </li>
            </ul>
          </div>
          <div className={styles.btnGroupWrapper}>
            <div>
              <ul className="listInline">
                <li className="listInlineItem mr16">
                  <Button className="secondaryBtn">Close</Button>
                </li>
                <li className="listInlineItem">
                  <Button className="primaryBtn">Apply Changes</Button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.analyticsTableWrapper}>
          <table>
            <thead>
              <th>
                <ul className="listUnstyled">
                  <li>
                    <FontAwesome
                      name={"filter"}
                      size="2x"
                      style={{ color: "#707070" }}
                    />
                  </li>
                  <li>
                    <h5 className="heading5">Date</h5>
                  </li>
                  <li>
                    <h1 className="heading1">7</h1>
                  </li>
                </ul>
              </th>
              <th>
                <ul className="listUnstyled">
                  <li>
                    <FontAwesome
                      name={"filter"}
                      size="2x"
                      style={{ color: "#707070" }}
                    />
                  </li>
                  <li>
                    <h5 className="heading5">App</h5>
                  </li>
                  <li>
                    <h1 className="heading1">7</h1>
                  </li>
                </ul>
              </th>
            </thead>
            <tbody className="heading5Reg">
              <tr>
                <td>14 July 2021</td>
                <td>Callbreak</td>
              </tr>
              <tr>
                <td>14 July 2021</td>
                <td>ShareChat</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

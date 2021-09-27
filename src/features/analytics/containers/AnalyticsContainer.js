import { useState, useMemo } from "react";
import styles from "../../../assets/styles/analytics.module.scss";
import { Button } from "../../../shared_ui_components";
import IconButton from "../../../shared_ui_components/IconButton";
import FilterOption from "../../../shared_ui_components/FilterOption";
import FontAwesome from "react-fontawesome";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { numberWithCommas, roundToTwo } from "../../../utils";

const TABLE_HEADERS = [
  { key: "date", label: "Date", suffix: "", prefix: "" },
  { key: "app_id", label: "App", suffix: "", prefix: "" },
  { key: "requests", label: "Requests", suffix: "M", prefix: "" },
  { key: "responses", label: "Responses", suffix: "M", prefix: "" },
  { key: "impressions", label: "Impressions", suffix: "K", prefix: "" },
  { key: "clicks", label: "Clicks", suffix: "M", prefix: "" },
  { key: "revenue", label: "Revenue", suffix: "", prefix: "$" },
  { key: "fill_rate", label: "Fill rate", suffix: "%", prefix: "" },
  { key: "ctr", label: "CTR", suffix: "%", prefix: "" },
];

const TABLE_HEADERS_SUM = [
  "responses",
  "impressions",
  "clicks",
  "revenue",
  "requests",
  "fill_rate",
  "ctr",
];

const TABLE_AVERAGE = ["fill_rate", "ctr"];

export default function AnalyticsContainer() {
  const [value, onChange] = useState([new Date(), new Date()]);
  const [open, setOpen] = useState(false);
  const [tableHeaders, setTableHeaders] = useState(TABLE_HEADERS);
  const apps = useSelector((state) => state.apps);
  const analytics = useSelector((state) => state.analytics);

  const appsObj = useMemo(() => {
    let obj = {};
    for (const item of apps) {
      obj[item.app_id] = item.app_name;
    }
    return obj;
  }, [apps]);

  const aggreegatedAnalytics = useMemo(() => {
    let obj = {};

    TABLE_HEADERS.forEach((item) => {
      if (TABLE_HEADERS_SUM.includes(item.key)) {
        obj[item.key] = analytics
          .map((data) => Math.round(data[item.key]))
          .reduce((a, b) => a + b, 0);
      }

      if (["requests", "responses", "clicks"].includes(item.key)) {
        let million = 1000000;
        obj[item.key] = `${roundToTwo(obj[item.key] / million)} ${item.suffix}`;
      }

      if (["impressions"].includes(item.key)) {
        let thousand = 1000;
        obj[item.key] = `${roundToTwo(obj[item.key] / thousand)}${item.suffix}`;
      }

      if (["revenue"].includes(item.key)) {
        obj[item.key] = `${item.prefix}${obj[item.key]}`;
      }

      if (["fill_rate", "ctr"].includes(item.key)) {
        obj[item.key] = `${roundToTwo(obj[item.key] / analytics.length)} ${
          item.suffix
        }`;
      }
      if (item.key === "date") {
        obj.date = analytics.length;
      }
      if (item.key === "app_id") {
        obj.app_id = apps.length;
      }
    });

    return obj;
  }, [analytics, apps]);

  const analyticsTableView = useMemo(() => {
    return analytics?.map((item) => {
      return {
        ...item,
        date: format(new Date(item.date), "d MMM y"),
        app_id: appsObj[item.app_id] ?? "-",
        requests: numberWithCommas(item.requests),
        responses: numberWithCommas(item.responses),
        impressions: numberWithCommas(item.impressions),
        clicks: numberWithCommas(item.clicks),
        revenue: `$${item.revenue}`,
        fill_rate: `${item.fill_rate}%`,
        ctr: `${item.ctr}%`,
      };
    });
  }, [analytics]);

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
              {format(value[0], "MMM d")} - {format(value[1], "MMM d y")}
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
              {tableHeaders.map((item) => {
                return (
                  <li className="listInlineItem mr16" key={item.key}>
                    <FilterOption>{item.label}</FilterOption>
                  </li>
                );
              })}
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
              {TABLE_HEADERS.map((item) => {
                return (
                  <th key={item.key}>
                    <ul className="listUnstyled">
                      <li>
                        <FontAwesome
                          name={"filter"}
                          size="2x"
                          style={{ color: "#707070" }}
                        />
                      </li>
                      <li>
                        <h5 className="heading5">{item.label}</h5>
                      </li>
                      <li>
                        <h1 className="heading1">
                          {aggreegatedAnalytics[item.key]}
                        </h1>
                      </li>
                    </ul>
                  </th>
                );
              })}
            </thead>
            <tbody className="heading5Reg">
              {analyticsTableView.map((item) => {
                return (
                  <tr>
                    {TABLE_HEADERS.map((header) => {
                      return <td>{item[header.key]}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

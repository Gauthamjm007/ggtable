import { useState, useMemo, useEffect } from "react";
import styles from "../../../assets/styles/analytics.module.scss";
import { NoData } from "../../../shared_elements";
import IconButton from "../../../shared_ui_components/IconButton";
import { startOfMonth, endOfMonth, format, parse } from "date-fns";
import FontAwesome from "react-fontawesome";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas, roundToTwo, queryFilter } from "../../../utils";
import { Filter } from "../components";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import { fetchAnalyticsData } from "../../../globalStore/actions";
import { dummyImage } from "../../../constants";

const TABLE_HEADERS = [
  { key: "date", label: "Date", suffix: "", prefix: "", show: true },
  { key: "app_id", label: "App", suffix: "", prefix: "", show: true },
  { key: "requests", label: "Requests", suffix: "M", prefix: "", show: true },
  { key: "responses", label: "Responses", suffix: "M", prefix: "", show: true },
  {
    key: "impressions",
    label: "Impressions",
    suffix: "K",
    prefix: "",
    show: true,
  },
  { key: "clicks", label: "Clicks", suffix: "M", prefix: "", show: true },
  { key: "revenue", label: "Revenue", suffix: "", prefix: "$", show: true },
  { key: "fill_rate", label: "Fill rate", suffix: "%", prefix: "", show: true },
  { key: "ctr", label: "CTR", suffix: "%", prefix: "", show: true },
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
  const dispatch = useDispatch();
  const { search: searchQuery } = useLocation();
  const history = useHistory();
  const [date, setDate] = useState([
    startOfMonth(new Date()),
    endOfMonth(new Date()),
  ]);
  const [open, setOpen] = useState(false);
  const [tableHeaders, setTableHeaders] = useState(TABLE_HEADERS);
  const [showSettings, setShowSettings] = useState(false);
  const apps = useSelector((state) => state.apps);
  const analytics = useSelector((state) => state.analytics);

  useEffect(() => {
    if (searchQuery) {
      let _querySeach = queryString.parse(searchQuery);
      if (_querySeach?.start_date && _querySeach?.end_date) {
        let startDate = parse(
          _querySeach?.start_date,
          "yyyy-MM-dd",
          new Date()
        ).toString();
        let endDate = parse(
          _querySeach?.end_date,
          "yyyy-MM-dd",
          new Date()
        ).toString();

        dispatch(
          fetchAnalyticsData({
            startDate: _querySeach?.start_date,
            endDate: _querySeach?.end_date,
          })
        );

        if (
          new Date(startDate) !== _querySeach?.start_date &&
          new Date(endDate) !== _querySeach?.end_date
        ) {
          setDate([new Date(startDate), new Date(endDate)]);
        }
      }

      if (_querySeach?.show_headers) {
        let { show_headers } = _querySeach;
        show_headers = show_headers.split(",");
        let _tableHeader = TABLE_HEADERS.map((item) => {
          return { ...item, show: show_headers.includes(item.key) };
        });
        setTableHeaders(_tableHeader);
      } else {
        let _tableHeader = TABLE_HEADERS.map((item) => item.key).join(",");
        let _newSearch = queryFilter(searchQuery, {
          show_headers: _tableHeader,
        });
        history.push({ search: _newSearch });
      }
    } else {
      let startDate = format(startOfMonth(new Date()), "yyyy-MM-dd");
      let endDate = format(endOfMonth(new Date()), "yyyy-MM-dd");
      dispatch(
        fetchAnalyticsData({
          startDate,
          endDate,
        })
      );
      let _newSearch = queryFilter(searchQuery, {
        start_date: startDate,
        end_date: endDate,
      });
      history.push({ search: _newSearch });
    }
  }, [searchQuery]);

  const appsObj = useMemo(() => {
    let obj = {};
    for (const item of apps) {
      obj[item.app_id] = item.app_name;
    }
    return obj;
  }, [apps]);

  const handleDateChange = (data_arr = []) => {
    let [startDate, endDate] = data_arr;
    startDate = format(startDate, "yyyy-MM-dd");
    endDate = format(endDate, "yyyy-MM-dd");
    let _newSearch = queryFilter(searchQuery, {
      start_date: startDate,
      end_date: endDate,
    });
    dispatch(fetchAnalyticsData({ startDate, endDate }));
    history.push({ search: _newSearch });
    setDate(data_arr);
  };

  const handleUpdateHeader = (arr) => {
    let _queryArray = arr
      .filter((item) => item.show)
      .map((item) => item.key)
      .join(",");
    // setTableHeaders(arr);

    let _newSearch = queryFilter(searchQuery, {
      show_headers: _queryArray,
    });

    history.push({ search: _newSearch });
  };

  const aggreegatedAnalytics = useMemo(() => {
    let obj = {};

    TABLE_HEADERS.forEach((item) => {
      if (TABLE_HEADERS_SUM.includes(item.key)) {
        obj[item.key] = analytics
          .map((data) =>
            isNaN(Math.round(data[item.key])) ? 0 : Math.round(data[item.key])
          )
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
        id: item.app_id,
        date: format(new Date(item.date), "d MMM y"),
        app_id:
          (
            <span className="appImageWrapper">
              <img src={dummyImage} alt={appsObj[item.app_id]} />
              {appsObj[item.app_id]}
            </span>
          ) ?? "-",
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

  const viewHeaders = useMemo(() => {
    return tableHeaders.filter((item) => item.show);
  }, [tableHeaders]);

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
              {format(date[0], "MMM d")} - {format(date[1], "MMM d y")}
            </IconButton>
            <div className={styles.dataRangePicker}>
              <DateRangePicker
                onChange={handleDateChange}
                onCalendarClose={() => {
                  if (open) {
                    setOpen(false);
                  }
                }}
                value={date}
                closeCalendar={false}
                calendarIcon={null}
                isClose
                isOpen={open}
                format="MM-dd-y"
              />
            </div>
          </span>
          <span>
            <IconButton
              iconName={"sliders"}
              onClick={() => {
                setShowSettings(true);
              }}
            >
              Settings
            </IconButton>{" "}
          </span>
        </div>
        {showSettings && (
          <Filter
            tableHeaders={tableHeaders}
            handleUpdateHeader={handleUpdateHeader}
            handleClose={() => {
              setShowSettings(false);
            }}
          />
        )}
        {analyticsTableView?.length ? (
          <div className={styles.analyticsTableWrapper}>
            <table>
              <thead>
                <tr>
                  {viewHeaders.map((item) => {
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
                </tr>
              </thead>
              <tbody className="heading5Reg">
                {analyticsTableView.map((item, index) => {
                  return (
                    <tr key={item.id + item.app_id + index}>
                      {viewHeaders.map((header, index) => {
                        return <td key={index}>{item[header.key]}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </section>
  );
}

import { useState, useMemo, useEffect } from "react";
import styles from "../../../assets/styles/analytics.module.scss";
import { NoData } from "../../../shared_elements";
import IconButton from "../../../shared_ui_components/IconButton";
import { startOfMonth, endOfMonth, format, parse } from "date-fns";
import FontAwesome from "react-fontawesome";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas, roundToTwo, queryFilter } from "../../../utils";
import { Filter, AppFilter } from "../components";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router-dom";
import { fetchAnalyticsData } from "../../../globalStore/actions";
import { dummyImage } from "../../../constants";

const TABLE_HEADERS = [
  { key: "date", label: "Date", suffix: "", prefix: "", show: true, id: "1" },
  { key: "app_id", label: "App", suffix: "", prefix: "", show: true, id: "2" },
  {
    key: "requests",
    label: "Requests",
    suffix: "M",
    prefix: "",
    show: true,
    id: "3",
  },
  {
    key: "responses",
    label: "Responses",
    suffix: "M",
    prefix: "",
    show: true,
    id: "4",
  },
  {
    key: "impressions",
    label: "Impressions",
    suffix: "M",
    prefix: "",
    show: true,
    id: "5",
  },
  {
    key: "clicks",
    label: "Clicks",
    suffix: "M",
    prefix: "",
    show: true,
    id: "6",
  },
  {
    key: "revenue",
    label: "Revenue",
    suffix: "K",
    prefix: "$",
    show: true,
    id: "7",
  },
  {
    key: "fill_rate",
    label: "Fill rate",
    suffix: "%",
    prefix: "",
    show: true,
    id: "8",
  },
  { key: "ctr", label: "CTR", suffix: "%", prefix: "", show: true, id: "9" },
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

      if (_querySeach?.show_headers && _querySeach?.order) {
        let { show_headers, order } = _querySeach;
        show_headers = show_headers.split(",");
        order = order.split(",");

        let _tableHeader = order.map((item) => {
          return TABLE_HEADERS.find((head) => head.id === item);
        });

        _tableHeader = _tableHeader.map((head) => {
          return {
            ...head,
            show: show_headers?.includes(head.id),
          };
        });
        setTableHeaders(_tableHeader);
      } else {
        let _tableHeader = TABLE_HEADERS.map((item) => item.id).join(",");
        let _newSearch = queryFilter(searchQuery, {
          order: _tableHeader,
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
    let _queryArrayShow = arr
      .filter((item) => item.show)
      .map((item) => item.id)
      .join(",");

    let _queryOrder = arr.map((item) => item.id).join(",");

    let _newSearch = queryFilter(searchQuery, {
      show_headers: _queryArrayShow,
      order: _queryOrder,
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

      if (
        ["requests", "responses", "clicks", "impressions"].includes(item.key)
      ) {
        let million = 1000000;
        obj[item.key] = `${roundToTwo(obj[item.key] / million)} ${item.suffix}`;
      }

      if (["revenue"].includes(item.key)) {
        let thousand = 1000;
        obj[item.key] = `${item.prefix}${Math.round(obj[item.key] / thousand)}${
          item.suffix
        }`;
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
                            {["app_id"].includes(item.key) ? (
                              <AppFilter />
                            ) : (
                              <FontAwesome
                                name={"filter"}
                                size="2x"
                                style={{ color: "#707070" }}
                              />
                            )}
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

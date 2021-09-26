import React from "react";
import styles from "../../../assets/styles/analytics.module.scss";

export default function AnalyticsContainer() {
  return (
    <section className={styles.analyticsContainer}>
      <div className={styles.analyticsHeader}>
        <h3 className="heading3">Analytics Page</h3>
        <div className={styles.analyticsFilter}>
          <span>Date</span>
          <span>Settings</span>
        </div>
      </div>
    </section>
  );
}

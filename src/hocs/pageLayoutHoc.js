import React from "react";
import { Sidebar } from "../shared_elements";
import { withRouter } from "react-router-dom";

export default function pageLayoutHoc(HocComponent, extraProps = {}) {
  function PageLayout() {
    return (
      <>
        <aside>
          <Sidebar />
        </aside>
        <main>
          <div>
            <HocComponent {...extraProps} />
          </div>
        </main>
      </>
    );
  }

  return withRouter(PageLayout);
}

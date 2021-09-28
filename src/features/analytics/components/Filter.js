import { useState, useEffect, useCallback } from "react";
import styles from "../../../assets/styles/analytics.module.scss";
import { Button } from "../../../shared_ui_components";
import FilterOption from "../../../shared_ui_components/FilterOption";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateArrayOfObj } from "../../../utils";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function Filter({
  handleClose,
  tableHeaders,
  handleUpdateHeader,
}) {
  const [tableHeaderMutable, setTableHeaderMutable] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const _headers = reorder(
      tableHeaderMutable,
      result.source.index,
      result.destination.index
    );

    setTableHeaderMutable(_headers);
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
  });

  useEffect(() => {
    if (tableHeaders?.length) {
      setTableHeaderMutable(tableHeaders);
    } else {
      setTableHeaderMutable([]);
    }
  }, [tableHeaders]);

  const handleUpdateFilter = useCallback(
    (key, val) => {
      const _headers = updateArrayOfObj(
        tableHeaderMutable,
        { show: !val },
        "key",
        key
      );
      setTableHeaderMutable(_headers);
    },
    [tableHeaderMutable]
  );

  const handleApplyChange = () => {
    handleUpdateHeader(tableHeaderMutable);
  };
  return (
    <div className={styles.analyticsSettingsWrapper}>
      <h6 className="paragraph">Dimension and Metrics</h6>
      <div className={styles.filterOptions}>
        <ul className="listInline">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {tableHeaderMutable.map((item, index) => {
                    return (
                      <Draggable
                        key={item.key}
                        draggableId={item.key}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <li
                            className="listInlineItem mr16"
                            key={item.key}
                            ref={provided.innerRef}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <FilterOption
                              onClick={() => {
                                if (!["app_id", "date"].includes(item.key)) {
                                  handleUpdateFilter(item.key, item.show);
                                } else {
                                  alert("Cannot remove app name or date");
                                }
                              }}
                              notAllowed={["app_id", "date"].includes(item.key)}
                              active={item.show}
                            >
                              {item.label}
                            </FilterOption>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </ul>
      </div>
      <div className={styles.btnGroupWrapper}>
        <ul className="listInline">
          <li className="listInlineItem mr16">
            <Button
              className="secondaryBtn"
              onClick={() => {
                handleClose(false);
              }}
            >
              Close
            </Button>
          </li>
          <li className="listInlineItem">
            <Button className="primaryBtn" onClick={handleApplyChange}>
              Apply Changes
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

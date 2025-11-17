import React from "react";
import styles from "./TabsHeader.module.css";
import Search from "../searchComponent/Search";
import CommonButton from "../commonButton/CommonButton";
import CalenderView from "../../components/calendarViewIcon/CalendarViewIcon";
import ListViewIcon from "../../components/listViewIcon/ListViewIcon";
import GridViewIcon from "../../components/gridViewIcon/GridViewIcon";
import { BUTTON_LABELS } from "../../constants";
import Backbutton from "../../components/backbuttonComponent/Backbutton";

const TabsHeader = ({
  heading,
  listAndCalenderView,
  tabView,
  setTabView,
  handleAddNewButton,
  setSearchTerm,
  canEdit,
  backbutton,
}) => {
  const listAndCalenderOrGrid = [
    { id: 1, view: "List" },
    {
      id: 2,

      view: listAndCalenderView ? "Calendar" : "Grid",
    },
  ];

  const handleTabView = (view) => {
    setTabView(view);
  };

  const getIconColor = (view, selectedView) => {
    const defaultColor = "#757575";

    const selectedColor = "#EEC1FF";

    return view === selectedView ? selectedColor : defaultColor;
  };

  return (
    <div className={styles.beforeHeader}>
      <div className="flex items-center gap-2">
        {backbutton && <Backbutton />}
        <h2>{heading}</h2>
      </div>

      <div className={styles.rightSection}>
        {setSearchTerm && <Search onSearchChange={setSearchTerm} />}
        {tabView && (
          <div className={styles.viewStyle}>
            {listAndCalenderOrGrid.map((icon) => (
              <div
                key={icon.id}
                className={
                  tabView === icon.view ? styles.selectedIcon : styles.viewIMG
                }
                onClick={() => handleTabView(icon.view)}
              >
                {icon.view === "List" ? (
                  <ListViewIcon color={getIconColor("List", tabView)} />
                ) : icon.view === "Calendar" ? (
                  <CalenderView color={getIconColor("Calendar", tabView)} />
                ) : (
                  <GridViewIcon color={getIconColor("Grid", tabView)} />
                )}
              </div>
            ))}
          </div>
        )}
        {handleAddNewButton && (
          <div>
            <CommonButton
              label={BUTTON_LABELS.ADD_NEW}
              onClick={handleAddNewButton}
              canEdit={canEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default TabsHeader;

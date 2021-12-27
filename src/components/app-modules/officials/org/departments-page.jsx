import React, { useEffect, useCallback } from "react";
import { useMount } from "react-use";
import { Spin, Row, Col, Typography } from "antd";
import Words from "../../../../resources/words";
import utils from "./../../../../tools/utils";
import service from "./../../../../services/official/org/departments-service";
import {
  getSorter,
  checkAccess,
  getColumns,
  GetSimplaDataPageMethods,
} from "../../../../tools/form-manager";
import SimpleDataTable from "../../../common/simple-data-table";
import SimpleDataPageHeader from "../../../common/simple-data-page-header";
import DepartmentModal from "./department-modal";
import { usePageContext } from "./../../../contexts/page-context";

const { Text } = Typography;

const getSheets = (records) => [
  {
    title: "Departments",
    data: records,
    columns: [
      { label: Words.id, value: "DepartmentID" },
      { label: Words.title, value: "DepartmentTitle" },
      { label: Words.parent_department, value: "ParentDepartmentTitle" },
    ],
  },
];

const baseColumns = [
  {
    title: Words.id,
    width: 100,
    align: "center",
    dataIndex: "DepartmentID",
    sorter: getSorter("DepartmentID"),
    render: (DepartmentID) => <Text>{utils.farsiNum(`${DepartmentID}`)}</Text>,
  },
  {
    title: Words.title,
    width: 200,
    align: "center",
    ellipsis: true,
    dataIndex: "DepartmentTitle",
    sorter: getSorter("DepartmentTitle"),
    render: (DepartmentTitle) => <Text>{utils.farsiNum(DepartmentTitle)}</Text>,
  },
  {
    title: Words.parent_department,
    width: 200,
    align: "center",
    ellipsis: true,
    dataIndex: "ParentDepartmentTitle",
    sorter: getSorter("ParentDepartmentTitle"),
    render: (ParentDepartmentTitle) => (
      <Text>{utils.farsiNum(ParentDepartmentTitle)}</Text>
    ),
  },
];

const recordID = "DepartmentID";

const DepartmentsPage = ({ pageName }) => {
  const {
    progress,
    searched,
    searchText,
    setSearchText,
    records,
    setRecords,
    access,
    setAccess,
    selectedObject,
    showModal,
    searchFocus,
    setSearchFocus,
    setShowModal,
  } = usePageContext();

  useMount(async () => {
    handleResetContext();
    await checkAccess(setAccess, pageName);
  });

  const {
    handleCloseModal,
    handleGetAll,
    handleSearch,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSave,
    handleResetContext,
  } = GetSimplaDataPageMethods({
    service,
    recordID,
  });

  const columns = access
    ? getColumns(baseColumns, null, access, handleEdit, handleDelete)
    : [];

  //------

  const handleKeyPress = useCallback((event) => {
    switch (event.key) {
      case "F2":
        !showModal && setRecords([]);
        break;
      case "F3":
        setSearchFocus(true);
        break;
      case "Escape":
        setSearchFocus(false);
        break;
      case "F10":
        setShowModal(true);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <Spin spinning={progress}>
        <Row gutter={[10, 15]}>
          <SimpleDataPageHeader
            title={Words.departments}
            searchText={searchText}
            sheets={getSheets(records)}
            fileName="Departments"
            onSearchTextChanged={(e) => setSearchText(e.target.value)}
            onSearch={handleSearch}
            onClear={() => setRecords([])}
            onGetAll={handleGetAll}
            onAdd={access?.CanAdd && handleAdd}
            searchFocus={searchFocus}
          />

          <Col xs={24}>
            {searched && (
              <SimpleDataTable records={records} columns={columns} />
            )}
          </Col>
        </Row>
      </Spin>

      {showModal && (
        <DepartmentModal
          onOk={handleSave}
          onCancel={handleCloseModal}
          isOpen={showModal}
          selectedObject={selectedObject}
        />
      )}
    </>
  );
};

export default DepartmentsPage;

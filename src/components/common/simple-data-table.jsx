import React from "react";
import { Table, Alert } from "antd";
import Words from "../../resources/words";
import { getData } from "../../tools/form-manager";

const SimpleDataTable = ({ records, columns, paginationOff }) => {
  return (
    <>
      {records.length > 0 ? (
        <Table
          columns={columns}
          dataSource={getData(records)}
          bordered
          scroll={{
            scrollToFirstRowOnChange: paginationOff ? false : true,
            x: paginationOff ? null : "100%",
            y: paginationOff ? null : 300,
          }}
          showSorterTooltip={false}
          locale={{
            filterConfirm: Words.ok,
            filterReset: Words.clear,
            emptyText: Words.emptyData,
          }}
          pagination={paginationOff ? false : true}
          size="small"
        />
      ) : (
        <Alert message={Words.empty_data} type="warning" showIcon />
      )}
    </>
  );
};

export default SimpleDataTable;

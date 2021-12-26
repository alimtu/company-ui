import React from "react";
import { Table, Alert } from "antd";
import Words from "../../resources/words";
import { getData } from "../../tools/form-manager";

const DetailsTable = ({ isSearched, records, columns }) => {
  return (
    <>
      {records.length > 0 ? (
        <Table
          size="small"
          columns={columns}
          dataSource={getData(records)}
          scroll={{
            scrollToFirstRowOnChange: true,
            x: "100%",
          }}
          pagination={false}
          locale={{
            filterConfirm: Words.ok,
            filterReset: Words.clear,
            emptyText: Words.emptyData,
          }}
        />
      ) : (
        <Alert message={Words.empty_data} type="warning" showIcon />
      )}
    </>
  );
};

export default DetailsTable;

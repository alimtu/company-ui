import React, { useRef } from "react";
import { Col, Typography, Input, Space, Tooltip, Button } from "antd";
import {
  ReloadOutlined as ReloadIcon,
  PlusOutlined as PlusIcon,
  DownloadOutlined as DownloadIcon,
  SnippetsOutlined as ViewAllIcon,
} from "@ant-design/icons";
import ExportExcel from "../common/export-excel";
import Words from "../../resources/words";
import { RiPrinterLine } from "react-icons/ri";
import { isMobileView } from "../../tools/general";
import useWindowWidthBreakpoints from "use-window-width-breakpoints";
import { useReactToPrint } from "react-to-print";
import { PrintPage } from "../app-modules/officials/org/PrintPage";

const { Text } = Typography;
const { Search } = Input;

const SimpleDataPageHeader = ({
  title,
  searchText,
  sheets,
  fileName,
  onSearchTextChanged,
  onSearch,
  onClear,
  onGetAll,
  onAdd,
  searchFocus,
  componentRef,
}) => {
  const inputRef = useRef(null);
  const mobileView = isMobileView(useWindowWidthBreakpoints);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (searchFocus) {
    inputRef.current?.focus();
  } else {
    inputRef.current?.blur();
  }

  return (
    <>
      <Col xs={24}>
        <Text
          style={{
            paddingBottom: 20,
            paddingRight: 5,
            fontSize: 18,
          }}
          strong
          type="success"
        >
          {title}
        </Text>
      </Col>

      <Col xs={24} md={12} lg={10}>
        <Search
          placeholder={Words.search_text}
          onSearch={onSearch}
          onChange={onSearchTextChanged}
          value={searchText}
          enterButton
          allowClear
          ref={inputRef}
        />
      </Col>

      <Col xs={12} md={8} lg={10}>
        {onGetAll ? (
          <Space>
            <Tooltip title={Words.clear}>
              <Button type="primary" icon={<ReloadIcon />} onClick={onClear} />
            </Tooltip>

            <Tooltip title={Words.view_all}>
              <Button
                type="primary"
                icon={<ViewAllIcon />}
                onClick={onGetAll}
              />
            </Tooltip>
          </Space>
        ) : (
          <Tooltip title={Words.clear}>
            <Button type="primary" icon={<ReloadIcon />} onClick={onClear} />
          </Tooltip>
        )}
      </Col>

      <Col xs={12} md={4} lg={4} className="rowFlex flexEnd">
        <Space>
          <ExportExcel
            sheets={sheets}
            fileName={fileName}
            button={
              <Button type="primary" icon={<DownloadIcon />}>
                {Words.excel}
              </Button>
            }
          />

          {componentRef && (
            <Button
              type="primary"
              style={{ display: "flex", alignItems: "center" }}
              onClick={handlePrint}
            >
              <RiPrinterLine fontSize="20px" style={{ marginLeft: "5px" }} />
              {!mobileView && Words.print}
            </Button>
          )}

          {onAdd && (
            <Button type="primary" icon={<PlusIcon />} onClick={onAdd}>
              {Words.new}
            </Button>
          )}
        </Space>
      </Col>
    </>
  );
};

export default SimpleDataPageHeader;

import React, { useState, useRef } from "react";
import { useMount } from "react-use";
import service from "../../../../services/settings/org/departments-service";
import { OrganizationGraph } from "@ant-design/charts";
//---
import { fileBasicUrl } from "../../../../config.json";
import utils from "../../../../tools/utils";
import DepartmentMembersModal from "./department-members-modal";
import Words from "../../../../resources/words";
import { Button, Space, message } from "antd";
import { FcFlowChart, FcParallelTasks } from "react-icons/fc";

const OrgChartPage = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [departmentID, setDepartmentID] = useState(0);
  const [departmentTitle, setDepartmentTitle] = useState("");
  //............
  const [typeChart, setTypeChart] = useState("TB");

  const inputRef = useRef(null);

  useMount(async () => {
    const data = await service.getAllData();

    setDepartments(data);
  });

  const handleShowModal = (departmentID, departmentTitle, shape) => {
    if (shape !== "marker") {
      setDepartmentTitle(departmentTitle);
      setDepartmentID(departmentID);
      setShowModal(true);
    }
  };

  const getNodes = (departments) => {
    let node_list = {};

    if (departments.length > 0) {
      node_list = getAntdNodes(
        departments.filter((n) => n.ParentDepartmentID === 0)[0],
        departments
      );
    }

    return node_list;
  };

  const getAntdNodes = (department, depList) => {
    let children = [];

    const {
      DepartmentID,
      DepartmentTitle,
      Manager,
      EmployeesCount,
    } = department;

    const subDepartments = depList.filter(
      (d) => d.ParentDepartmentID === DepartmentID
    );

    subDepartments.forEach((dep) => {
      children = [...children, getAntdNodes(dep, depList)];
    });

    return {
      id: `${DepartmentID}`,
      value: {
        text: utils.farsiNum(DepartmentTitle),
        image: Manager?.PicFileName || "",
        employeesCount: EmployeesCount,
        fullName: Manager ? `${Manager.FirstName} ${Manager.LastName}` : "",
      },
      children,
    };
  };

  const handleSwitchChart = () => {
    inputRef.current?.click();

    switch (typeChart) {
      case "TB":
        setTypeChart("RL");
        break;
      case "RL":
        setTypeChart("TB");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Space>
        <Button
          type="link"
          icon={
            typeChart === "RL" ? (
              <FcParallelTasks
                style={{ fontSize: "50px", transform: "rotate(180deg)" }}
              />
            ) : (
              <FcFlowChart style={{ fontSize: "50px" }} />
            )
          }
          onClick={handleSwitchChart}
          ref={inputRef}
        />
      </Space>
      {departments.length > 0 && (
        <OrganizationGraph
          data={getNodes(departments)}
          behaviors={["drag-canvas", "zoom-canvas", "drag-node"]}
          markerCfg={{
            show: true,
            collapsed: true,
            position: "bottom",

            //Width of Collapse Icon but didn`t Work

            style: {
              marginTop: "20px",
            },
          }}
          nodeCfg={{
            style: (node) => {
              return {
                fill: "#B1ABF4",
                stroke: "blue",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              };
            },
            size: [260, 100],
            customContent: (item, group, cfg) => {
              const { startX, startY, width } = cfg;
              const { text, image, fullName, employeesCount } = item;

              const textShape1 =
                text &&
                group?.addShape("text", {
                  attrs: {
                    x: startX + width / 2,
                    y: startY + 25,
                    text,
                    fill: "black",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "black",
                    fontFamily: "Yekan",
                    fontSize: 20,
                    fontWeight: "bolder",
                  },
                  name: `text-${Math.random()}`,
                });

              const textShape2 =
                text &&
                group?.addShape("text", {
                  attrs: {
                    x: image ? startX + width / 2 - 30 : startX + width / 2,
                    y: startY + 50,
                    text:
                      fullName.length > 0
                        ? `${Words.department_manager} : ${fullName}`
                        : Words.no_department_manager,
                    fill: "black",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "Yekan",
                    position: "absolute",
                  },
                  font: {
                    size: 34,
                  },
                  name: `text2-${Math.random()}`,
                });

              const textShape3 = group?.addShape("text", {
                attrs: {
                  x:
                    image.length > 0
                      ? startX + width / 2 - 30
                      : startX + width / 2,
                  y: startY + 70,
                  text:
                    employeesCount > 0
                      ? `${Words.employees} : ${utils.farsiNum(
                          employeesCount
                        )} ${Words.nafar}`
                      : Words.no_employee,
                  fill: "black",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "Yekan",
                },
                name: `text3-${Math.random()}`,
              });

              const textShape4 =
                text &&
                group?.addShape("image", {
                  attrs: {
                    x: startX + 180,
                    y: startY + 23,
                    width: 60,
                    height: 60,
                    img: image
                      ? `${fileBasicUrl}/${"member-profiles"}/${image}`
                      : "",
                  },

                  // Unique field within group
                  name: `text4-${Math.random()}`,
                });
              return Math.max(
                textShape1?.getBBox().height ?? 0,
                textShape2?.getBBox().height ?? 0,
                textShape3?.getBBox().height ?? 0,
                textShape4?.getBBox().height ?? 0
              );
            },
          }}
          minimapCfg={{
            show: true,
            type: "keyShape",
            refresh: true,
            padding: 20,
          }}
          layout={{
            direction: typeChart,
            getWidth: () => {
              return 300;
            },
            getHeight: () => {
              return 100;
            },
            getVGap: () => {
              return 25;
            },
            getHGap: () => {
              return 25;
            },
          }}
          onReady={async (graph) => {
            graph.on("node:click", (evt) => {
              const item = evt.item._cfg;
              const shape = evt.shape.cfg;

              handleShowModal(item.id, item.model.value.text, shape.type);
            });
            graph.toFullDataURL(() =>
              message.success(Words.success_load_graph)
            );
          }}
        />
      )}

      {showModal && (
        <DepartmentMembersModal
          onOk={() => {
            setShowModal(false);
          }}
          isOpen={showModal}
          departmentID={departmentID}
          departmentTitle={departmentTitle}
        />
      )}
    </>
  );
};

export default OrgChartPage;

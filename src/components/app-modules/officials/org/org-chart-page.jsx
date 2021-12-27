import React, { useState } from "react";
import { useMount } from "react-use";
import service from "./../../../../services/official/org/departments-service";
import { OrganizationGraph } from "@ant-design/charts";
//---
import { fileBasicUrl } from "../../../../config.json";
import utils from "../../../../tools/utils";
import DepartmentMembersModal from "./department-members-modal";
import Words from "../../../../resources/words";
//---

const OrgChartPage = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [departmentID, setDepartmentID] = useState(0);
  const [departmentTitle, setDepartmentTitle] = useState("");

  useMount(async () => {
    const data = await service.getAllData();

    setDepartments(data);
  });

  const handleShowModal = (departmentID, departmentTitle) => {
    setDepartmentTitle(departmentTitle);
    setDepartmentID(departmentID);
    setShowModal(true);
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

    let { DepartmentID, DepartmentTitle, Manager, EmployeesCount } = department;

    const subDepartments = depList.filter(
      (d) => d.ParentDepartmentID === DepartmentID
    );

    subDepartments.forEach((dep) => {
      children = [...children, getAntdNodes(dep, depList)];
    });

    Manager = JSON.parse(Manager);

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

  return (
    <>
      {departments.length > 0 && (
        <OrganizationGraph
          data={getNodes(departments)}
          behaviors={["drag-canvas", "zoom-canvas", "drag-node"]}
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
                  // Unique field within group
                  name: `text-${Math.random()}`,
                });

              const textShape2 =
                text &&
                group?.addShape("text", {
                  attrs: {
                    x: image ? startX + width / 2 - 30 : startX + width / 2,
                    y: startY + 50,
                    text:
                      fullName?.length > 0
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
                  // Unique field within group
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
                // Unique field within group
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
            direction: "TB",
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
          onReady={(graph) => {
            graph.on("node:click", (evt) => {
              const item = evt.item._cfg;
              handleShowModal(item.id, item.model.value.text);
            });
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

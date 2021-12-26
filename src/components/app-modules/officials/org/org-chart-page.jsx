import React, { useState } from "react";
import { useMount } from "react-use";
import service from "./../../../../services/official/org/departments-service";
import { OrganizationGraph } from "@ant-design/charts";
import { fileBasicUrl } from "../../../../config.json";
import utils from "../../../../tools/utils";
import DepartmentMembersModal from "./department-members-modal";
import Words from "../../../../resources/words";

const OrgChartPage = () => {
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [depID, setDepID] = useState();
  const [depTitle, setDepTitle] = useState("");

  useMount(async () => {
    const data = await service.getAllData();

    setDepartments(data);
  });

  const handleShowModal = (departmentID, departmentTitle) => {
    setDepTitle(departmentTitle);
    setDepID(departmentID);
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

    const {
      DepartmentID,
      DepartmentTitle,
      PicFileName,
      CountMembers,
      FullName,
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
        text: DepartmentTitle,
        image: PicFileName,
        countMembers: CountMembers,
        fullName: FullName,
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
              const { text, fullName, image, countMembers } = item;

              const textShape =
                text &&
                group?.addShape("text", {
                  attrs: {
                    x: startX + width / 2,
                    y: startY + 20,
                    text,
                    fill: "black",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "black",
                    fontFamily: "Yekan",
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
                      fullName.length > 0
                        ? `${Words.manager} : ${fullName}`
                        : Words.no_manager,
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
              const textShape3 =
                countMembers &&
                group?.addShape("text", {
                  attrs: {
                    x:
                      image.length > 0
                        ? startX + width / 2 - 30
                        : startX + width / 2,
                    y: startY + 70,
                    text:
                      countMembers > 0
                        ? `${Words.users} : ${utils.farsiNum(countMembers)} ${
                            Words.person
                          }`
                        : Words.no_user,
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
                    x: startX + 170,
                    y: startY + 23,
                    width: 60,
                    height: 60,
                    img: `${fileBasicUrl}/${"member-profiles"}/${image}`,
                  },
                  // Unique field within group
                  name: `text4-${Math.random()}`,
                });
              return Math.max(
                textShape?.getBBox().height ?? 0,
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
          departmentID={depID}
          departmentTitle={depTitle}
        />
      )}
    </>
  );
};

export default OrgChartPage;

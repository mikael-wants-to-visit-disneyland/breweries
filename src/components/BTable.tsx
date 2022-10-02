import { Table, Progress, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { IBrewery } from "../App";
import "./BTable.css";

export interface BTableProps {
  breweries: IBrewery[];
  selectedBrewery: string | null;
  setSelectedBreweryCallback: (id: string | null) => void;
}

export default function BTable(props: BTableProps) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "breweryType",
      key: "breweryType",
    },
    {
      title: "Street",
      dataIndex: "street",
      key: "street",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (value: number) => (
        <Progress percent={value} size="small" showInfo={false} />
      ),
    },
    {
      dataIndex: "url",
      key: "url",
      render: (url: string) =>
        url && (
          <div
            style={{
              width: 0,
              overflow: "visible",
              transform: "translate(36px)",
            }}
          >
            <a href={url} target="_blank">
              <Tag icon={<ArrowRightOutlined />} color="cyan">
                website
              </Tag>
            </a>
          </div>
        ),
    },
  ];
  return (
    <Table
      className="breweries-table"
      rowClassName={(row) => {
        if (row.id === props.selectedBrewery) {
          return "highlighted-row";
        } else if (props.selectedBrewery) {
          return "faded-row";
        }
        return "";
      }}
      columns={columns}
      dataSource={props.breweries}
      size="small"
      onRow={(row) => ({
        onMouseEnter: () => props.setSelectedBreweryCallback(row.id),
        onMouseLeave: () => props.setSelectedBreweryCallback(null),
      })}
    />
  );
}

import React from "react";
import _ from "lodash";
import "./App.css";
import { Map, Marker } from "pigeon-maps";
import { Table, Progress } from "antd";
import "antd/dist/antd.css";

const PAGE_SIZE = 20;
const MARKER_WIDTH = 30;
const API_URL = `https://api.openbrewerydb.org/breweries?by_city=san_diego&per_page=${PAGE_SIZE}`;

export interface IBrewery {
  id: string;
  name: string;
  breweryType: string;
  street: string;
  city: string;
  country: string;
  longitude: number;
  latitude: number;
  phone: string;
  url: string;
  rating: number;
}

function App() {
  const [breweries, setBreweries] = React.useState<IBrewery[]>([]);
  const [center, setCenter] = React.useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = React.useState(9);
  React.useEffect(() => {
    getAndSetBreweries();
  }, []);
  React.useEffect(() => {
    setCenter([
      _.mean(breweries.map((b: IBrewery) => b.latitude)),
      _.mean(breweries.map((b: IBrewery) => b.longitude)),
    ]);
  }, [breweries]);
  const getAndSetBreweries = async () =>
    fetch(API_URL)
      .then((result) => result.json())
      .then((bs) =>
        setBreweries(
          bs.map((b: any) => ({
            id: b.id,
            name: b.name,
            breweryType: b.brewery_type,
            street: b.street,
            city: b.city,
            country: b.country,
            longitude: parseFloat(b.longitude),
            latitude: parseFloat(b.latitude),
            phone: b.phone,
            url: b.website_url,
            rating: 100 * Math.random(),
          }))
        )
      )
      .catch((err) => console.error(err));
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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (value: number) => (
        <Progress percent={value} size="small" showInfo={false} />
      ),
    },
  ];
  console.log(breweries);
  return (
    <div className="App">
      <div className="App-body">
        <Map
          height={300}
          center={center}
          zoom={zoom}
          onBoundsChanged={({ center, zoom }) => {
            setCenter(center);
            setZoom(zoom);
          }}
        >
          {breweries.map((b: IBrewery) => (
            <Marker
              key={b.id}
              width={MARKER_WIDTH}
              anchor={[b.latitude, b.longitude]}
            />
          ))}
        </Map>
        <Table
          className="breweries-table"
          columns={columns}
          dataSource={breweries}
          size="small"
        />
      </div>
    </div>
  );
}

export default App;

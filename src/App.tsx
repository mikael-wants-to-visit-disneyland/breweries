import React from "react";
import _ from "lodash";
import "./App.css";
import { Map, Marker } from "pigeon-maps";
import { Select } from "antd";
import "antd/dist/antd.css";
import { DefaultOptionType } from "antd/lib/cascader";
import BTable from "./components/BTable";

const MAP_HEIGHT = 310;
const PAGE_SIZE = 20;
const MARKER_WIDTH = 40;
const DEFAULT_ZOOM = 12;
const MARKER_COLOR = "#0080ff";
const API_URL = `https://api.openbrewerydb.org/breweries?by_city={TOWN}&by_state={STATE}&per_page=${PAGE_SIZE}`;
const DUMMY_LOCATIONS: ILocation[] = [
  { id: 0, town: "san_diego", state: "california" },
  { id: 1, town: "los_angeles", state: "california" },
  { id: 2, town: "oakland", state: "california" },
  { id: 3, town: "kansas_city", state: "missouri" },
  { id: 4, town: "tallahassee", state: "florida" },
  { id: 5, town: "orlando", state: "florida" },
  { id: 6, town: "portland", state: "maine" },
  { id: 7, town: "portland", state: "oregon" },
  { id: 8, town: "seattle", state: "washington" },
  { id: 9, town: "chicago", state: "illinois" },
  { id: 10, town: "detroit", state: "michigan" },
  { id: 11, town: "des_moines", state: "iowa" },
];

export interface ILocation {
  id: number;
  town: string;
  state: string;
}

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

const getUppercased = (word: string) =>
  word[0].toUpperCase() + word.substring(1);

const getDisplayLocationName = (location: ILocation) =>
  `${location.town
    .split("_")
    .map((word) => getUppercased(word))
    .join(" ")}, ${getUppercased(location.state)}`;

function App() {
  const [breweries, setBreweries] = React.useState<IBrewery[]>([]);
  const [center, setCenter] = React.useState<[number, number]>([0, 0]);
  const [zoom, setZoom] = React.useState<number>(DEFAULT_ZOOM);
  const [location, setLocation] = React.useState<ILocation | undefined>({
    id: 10,
    town: "detroit",
    state: "michigan",
  });
  const [selectedBrewery, setSelectedBrewery] = React.useState<string | null>(
    null
  );

  React.useEffect(() => {
    if (location) {
      getAndSetBreweries(location);
    }
  }, [location]);

  React.useEffect(() => {
    setCenter([
      _.mean(breweries.map((b: IBrewery) => b.latitude)),
      _.mean(breweries.map((b: IBrewery) => b.longitude)),
    ]);
  }, [breweries]);

  const getAndSetBreweries = async (location: ILocation) =>
    fetch(
      API_URL.replace("{TOWN}", location.town).replace(
        "{STATE}",
        location.state
      )
    )
      .then((result) => result.json())
      .then((bs) =>
        setBreweries(
          bs
            .filter((b: any) => b.latitude && b.longitude)
            .map((b: any) => ({
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

  const { Option } = Select;
  return (
    <div className="App">
      <div className="App-body">
        <div className="header">
          <div className="location-title">
            {location && getDisplayLocationName(location)}
          </div>
          <Select
            className="location-select"
            size="large"
            showSearch
            placeholder="Select location"
            onChange={(id) =>
              setLocation(DUMMY_LOCATIONS.find((loc) => loc.id === id))
            }
            optionFilterProp="children"
            filterOption={(input, option: DefaultOptionType | undefined) =>
              !!DUMMY_LOCATIONS.find(
                (loc) => loc.id === option?.value
              )?.town.includes(input.toLowerCase())
            }
          >
            {DUMMY_LOCATIONS.map((location) => (
              <Option key={location.id} value={location.id}>
                {getDisplayLocationName(location)}
              </Option>
            ))}
          </Select>
        </div>
        <Map
          height={MAP_HEIGHT}
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
              style={{
                opacity: !selectedBrewery || selectedBrewery === b.id ? 1 : 0.4,
                zIndex: selectedBrewery === b.id ? 100 : 1,
              }}
              color={MARKER_COLOR}
              width={MARKER_WIDTH}
              anchor={[b.latitude, b.longitude]}
              onMouseOver={(x) => setSelectedBrewery(b.id)}
              onMouseOut={(x) => setSelectedBrewery(null)}
            />
          ))}
        </Map>
        <BTable
          breweries={breweries}
          selectedBrewery={selectedBrewery}
          setSelectedBreweryCallback={(id) => setSelectedBrewery(id)}
        />
      </div>
    </div>
  );
}

export default App;

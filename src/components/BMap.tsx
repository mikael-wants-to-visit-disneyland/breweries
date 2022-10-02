import { Map, Marker } from "pigeon-maps";
import { IBrewery } from "../App";

const MARKER_WIDTH = 40;
const DEFAULT_ZOOM = 12;
const MARKER_COLOR = "#0080ff";

export interface BMapProps {
  height: number;
  center: [number, number];
  breweries: IBrewery[];
  selectedBrewery: string | null;
  setSelectedBreweryCallback: (id: string | null) => void;
}

export default function BMap(props: BMapProps) {
  return (
    <Map
      height={props.height}
      center={props.center}
      zoom={DEFAULT_ZOOM}
      // onBoundsChanged={({ center, zoom }) => {
      //   setCenter(center);
      //   setZoom(zoom);
      // }}
    >
      {props.breweries.map((b: IBrewery) => (
        <Marker
          key={b.id}
          style={{
            opacity:
              !props.selectedBrewery || props.selectedBrewery === b.id
                ? 1
                : 0.4,
            zIndex: props.selectedBrewery === b.id ? 100 : 1,
          }}
          color={MARKER_COLOR}
          width={MARKER_WIDTH}
          anchor={[b.latitude, b.longitude]}
          onMouseOver={(x) => props.setSelectedBreweryCallback(b.id)}
          onMouseOut={(x) => props.setSelectedBreweryCallback(null)}
        />
      ))}
    </Map>
  );
}

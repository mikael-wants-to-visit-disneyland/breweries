# Brutally Beautiful Brewery Browser

A lightweight platform for browsing American breweries. Made not only for beer bros, but for any lover of booze.

## Process

### Users
There are two main user groups that we wanted to satisfy:

1. Restaurants, bars and shops looking to source local beers.
2. People who want to sample craft beers.

### Assumptions

Without yet talking with a single user, we made some assumptions:

1. Users tend to consider a town or city as the natural unit of navigation.
2. Some users want to drill down into breweries by location, while others want to start their exploration from the companies' details.
3. There is a need for information about the breweries' perceived quality.

Each of these assumptions lead to the following decisions respectively:

1. The view shows all the breweries for a town / city, chosen by a selection element, and the location is shown in the title.
2. It does not matter whether a user hovers over a row in the table or over a marker on the map; these interactions are symmetric.
3. We added a dummy 'rating' for each brewery. As there is no unified API for brewery ratings, if we end up using such a feature in a production version, the data could be a synthesis form multiple sources.

We aim to do some proper UX research over the next few months in order to find out users' actual painpoints and opportunities for value boosting, and thus account for all major use cases. It may be, for example, that some users do not want to restrict their searching to one town at a time, but would want to view a whole county or region, or by postcode.

### Implementation

This is a simple React app, with a single view. We chose `antd` as the UI library due to its supreme combination of aesthetics and simplicity of use.

## Todo

If you would like to contribute, these would be a great place to start from:

### Issues

- It is possible to select a marker whose corresponding table row is not on the current page. Should switch the page to show it.
- The map's zoom level is currently a constant, which causes some markers to be non-visible for many locations. Should ensure that all markers are visible by default.
- Some breweries lack a latitude and longitude -- these are currently filtered out. While it would be ideal for this to be fixed in the database, we should handle the non-ideal reality by figuring out the coordinates from the street address.

### Nice to have

- Extend the context outside of the USA, to be worldwide.
- Add schema validation, using e.g. `yup`
- Add filtering, e.g. by brewery type. This may actually be critical for the UX.
- Replace the brewery type words with icons in order to make the type into a more visually intuitive feature.

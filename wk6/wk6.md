# Untidy Mapping

Teams: [Sayan, Asa], [Sethu, Santiago, Yara]

This week we're going to make a map again, and host it on github pages again. However, this time the data is not going to be as easy to use for mapping as it will not be supplied with values for administrative areas, but as a set of records with coordinates instead.

## Data

This week we have south Wales crime data for the last year, and we would like to produce some maps of this data, as we did last week. However, rather than having a neat value for each administrative area, we have a big list of records, most of which have geographic coordinates and/or a street name, so we are going to have to do some more work to get this work onto a map.

We could:
1. use a shape at each point, which could be coloured or sized (or both) according to the data
2. use an algorithm (such as a voronoi) to create shapes around each of the points that *estimate* the area covered by that point
3. 'bucket' sets of points together and use one of the methods above
4. use a lookup to convert from a coordinate to an administrative area of some kind
5. something else?

Create a map with this data!

You could use one of the tools we used last week to do this, or work with an LLM/Coding Agent to create a map from scratch using a JavaScript library such as [Leaflet.js](https://leafletjs.com/)

## Deliverable

Embed the maps you create in a webpage, and create a new repository on github to put the code in. Publish this webpage using [Github Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

Submit a pull request to *this* workshops repository adding a link to your page and to the code repository below:


### [Sayan, Asa]

[Page]()

[Code]()


### [Sethu, Santiago, Yara]

[Page]()

[Code]()

#### Data

Contains data released under an [Open Government Licence 3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/)

# Tiny Town
Tiny Town is a project I imagined a while ago as part of my journey learning to program years ago. Initially inspired by Animal Crossing, the concept began generally
as a path builder that I attempted to build in Unity using C#. The idea was to create a tilemap of "grass" that users could edit and add dirt paths by clicking the tile
with a paving tool. The tiles update automatically to change their textures based on the state of the surrounding tiles (for example, if a tile is paved and so are the 
ones above and below it, the paths should connect wihout further user instruction).

## Release Notes

### Version 0.1
My initial commit. Added infrastructure for tile updates and paving. Temporary assets have been added to represent grass and paved tiles. Some basic CSS to style the grid.

### Version 0.2
Minor CSS changes to make the grid more responsive.

### Versoin 0.3
Added a configurable grid height and width variables and updated the infrastructure so that the size of the grid can be changed directly in the script by changing the variables.
This allows for easier testing of different grid sizes.

### Version 0.4
This update solved two of the biggest challenges I had whilst working on the tilemap/grid system. The way the tile update function works is to find all the surrounding tiles
and to iterate through each one and to assess them accordingly. The problem with this method is when it came to the perimeter of the grid. The tiles at the top would check to
find tiles above it and break the code since they did not exist. Similarly, I wanted to make the paths on the perimeter of the grid connect "outside" the grid, to make it appear
as though the grid is intended to continue outside the scope visible to the user.

Initially, I had planned to write separate code under the condition that a tile was on the perimeter and to handle the updates differently than inner tiles. I stumbled across a
solution in testing that allowed me to skip this process altogether. Instead, when the grid is generated, it automatically sets the perimeter tiles to a paved state and then hides
them from view. The true perimeter becomes uninteractable, whilst the visible perimeter acts exactly as intended. With this solution, I saved myself the trouble of possibly hundreds
of lines of code to account for the cases in which the tile exists in the perimeter.

In this update I also added the code infrastructure necessary to generate a grid of tools. For now, there is a "path" tool and a "remove" tool. I plan to add more tools later that will allow
the user to add sources of water like rivers and ponds. Additionally, I intend to add other features such as town ameninites like housing and parks and such.

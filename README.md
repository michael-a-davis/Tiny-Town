# Tiny Town
Tiny Town was a concept I imagined years ago when I first started to learn to code using C# and Unity. The
idea is a simple path-building module. Users dig dirt paths in a grid of grass tiles by clicking on them.
The code would then automatically adjust each tile to ensure they were all connected without further instruction
from the user. That is what I have implemented here, but I plan to add more features in the future. I would
like to fully flesh this out into a small browser game in which users can "manage" a small town.

Test it here: https://michael-a-davis.github.io/Tiny-Town

## Release Notes
### Version 0.1
My initial commit. This build defined the grid-building function. Simple testing of the path-building logic. Temporary
textures for grass and paths.

### Version 0.2
Added some minor CSS fixes to make the grid of tiles more responsive.

### Version 0.3
Added configurable grid width and height variables. The script automatically styles the grid and detects its
new perimeter for easy configuration.

### Version 0.4
This build solved two of the biggest problems I was facing during testing. In order to update the tiles, a loop
iterates through each of them, assesses the state of its neighbors (paved or unpaved), and determines which texture
to apply based on this. The issue is when it came to the perimeter of the grid. It kept searching for tiles that did
not exist (for example, a tile at the top of the grid has no neighbor directly above it), which broke the code.

In addition, I wanted the paths on the perimeter to appear as though they were connecting to another path outside the
grid, to give the illusion that this little world extends beyond what the user can interact with. I had initially planned
to write a specific chain of conditions that applied only to perimeter tiles to account for both of these problems, but
instead, I stumbled into a solution that knocks out both of these problems and actually required less code in the end.

I simply applied a permanent state of being paved to the perimeter tiles and hid them. The true perimeter of the grid
does not exist to the user. It is a phantom ring beyond the visible grid. This solves the problem of having to account
for tiles beyond the scope of the grid because the UpdateTiles function never has to touch the perimeter. It also solves
the problem of applying different textures to the perimeter because they are always connected to the outside now.

### Version 0.5
New textures for grass and path tiles. Likely still temporary, but better than what was there before. Major changes to the
infrastructure to allow for easy addition of further tools. Instead of cycling through each possible combination of neighbor
paved states, the code now generates a state array of 0s and 1s (0 for unpaved, 1 for paved). A switch statement then handles
each possible combination of neighbor states.

### Version 0.6
Added a tree tool with a single tree texture. Plan to add more textures in the future for random generation.

### Version 0.7
Added a water tool to craft riverways. Currently pondering ways to expand the neighbor array to account for diagonal
neighbors in addition to orthogonal ones to allow for double-wide paths and waterways. The number of possible combination
of eight variables proves to be challenging in terms of scope. 256 cases versus 16 with the current model.
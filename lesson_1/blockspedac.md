problem: build a valid structure. 
- Input: integer for a specific amount of cubes
- Output: integer for levt over cubes after building tallest possible valid structure.

Explicit rules: 
- blocks are cubes
- the structure has to be built with layers of cubes
- layers can not have gaps between blocks
- the top (and final) layer is a single block
- A block in the upper layer needs to be supported by 4 blocks in the lower layer
- A block in the lower layer can support more than 1 block in the upper layer

Implicit rules: 
- We need more than one layer 

Question: How can one block in the lower layer support more that one block in the upper layer if the a block in the upper layer needs 4 blocks in the lower layer to support it? -- your mental model was upside down. 

Question: How many blocks make one layer? -- however many it takees to support the layer above it. it seems that every lyer has a predetermined number of block to it. 

Question: Is there a limit to how many blocks I can use in a layer? -- yes. it appears that there is a predetermined number per layer and if the number is not hit specifically then we bust and return the difference.

Question: Will there always be blocks left over? -- no there if you hit the exact amount of blocks needed to full all the layers to a valid structure there will be no blocks left over.


***Mental Model***
the first layer is 1x1        -       = 1 block
the second layer is 2x2     -- --     = 5 blocks
the third layer is 3x3     --- ---    = 14 blocks
the forth layer is 4x4    ---- ----   = 30 blocks


Data Structure: 
I believe I will be dealing with Looping 


Algorithm:

- take an argument that is a number.
- check that number against our mental model of how this structure should work
- return the remainder of blocks

1. Start:
  - a count for our 'blocks remaining' count assigned to our input. 
  - a count for our 'current layer' count assigned to 0.
2. Calculate the need for our 'next layer' by adding 1 to our 'current layer'.
3. Calculate the 'block required' by multiplying 'next layer' to itself.
4. Determine if the number of 'blocks remaining' is greater than or equal to the number of 'blocks requiered' to build the next layer
  - if it is:
    - subract 'blocks remaining' from 'blocks requiered'
    - increment 'current layer' by 1
    - go back to step 2
  - if it isnt:
    - return 'blocks remaining'





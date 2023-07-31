Input: array of strings
Output: new array of strings

Explicit: 
  - the order of the new array is Highest number of adjacent consonants to the least.
  - If two strings have the same adjacent consonants they maintain the original order.
  - Adjacent is if they are next to each other or if there is an empty space.

Implicit:
  - strings can have spaces in them.
  - 

Questions: 
  - does the highest number of consonants start on the left?
  - what if a string has no adjacent consonants?
  - is case important?
  - can strings be empty?
  - what is meant by "a space between two consonants in adjacent words"?
  - is case important?
  - Single consonants in a string do not affect sort order in comparison to strings with no consonants. Only adjacent consonants affect sort order.

***Examples***

With the test cases giving it fits my mental model and what i understood and answers the the the questions on if there are no adjacent consonants and what we mean when there is a space between words in a string. it does not answer case or empty strings.

***Data Structure***

- Array
- String
- Loops
- If/Else statements

***Algorithm***

- we need a function that will take an array of strings
- we need to loop through the strings and find adjacent consonents
- we will return a new array of strings with the words in decending order of most adjacent consonants to least adjacent consonants 


+remove the paces from the input string
+initialize a count  to zero
+initialize a temp string to empty string
+iterate through the input string. for each letter:
  +if the letter is a consanant, concatenate it to the temp string
  +if the letter is a vowel:
    +if the temp string has a length greater than 1 AND the temp string has a length greater than the current count, set the count to the length of the temp string
    +reset the temp string to an empy string
+return the count
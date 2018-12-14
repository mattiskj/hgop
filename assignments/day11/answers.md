# Server.js/stats

### Explain why we put each consecutive call inside the onSuccess callback of the previous database call, instead of just placing them next to each other.

If placeing them next to eachother they will all run even though one of them fails, and we want to exit the function when we hit failure.

### What does the "done" parameter do?

"Done" is a callback function and will call done.fail if the jest test fails, and done if the jest tests passes.
In our case it will call done if a games is complete, and done.fail() if the game fails or times out.
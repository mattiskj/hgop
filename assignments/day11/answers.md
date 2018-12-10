# Server.js/stats

### Explain why we put each consecutive call inside the onSuccess callback of the previous database call, instead of just placing them next to each other.

If placeing them next to eachother they will all run even though one of them fails, and we want to exit the function when we hit failure.
Start of some tools around pasting MySQL output and getting that in more useful outputs, e.g. a comma-separated-list.

## Usage

❗**Very alpha**. Expect the unexpected, random console logs, etc.

```
echo '| 1234 |
| 5678 |' | node bin.js

cat some_db_output.txt | node bin.js --tab-delimited
```

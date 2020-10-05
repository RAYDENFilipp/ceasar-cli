# caesar-cli
## RS Node School Task 1

### How to use

1. install globally `npm install -g ceasar-cli`.
1. then run `my_caesar_cli  --help` to see examples how to yse this CLI:
      - `my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"`
      - `my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt`
      - `my_caesar_cli --action decode --shift 7 --input encoded.txt --output plain.txt`
      - `my_caesar_cli --action encode --shift 7  --output plain.txt`
      - `my_caesar_cli --action decode --shift 7 --input decoded.txt`
      - `my_caesar_cli --action encode --shift 7`
      - `my_caesar_cli --action decode --shift 7`

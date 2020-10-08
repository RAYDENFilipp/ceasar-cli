# caesar-cli

## RS Node School Task 1

### How to use

1.  install globally `npm install -g ceasar-cli`.
1.  Then you run `my_caesar_cli` with the following flags:
1.  - required:

      - `-a` or `--action` - an action to perform, either `decode` or `encode`. Throws an error otherwise.
      - `-s` or `--shift` - a shift by how many numbers to shift the alphabet, positive integers from 1. Throws an error if the flag is omitted.

    - optional:
      - `-i` or `--input` - a text-file to read an input from. It's better be an existing text-file or an error is thrown.
  If the flag is omitted, the input is read from the console.
      - `-o` or `--output` - a text-file to write an output to. It's better be an existing text-file or an error is thrown.
  If the flag is omitted, the output is written to the console.

You can also run `my_caesar_cli --help` to see examples how to yse this CLI:

    - my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
    - my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
    - my_caesar_cli --action decode --shift 7 --input encoded.txt --output plain.txt
    - my_caesar_cli --action encode --shift 7 --output plain.txt
    - my_caesar_cli --action decode --shift 7 --input decoded.txt
    - my_caesar_cli --action encode --shift 7
    - my_caesar_cli --action decode --shift 7

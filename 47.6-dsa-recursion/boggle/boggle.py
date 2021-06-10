"""Boggle word check.

Given a 5x5 boggle board, see if you can find a given word in it.

In Boggle, you can start with any letter, then move in any NEWS direction.
You can continue to change directions, but you cannot use the exact same
tile twice.

So, for example::

    N C A N E
    O U I O P
    Z Q Z O N
    F A D P L
    E D E A Z

In this grid, you could find `NOON* (start at the `N` in the top
row, head south, and turn east in the third row). You cannot find
the word `CANON` --- while you can find `CANO` by starting at the
top-left `C`, you can 't re-use the exact same `N` tile on the
front row, and there's no other `N` you can reach.

For example::

    >>> board = make_board('''
    ... N C A N E
    ... O U I O P
    ... Z Q Z O N
    ... F A D P L
    ... E D E A Z
    ... ''')

`NOON` should be found (0, 3) -> (1, 3) -> (2, 3) -> (2, 4)::

    >>> find(board, "NOON")
    True

`NOPE` should be found (0, 3) -> (1, 3) -> (1, 4) -> (0, 4)::

    >>> find(board, "NOPE")
    True

`CANON` can't be found (`CANO` starts at (0, 1) but can't find
the last `N` and can't re-use the N)::

    >>> find(board, "CANON")
    False

You cannot travel diagonally in one move, which would be required
to find `QUINE`::

    >>> find(board, "QUINE")
    False

We can recover if we start going down a false path (start 3, 0)::

    >>> find(board, "FADED")
    True


An extra tricky case --- it needs to find the `N` toward the top right,
and then go down, left, up, up, right to find all four `O`s and the `S`::

    >>> board2 = make_board('''
    ... E D O S Z
    ... N S O N R
    ... O U O O P
    ... Z Q Z O R
    ... F A D P L
    ... ''')

    >>> find(board2, "NOOOOS")
    True

"""


def make_board(board_string):
    """Make a board from a string.

    For example::

        >>> board = make_board('''
        ... N C A N E
        ... O U I O P
        ... Z Q Z O N
        ... F A D P L
        ... E D E A Z
        ... ''')

        >>> len(board)
        5

        >>> board[0]
        ['N', 'C', 'A', 'N', 'E']
    """

    letters = board_string.split()

    board = [
        letters[0:5],
        letters[5:10],
        letters[10:15],
        letters[15:20],
        letters[20:25],
    ]

    return board


def find(board, word):
    """Can word be found in board?"""

    def _find(board, word, from_index=None, excluded_index=[]):
        """Helper method to find the word"""

        if len(word) == 0:
            return True

        letter = word.pop()

        if from_index is None:
            x = 0
            while x < 5:
                y = 0
                while y < 5:
                    if letter == board[x][y]:
                        if _find(board, word, (x, y), [f'{x}_{y}']):
                            return True

                    y += 1
                x += 1

            return False

        (x, y) = from_index

        for (i,  j) in (
            (x + 1, y),
            (x - 1, y),
            (x, y + 1),
            (x, y - 1)
        ):
            if i >= 0 and i < 5 and j >= 0 and j < 5:
                if board[i][j] == letter and f'{i}_{j}' not in excluded_index:
                    if _find(board , word , (i, j) , [*excluded_index , f'{i}_{j}']):
                        return True

        return False

    word_arr = [*word]
    word_arr.reverse()

    return _find(board, word_arr)


if __name__ == '__main__':
    import doctest
    if doctest.testmod().failed == 0:
        print("\n*** ALL TESTS PASSED; YOU FOUND SUCCESS! ***\n")

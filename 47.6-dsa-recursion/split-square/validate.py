"""Validate that a given square is valid.

Checks that this is either a simple square (``0`` or ``1``), or
a split square (a list of 4 items, each being a simple square or
a split square).

A simple square is valid::

    >>> validate(0)
    True

A split square of four simple filled squares is valid::

    >>> validate([1, 1, 1, 1])
    True

We can nest split and simple squares::

    >>> validate([1, 0, [1, [0, 0, 0, 0], 1, [1, 1, 1, 1]], 1])
    True

    >>> validate([1, [1, 0, 1, [0, [0, 0, 0, 0], 1, 1]], [1, 0, 1, 0], 1])
    True

Simple squares must be either 0 (empty) or 1 (filled)::

    >>> validate(2)
    False

Split squares must contain exactly four parts::

    >>> validate([1, 1, 1, 1, 1])
    False

    >>> validate([1, 0, [1, [0, 0, 0, 0, 1], 1, [1, 1, 1, 1]], 1])
    False

    >>> validate([1, [1, 0, 1, [0, [0, 0, 0], 1, 1]], [1, 0, 1, 0], 1])
    False

"""


def validate(s):
    """Validate that a given square is valid.."""

    if type(s) is int:
        # if not split, only allow 0 and 1
        if s in (0, 1):
            return True
        
        return False

    if len(s) != 4:
        # have exactly 4 squares
        return False
    
    for item in s:
        if not validate(item):
            #any sub squares fail, it fails
            return False

    return True

if __name__ == "__main__":
    import doctest
    if doctest.testmod().failed == 0:
        print ("\n*** ALL TESTS PASS; THAT'S SUPER-VALID WORK!\n")

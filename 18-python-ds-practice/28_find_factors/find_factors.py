def find_factors(num):
    """Find factors of num, in increasing order.

    >>> find_factors(10)
    [1, 2, 5, 10]

    >>> find_factors(11)
    [1, 11]

    >>> find_factors(111)
    [1, 3, 37, 111]

    >>> find_factors(321421)
    [1, 293, 1097, 321421]
    """

    result = {1, num}
    current_num = 2
    while current_num < num:
        if current_num not in result and num % current_num == 0:
            result.add(current_num)
            result.add(int(num / current_num))
        current_num += 1
    lst = list(result)
    lst.sort()
    return lst

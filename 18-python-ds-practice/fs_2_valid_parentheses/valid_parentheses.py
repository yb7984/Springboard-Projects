def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """

    open_count = 0
    if parens[0] == ")":
        return False

    for char in parens:
        if open_count < 0:
            return False
        if char == "(":
            open_count += 1
        elif char == ")":
            open_count -= 1
    return True if open_count == 0 else False

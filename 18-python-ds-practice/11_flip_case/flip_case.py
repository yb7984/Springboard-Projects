def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """

    lower_swap  = to_swap.lower()
    
    flip_phrase = [char.upper() if char == lower_swap else  char.lower() if char.lower() == lower_swap else char for char in phrase]

    return "".join(flip_phrase)

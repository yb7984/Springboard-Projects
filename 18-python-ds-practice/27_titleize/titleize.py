def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """

    words = phrase.lower().split(" ")

    capitalized_words = [word.capitalize() for word in words]

    return " ".join(capitalized_words)

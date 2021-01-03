def print_upper_words(words):
    """For a list of words, print out each word on a separate line, but in all uppercase.
    For example:
    print_upper_words(["hello", "hey", "goodbye", "eye", "yes"])
        HELLO
        HEY
        GOODBYE
        EYE
        YES
        """
    for word in words:
        print(word.upper())


def print_upper_words2(words):
    """
    For a list of words,  only prints words that start with the letter ‘e’ (either upper or lowercase), but in all uppercase.
    For example:
    print_upper_words2(["hello", "hey", "goodbye", "eye", "yes"])
        EYE
        """
    for word in words:
        word_up = word.upper()
        if word_up.startswith("E"):
            print(word_up)


def print_upper_words3(words , must_start_with = []):
    """
    For a list of words,  pass in a set of letters, and it only prints words that start with one of those letters, but in all uppercase.
    For example:
    print_upper_words3(["hello", "hey", "goodbye", "yo", "yes"],
        must_start_with={"h", "y"})
        HELLO
        HEY
        YO
        YES
        """
    for word in words:
        word_up = word.upper()
        for start_with in must_start_with:
            start_with  = start_with.upper()
            if word_up.startswith(start_with): 
                print(word_up)
                break


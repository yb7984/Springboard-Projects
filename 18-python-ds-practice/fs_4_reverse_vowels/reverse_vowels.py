def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """

    vowels = "aeiouAEIOU"
    vowel_indexes = {}
    for i in range(len(s)):
        if s[i] in vowels:
            vowel_indexes[i] = s[i]
    
    ss = ""
    key_index = 0
    keys = list(vowel_indexes.keys())
    for i in range(len(s)):
        if s[i] in vowels:
            ss += vowel_indexes[keys[-1 - key_index]]
            key_index += 1
        else:
            ss += s[i]
    
    return ss
def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    str1    = str(num1)
    str2    = str(num2)

    digits1  = set(str1)
    digits2 = set(str2)
    if digits1 == digits2:
        for digit in digits1:
            if str1.count(digit) != str2.count(digit):
                return False
        return True
    else:
        return False
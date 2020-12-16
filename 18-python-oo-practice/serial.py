"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self , start):
        """Create SerialGenerator from a start number"""
        self.start = start
        self.current = start

    
    def __repr__(self):
        """
        return string representation of an instance
        >>> serial = SerialGenerator(start=100) 
        >>> serial.generate()
        100
        >>> serial
        <SerialGenerator start=100 next=101>
        """
        return f"<SerialGenerator start={self.start} next={self.current}>"
    
    def generate(self):
        """
        Generate the serial number return next next sequential number
        """
        current = self.current
        self.current += 1
        return current

    def reset(self):
        """Reset the number back to the original start number"""
        self.current = self.start



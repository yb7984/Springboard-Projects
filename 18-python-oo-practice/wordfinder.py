"""Word Finder: finds random words from a dictionary."""
from random import randint

class WordFinder:
    """
    Class to read words from file and return a random word
    
    >>> wf = WordFinder('words.txt')
    3 words read

    >>> wf.random()
    'cat'

    >>> wf.random()
    'cat'

    >>> wf.random()
    'porcupine'

    >>> wf.random()
    'dog'
    """

    def __init__(self , filename):
        """Create the class and read the file of filename, print out how many lines are read"""
        self.filename = filename
        self.read_file(self.filename)

        print(f"{len(self.words)} words read")


    def __repr__(self):
        """return string representation of an instance"""
        return f"WordFinder(filename='{self.filename}')"
        
    def random(self):
        """Return a random word from the list"""
        return self.words[randint(0 , len(self.words) - 1)]

    def read_file(self , filename):
        """Read the file of filename and put words in to a list"""
        self.words = []
        with open(filename , "r") as file:
            for line in file:
                self.words.append(line.rstrip())


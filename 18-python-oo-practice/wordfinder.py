"""Word Finder: finds random words from a dictionary."""
import random

class WordFinder:
    """
    Class to read words from file and return a random word
    
    >>> wf = WordFinder('words.txt')
    235886 words read

    >>> word = wf.random()
    >>> word in wf.words 
    True

    >>> word = wf.random()
    >>> word in wf.words 
    True
 
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
        return self.words[random.randint(0 , len(self.words) - 1)]

    def read_file(self , filename):
        """Read the file of filename and put words in to a list"""
        self.words = []
        with open(filename , "r") as file:
            for line in file:
                self.fill_list(line)

    def fill_list(self , line):
        """Put the word into the list"""
        self.words.append(line.rstrip())


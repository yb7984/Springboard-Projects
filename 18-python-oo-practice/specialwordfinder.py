from wordfinder import WordFinder

class SpecialWordFinder(WordFinder):
    """
    WordFinder that only return the real word.

    For example, we could have a file like this:
    # Veggies

    kale
    parsnips

    # Fruits

    apple
    mango

    When we work with this, we want it to return one of the actual foods, like “kale” or “apple”, but never to return the blank lines or comments.
    
    """
    def __init__(self , filename):
        """Create a subclass of WordFinder"""
        super().__init__(filename)
    
    
    def __repr__(self):
        """return string representation of an instance"""
        return f"SpecialWordFinder(filename='{self.filename}')"

    def random(self):
        """
        Return a random word from the list
        """
        word = super().random().strip()

        while word == "" or word.startswith("#"):
            word = super().random().strip()

        return word
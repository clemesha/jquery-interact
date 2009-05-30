import inspect

def interact(f):
    args, varargs, varkw, defaults = inspect.getargspec(f)
    print args, varargs, varkw, defaults
    return f



if __name__ == "__main__":
    @interact
    def h(a, b=1):
        return a+b
    
    print h(10, b=20)

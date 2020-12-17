from flask import Flask, request
import operations

app = Flask(__name__)


@app.route("/add")
def get_add():
    """
    Add a and b and returns result as the body.
    """
    a = float(request.args["a"])
    b = float(request.args["b"])

    return str(operations.add(a , b))


@app.route("/sub")
def get_sub():
    """
    Subtracting b from a and returns result as the body.
    """
    a = float(request.args["a"])
    b = float(request.args["b"])

    return str(operations.sub(a , b))


@app.route("/mult")
def get_mult():
    """
    Multiplying a and b and returns result as the body.
    """
    a = float(request.args["a"])
    b = float(request.args["b"])

    return str(operations.mult(a , b))


@app.route("/div")
def get_div():
    """
    Dividing a by b and returns result as the body.
    """
    a = float(request.args["a"])
    b = float(request.args["b"])

    return str(operations.div(a , b))

@app.route("/math/<operation>")
def get_math(operation):
    """
    Do the math with a and b and returns result as the body.
    """
    a = float(request.args["a"])
    b = float(request.args["b"])

    if operation in {"add" , "sub" , "mult" , "div"}:
        op = getattr(operations , operation)

        return str(op(a , b))
    else:
        return "Undefined operation"


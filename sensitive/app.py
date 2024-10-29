from flask import Flask, render_template, request
import subprocess
app = Flask(__name__)

@app.route("/sensitive/", methods = ["GET", "POST"])
def hello():
    print(request.form)
    if (request.method == "POST" and request.form["cmd"]):
        print("command: " + request.form["cmd"] + request.form["args"])
        if (request.form["args"] == ''):
            results = eval('subprocess.run(("' + request.form["cmd"] + '").split(), capture_output = True, text = True)')
        else:
            results = eval('subprocess.run(("' + request.form["cmd"] + '" + " " + "' + request.form["args"] + '").split(), capture_output = True, text = True)')
        print(results)
        return render_template("./index.html", results=results)
    return render_template("./index.html", results="")

if __name__ == '__main__':
    app.run()

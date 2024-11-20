import os;
import json;
from flask import Flask, request, jsonify, redirect, render_template, make_response, Blueprint
app = Flask(__name__, static_url_path="", static_folder="web");

@app.route("/")
def index():
    return app.send_static_file("main.html");

@app.route("/echo", methods=["GET", "POST"])
def echoServer():
    if (request.method != "POST"):
        resp = {"response": "ERROR", "detail": "No post parameters provided"};
        return (str(resp));
    else:
        resp = {}
        resp["name"] = request.form.get("name", "");
        resp["date"] = request.form.get("date", "");
        resp["time"] = request.form.get("time", "");
        resp["message"] = request.form.get("message", "");
        return (json.dumps(resp));


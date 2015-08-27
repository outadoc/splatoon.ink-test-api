Splatoon.ink Test Server
========================

This project consists of a Node.JS script that simulates the [Splatoon.ink API](http://splatoon.ink/schedule.json).

Motivation
----------
When you're building an application that uses the splatoon.ink API, it may be
really handy to test every possible case, and that includes waiting 4 hours for the stages to change. It's really not idea when you're trying to debug something, trust me.

This script, set to rotate the stages every minute by default, should make it way easier to handle.

Usage
-----
    node test-server.js

Then just call `http://127.0.0.1:8080` instead of `https://splatoon.ink/schedule.json` and you'll get random data.

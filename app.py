import datetime as dt
import numpy as np
import json

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:password@localhost:5432/project_two_db")

# # reflect an existing database into a new model
Base = automap_base()
# # reflect the tables
Base.prepare(engine, reflect=True)

print(Base.classes.keys())

# # Save reference to the table
SquirrelCensusData = Base.classes.squirrel_census_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/squirrel_census_data"
    )


@app.route("/api/squirrel-census-data")
def squirrel_census_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all squirrel names"""
    # Query all passengers
    results = session.query(SquirrelCensusData).all()

    results_arr = make_dict(results)

    session.close()

    return jsonify(results_arr)

def make_dict(results):
    results_arr = []
    for row in results:
        results_arr.append({
            'id': row.id, 
            'x': float(row.x),
            'y': float(row.y)
        })
    return results_arr

if __name__ == '__main__':
    app.run(debug=True)

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
SquirrelHectareData = Base.classes.squirrel_hectare_data

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
        f"/api/squirrel-census-data<br/>"
        f"/api/squirrel-hectare-data"
    )


@app.route("/api/squirrel-census-data")
def squirrel_census_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all squirrel names"""
    # Query all passengers
    results = session.query(SquirrelCensusData).all()

    results_arr = make_census_dict(results)

    session.close()

    return jsonify(results_arr)

@app.route("/api/squirrel-hectare-data")
def squirrel_hectare_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all squirrel names"""
    # Query all passengers
    results = session.query(SquirrelHectareData).all()

    results_arr = make_hectare_dict(results)

    session.close()

    return jsonify(results_arr)

def make_census_dict(results):
    results_arr = []
    for row in results:
        results_arr.append({
            'id': row.id, 
            'x': float(row.x),
            'y': float(row.y),
            'unique_squirrel_id': row.unique_squirrel_id,
            'hectare': row.hectare,
            'shift': row.shift,
            'date': row.date,
            'hectare_squirrel_number': row.hectare_squirrel_number,
            'age': row.age,
            'primary_fur_color': row.primary_fur_color,
            'highlight_fur_color': row.highlight_fur_color,
            'combination_of_primary_and_highlight_color': row.combination_of_primary_and_highlight_color,
            'color_notes': row.color_notes,
            'location': row.location,
            'above_ground_sighter_measurement': row.above_ground_sighter_measurement,
            'specific_location': row.specific_location,
            'running': row.running,
            'chasing': row.chasing,
            'climbing': row.climbing,
            'eating': row.eating,
            'foraging': row.foraging,
            'other_activities': row.other_activities,
            'kuks': row.kuks,
            'quaas': row.quaas,
            'moans': row.moans,
            'tail_flags': row.tail_flags,
            'tail_twitches': row.tail_twitches,
            'approaches': row.approaches,
            'indifferent': row.indifferent,
            'runs_from': row.runs_from,
            'other_interactions': row.other_interactions,
            'lat_long': row.lat_long,
            'zip_codes': row.zip_codes,
            'community_districts': row.community_districts,
            'borough_boundaries': row.borough_boundaries,
            'city_council_districts': row.city_council_districts,
            'police_precincts': row.police_precincts
        })
    return results_arr

def make_hectare_dict(results):
    results_arr = []
    for row in results:
        results_arr.append({
            'the_geom': row.the_geom,
            'id': row.id, 
            'x_min': float(row.x_min),
            'x_max': float(row.x_max),
            'y_min': float(row.y_min),
            'y_max': float(row.y_max)
        })
    return results_arr

if __name__ == '__main__':
    app.run(debug=True)

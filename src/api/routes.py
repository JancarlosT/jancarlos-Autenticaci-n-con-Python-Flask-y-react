"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import json 


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup_user():
    body = json.loads(request.data)
    user_exist = User.query.filter_by(email=body["email"]).first()

    if user_exist != None:
        raise APIException('The user already exist', status_code=403)

    pw_hash=current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8')

    new_user=User(email=body["email"],password=pw_hash,is_active=True)

    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "message": "user created successfuly"
    }

    return jsonify(response_body), 200


@api.route('/login', methods=['POST'])
def login_user():
    body = json.loads(request.data)
    user = User.query.filter_by(email=body["email"]).first()

    if user is None:
        raise APIException('User not found', status_code=404)

    decrypted_password = current_app.bcrypt.check_password_hash(user.password, body["password"])

    if body["email"] != user.email or decrypted_password == False:
        raise APIException('Invalid credentials', status_code=401)

    access_token = create_access_token(identity=body["email"])

    response_body = {
        "user": user.serialize(),
        "access_token": access_token
    }

    return jsonify(response_body), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def private_user():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()

    if user is None:
        raise APIException('User not found', status_code=404)
    
    return jsonify(user.serialize()), 200
#!/bin/bash

ROOT_DIR="$(pwd)"

echo "For run this project, you need : Ruby on rails, sqlite and Angular install on machine !!!"

echo "Starting Rails server..."
cd "$ROOT_DIR/server"
bundle install
rails db:prepare
rails server -p 3000 &

echo "Starting Angular development server..."
cd "$ROOT_DIR/client"
ng serve --port 4200 &

wait

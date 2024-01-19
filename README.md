# ![](https://github.com/alexisfonte/simply-sweet/blob/main/client/src/assets/Simply%20Sweet%20Logo%20Orange.png?raw=true)

# Welcome to Simply Sweet Recipes!

> A recipe app sharing app

Simply Sweet Recipes is a full stack application that allows people share and discover baking recipes without the annoying life-stories and incessant ads commonly found on recipe websites. No mess. No fuss. Just simple, straitforward recipes.

This app features full user authentication and authorization, and allows users to easily create and edit their own recipes, and serach, view, favorite, and unfavorite recipes created by other users.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Demo](#demo)
- [Schema](#schema)
- [Backend API Endpoints](#backend-api-endpoints)
- [Setup](#setup)
- [Acknowledgements](#acknowledgements)

## Technologies Used

- React 18.2.0
- Ruby 2.7.4
- Rails 7.0.5
- useContext API
- Active Record
- PostgreSQL
- NodeJs 16.19.0
- React Router Dom 6.21.2
- Tailwind CSS 3.4.1
- React HeadlessUi 1.7.18

## Features

Users will be able to:

- Sign-up to recieve a unique ID for posting recipes
- Create recipes
- Favorite and Unfavorite recipes
- Modify any of their existing recipes
- Delete outdated/unwanted recipes permanently, or private any recipes thay want to keep hidden from other users
- Search for recipes by name
- See how many people have favorited their recipes

### Demo

#### Login/Sign Up

![](/images/LoginSignUpDemo.gif)

#### Browse/Search Recipes & Recipe Page

![]()

#### Create/Edit/Delete Recipes

![]()

#### User Page & Edit Profile

![]()

#### Favorite/Unfavorite Recipes

![]()

### Schema

![Database Schema](/images/SchemaDiagram.png)

### Backend API Endpoints

| Method | Endpoint       | Params                                                                                                                                                           | Description                      |
| ------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| GET    | /recipes       |                                                                                                                                                                  | returns all public recipes       |
| POST   | /recipes       | title, image_url, is_private, user_id, ingredients_attributes => [amount, unit, name, ordinal], directions_attributes => [direction, ordinal]                    | creates a new recipe             |
| PATCH  | /recipes/:id   | title, image_url, is_private, ingredients_attributes => [id, amount, unit, name, ordinal, _destroy], directions_attributes => [id, direction, ordinal, _destroy] | updates a recipe                 |
| DELETE | /recipes/:id   | recipe_id                                                                                                                                                        | deletes a recipe                 |
| GET    | /recipes/:id   | recipe_id                                                                                                                                                        | return a public recipe           |
| GET    | /avatars       |                                                                                                                                                                  | returns all avatars              |
| POST   | /favorites     | recipe_id, user_id                                                                                                                                               | favorites a recipe               |
| DELETE | /favorites/:id |                                                                                                                                                                  | unfavorites a recipe             |
| GET    | /users/:id     | user_id                                                                                                                                                          | returns a user and their recipes |
| POST   | /users         | username, password, avatar_id                                                                                                                                    | creates a new user               |
| PATCH  | /users/:id     | user_id, avatar_id                                                                                                                                               | updates a user's avatar          |
| GET    | /auth          |                                                                                                                                                                  | authenticates teh current user   |
| POST   | /login         | username, password                                                                                                                                               | creates a user session           |
| DELETE | /logout        |                                                                                                                                                                  | deletes a user session           |

## Setup

To run this project, follow the following steps.
1. Fork/clone this repo to your local environment.
2. Install latest versions of the technologies listed above, if needed.
3. In your terminal, run `bundle install` and `rails db:create db:migrate db:seed`
4. Next, run `rails s` to start the server on http://localhost:3000
5. From here, you can run `npm install --prefix client` and `npm start --prefix client` to browse the frontend on http://localhost:4000.

## Acknowledgements

This project is an expanded version of my ![phase 1 vanilla js project](https://github.com/alexisfonte/phase-1-project) for Flatiron School with co-contributers ![Jess](https://github.com/jawndrade) and ![Shadiya](https://github.com/Shadiya132).

Some of the styling elements for this project were inspired by the ![Tastebite website template](https://fabrx.co/tastebite-food-recipes-website-template/) by ![Fabrx Design](https://fabrx.co/)

All recipes used in the seed data were taken from ![allrecipes](https://www.allrecipes.com/). View individual author credits ![here](https://github.com/alexisfonte/simply-sweet/blob/main/db/seeds.rb).
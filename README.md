# PyCommerce
A MERN stack eCommerce application

![Home page](/screens/home-page.png)

## Features
- Login and Register with OTP
- Profile management (view and edit profile information including shipping address(es))
- Cart management (view, add and delete items in/to cart)
- Order management (Checkout from cart page, place an order and view orders)
- Favorites (view, add and delete items in/to favorites)
- Search for products
- Common 404 page with a cute doggo

## Integration
- Firebase:
    - Create a [Firebase Account](https://firebase.google.com/)
    - `Add project` with `Phone Authentication`
    - Copy the configuration (settings → project settings → SDK setup → npm)
    - 
- Atlas (MongoDB):
    - Create an [Atlas Account](https://www.mongodb.com/docs/atlas/getting-started/)
    - Choose free tier plan and create a shared cluster.
    - Copy of Host with username and password.

## Local Set-up
- Add firebase and mongoDB configuration (copied above) to a `.env` file. Refer to `.env.example` for the the content of `.env` (to initialize Firebase at `client/src/adapters/firebase.js` and mongoose at `config/db-connection.js`)
- Start Server: `npm install && npm run start`
- Start Client: `cd client` & `npm install && npm run start`

## Heroku Set-up
- Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- Login and Create a project: `heroku login` and `heroku create <unique-project-name>`
- Add remote: `heroku git:remote -a py-commerce`
- Add firebase and atlas (mongoDB) env variables: Project → Settings → Config Vars
- Deploy: `git mush heroku master`

## Image Sizes
- Category Icon: `128 x 128`
- Banner (Top Slider): `1000 x 165`
- Ad Banner: `1000 x 85`
- Product: `500 x 540`
- Featured Brands: `1000 x 540`
- Poster Slider: `1000 x 615`
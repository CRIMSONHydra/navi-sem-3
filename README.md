# A barebones e-commerce platform
This project is a basic e-commerce platform that fetches a few products from the FakeStore api and displays them. It allows searching, adding to cart or wishlist and persistance based on user accounts with google login and data stored on fireStore

## Features and tech stack
1. React Router
>home, cart, wishlist, profile and login page.

All routes that need to be accessed by only authenticated users are protected and auto redirected to a login page if you try to manually enter those routes
2. Lazy loading
3. Context Apis
>Authenthication and Search Api.

Search context provides the search term from the input field in the navbar and sends it to any components.
Authenthication context is present throughout the entire app and uses firebase auth.
4. Firebase
>Authenthication
5. Firestore
>Data storage based on firebase user auth.

Stores the user details like name, age, phone number as well as their cart and wishlist details
6. Currency API
fakestore api by default provides products with prices in USD. An API fetches the current dollar to inr exchange rate and converts the prices
7. Custom CSS
>responsive nature with media queries and keyframe animations for loading components
8. Environment variables
>All firebase config files are stored in env variables
8. Vercel
>Deployment

## Setup
```
git clone https://github.com/CRIMSONHydra/navi-sem-3.git
cd navi-sem-3
npm install
```
Create a .env file and populate the values according to .env.test file

```
npm run dev
```
>to test locally

## Screenshots
![image](https://github.com/user-attachments/assets/eeddbd17-4b04-4240-87d1-896dbde9f7bd)

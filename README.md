# Preschool App


### Here modernity meets simplicity ###

# 📖 Contents:

* [Description](#-description)
* [Home Page](#-home-page)
* [Technologies](#-technologies)
* [Aim](#-aim)
* [Install locally](#-install-locally)

# 🛫 Description:

**Assumptions of the project:**

+ **Accessibility**: meeting the requirements of **WCAG 2.1**
+ **Server-side rendering**
+ **Administration panel** for adding news and photo albums
+ **Responsive Web Design**
+ **Easy update** of static data of all pages (one .JSON file)
+ Author's design
+ Author's photo gallery script


# 🏠 Home page:

*[]()*


# 🔧 Technologies:

+ TypeScript
+ NestJS
+ TypeORM, mySQL
+ Passport, JWT,
+ express-handlebars
+ Tailwind CSS
+ DaisyUI
+ flowbite
+ theme-change
+ sharp
+ date-fns
+ helmet
+ bcrypt

and others

# 🧿 Aim:

The aim of the project was to create a real website for a functioning kindergarten. The project had to meet the requirements for public websites operating in the European Union.

# ‍🔛 Install locally:

## Clone git project:

> git clone https://github.com/Nieopodal/preschool-app.git

## install the required dependencies:

Navigate to the application folder:

> cd preschool-app

Run NPM install

> npm install

## Set up your env file

To configure this backend server correctly, edit the appropriate fields of the .env file, such as the app running port, etc. The template for this file is in the code (`env-example`).

Also, take a look a the TypeORM config file
(`src/config/typeorm.config.ts`) and make sure you have synchronization turned on, so that TypeORM can populate your database with the right tables.

```
{...
synchronize: true,
...}
```

After that, it is advised to turn this setting off.

## Add static data

1. fill in static data in files inside (`src/content`) folder, then run the following script to build the static data source:
    ```sh
    npm run build:static
    ```

2. run npm start
   ```sh
   npm run start:dev
   or
   nest start --watch
   ```

## Open in browser:

   > [http://localhost:3000](http://localhost:3000)



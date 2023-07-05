# Preschool App

![Main1](https://github.com/Nieopodal/preschool-app/assets/123494717/4f6f0888-f8c5-4393-a9f3-ed7405299e54)

### Here modernity meets simplicity ###

# 📖 Contents:

* [Description](#-description)
* [Aim](#-aim)
* [Home Page](#-home-page)
* [Technologies](#-technologies)
* [Install locally](#-install-locally)
* [Photos](#-photos)
  
# 🛫 Description:

**Assumptions of the project:**

+ **Accessibility**: meeting the requirements of **WCAG 2.1**
+ **Server-side rendering**
+ **Administration panel** for adding news and photo albums
+ **Responsive Web Design**
+ **Easy update** of static data of all pages (one .JSON file)
+ Author's design
+ Author's photo gallery script

# 🧿 Aim:

The aim of the project was to create a real website for a functioning kindergarten. The project had to meet the requirements for public websites operating in the European Union.

# 🏠 Home page:

*[]()*
(under construction)

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

# 📸 Photos:

![Main2](https://github.com/Nieopodal/preschool-app/assets/123494717/d19c40aa-6866-4a20-a42d-44062b5333ad)

![Main3](https://github.com/Nieopodal/preschool-app/assets/123494717/908c506a-1fa5-4454-b10b-e8508a3b576f)

![Album](https://github.com/Nieopodal/preschool-app/assets/123494717/3a978346-7cf2-4c38-91d0-ec554230a0b0)

![Article](https://github.com/Nieopodal/preschool-app/assets/123494717/bf46d0af-8a29-4711-99d9-abbee5439131)

## high contrast

![HighContrast](https://github.com/Nieopodal/preschool-app/assets/123494717/0ad3b86d-5c3b-4e32-882c-b9675904e5e0)

## mobile

![Mobile](https://github.com/Nieopodal/preschool-app/assets/123494717/e75c9dc6-d3ec-48cd-9bfc-986d8d91c203)

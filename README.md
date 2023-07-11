# Preschool App

![preschool-main](https://github.com/Nieopodal/preschool-app/assets/123494717/6d6d3910-c07c-453e-9f6e-5aa098376546)

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

[http://pp23.jastrzebie.pl](http://pp23.jastrzebie.pl)

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

![why-us](https://github.com/Nieopodal/preschool-app/assets/123494717/4cc1708a-79f7-411a-8c78-9ce1fa066bba)

![recent-news](https://github.com/Nieopodal/preschool-app/assets/123494717/0aea26c6-e0fb-4645-a3a5-88923bc065f7)

![album](https://github.com/Nieopodal/preschool-app/assets/123494717/4f25b451-5571-4eff-8d74-6bbb45d8d566)

![fees](https://github.com/Nieopodal/preschool-app/assets/123494717/2b1b6450-5ff0-49cb-b8da-986eb355d6f8)

## high contrast

![high-contrast](https://github.com/Nieopodal/preschool-app/assets/123494717/bd3bd97f-7fbe-4640-ad19-545df7e84927)

## mobile

![mobile-img](https://github.com/Nieopodal/preschool-app/assets/123494717/686e3617-5e15-4ee4-b70b-873f2510b373)


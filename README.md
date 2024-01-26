# Laravel 8 Repository with Google Maps Integration & WhatsApp Bot 🌍🤖

Welcome to this super cool repository! 👋 Here, we've crafted a Laravel 8 application that not only harnesses the power of this fantastic framework but also integrates Google Maps for exciting locations and features a WhatsApp Bot created using Node.js for user interaction. 🚀

## Installation

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/ICT154/lara-node-ams.git
    cd lara-node-ams
    ```

2. **Install Dependencies for Laravel 8:**
    ```bash
    composer install
    ```
    **Install Dependencies for Node.js:**

    ```bash
    cd whatsapp-api
    npm i
    ```
    

4. **Configure .env:**
    - Make a copy of the `.env.example` file and rename it to `.env`.
    - Set up the database connection and configure the Google Maps API key.

5. **Run Database Migration & Seeder:**
    ```bash
    php artisan migrate --seed
    ```

6. **Run Laravel Server:**
    ```bash
    php artisan serve
    ```

7. **Run Node.js for WhatsApp Bot:**
    ```bash
    cd whatsapp-api
    node index.js
    ```

## Cool Features 💡

- **Google Maps Integration:**
    - Add exciting locations to the application with seamless Google Maps integration.
    - Explore fun places and view detailed information about each location.

- **WhatsApp Bot:**
    - Unique interaction with users via WhatsApp.
    - Send messages or receive specific commands to get information or perform certain tasks.

## How to Use 🚀

1. **Explore the Map:**
    - Visit the "Map" page to see all the interesting locations.
    - Click on markers for more information.

2. **WhatsApp Bot:**
    - Contact the WhatsApp bot with the number provided in the application.
    - Use special commands to get information or perform specific tasks.

## Contributions 👩‍💻👨‍💻

We're delighted to receive contributions! Feel free to help fix bugs, add new features, or improve documentation. Please create a pull request, and we'll review it promptly.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Thank You! 🙌

Thanks for using this repository. We hope it helps you build an amazing application! Feel free to reach out if you have any questions or suggestions. 🌟
Made with ❤️ by Raden and Google 

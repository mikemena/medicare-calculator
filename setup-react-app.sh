#!/bin/zsh

# Step 1: Create a new Vite React project
npx create-vite $1 --template react

# Navigate into the project directory
cd $1

# Step 2: Install ESLint
npm install eslint --save-dev

# Initialize ESLint with a basic configuration (this might require additional input or a predefined config file)
npx eslint --init

# Step 3: Install Prettier and integration plugins
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

# Step 4: Configure ESLint for Prettier (you might append to the .eslintrc file or create one if it doesn't exist)
echo '{
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
  "plugins": ["react", "prettier"],
  "rules": {
    "prettier/prettier": "error"
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}' > .eslintrc.json

# Step 5: Configure Prettier
echo '{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5"
}' > .prettierrc

# Step 6: Add scripts to package.json (this might require using a tool like jq or manually editing the file)
npm set-script lint "eslint src/**/*.{js,jsx}"
npm set-script format "prettier --write src/**/*.{js,jsx,css,md}"

echo "Setup completed. Navigate into $1 and start coding!"

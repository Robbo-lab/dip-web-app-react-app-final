If the **API secret** is not being injected into the bundle when deployed to GitHub Pages, there are a few possible reasons. I'll walk you through the most common causes and solutions:

### **Potential Issues and Solutions**

---

### 1. **GitHub Secrets Not Being Passed Correctly**

**Problem:**  
The GitHub Actions workflow may not be correctly injecting the environment variable (API secret) during the build process.

**Solution:**  
Ensure the **secret is correctly configured** in your GitHub Actions workflow and repository:

- **Check the GitHub Repository Secrets:**

  - Go to **Settings > Secrets and Variables > Actions**.
  - Confirm that the secret (`REACT_APP_API_KEY`) is correctly defined in your repository.

- **Ensure the Secret is Passed in Your GitHub Actions Workflow:**

  In your `deploy.yml`, make sure the secret is passed as an environment variable during the build step:

  ```yaml
  name: Deploy to GitHub Pages

  on:
    push:
      branches:
        - main

  jobs:
    build:
      runs-on: ubuntu-latest

      steps:
        - name: Checkout code
          uses: actions/checkout@v3

        - name: Set up Node.js
          uses: actions/setup-node@v3
          with:
            node-version: 16

        - name: Install dependencies
          run: npm install

        - name: Build the React app with Webpack
          env:
            REACT_APP_API_KEY: ${{ secrets.REACT_APP_API_KEY }} # Inject the secret here
          run: npm run build

        - name: Deploy to GitHub Pages
          uses: peaceiris/actions-gh-pages@v3
          with:
            github_token: ${{ secrets.GITHUB_TOKEN }}
            publish_dir: ./dist
  ```

---

### 2. **Environment Variables in Webpack (`DefinePlugin`) Not Configured Correctly**

**Problem:**  
Your Webpack configuration may not be correctly injecting the environment variables into the client-side code.

**Solution:**  
Ensure that **Webpack's `DefinePlugin`** is set up properly to inject environment variables. Update your `webpack.config.js` like this:

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const dotenv = require("dotenv");

// Load environment variables from .env (for local use)
const env = dotenv.config().parsed || {};

// Convert the environment variables for Webpack DefinePlugin
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Clean dist/ on each build
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new DefinePlugin({
      "process.env.REACT_APP_API_KEY": JSON.stringify(
        process.env.REACT_APP_API_KEY
      ),
    }), // Inject only the specific API key
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
  },
};
```

**Key Points:**

- **`DefinePlugin`** must inject the environment variables into the bundle at build time. You should ensure that **only the required variables** (e.g., `REACT_APP_API_KEY`) are included.

---

### 3. **Secrets Not Available in GitHub Pages**

**Problem:**  
GitHub Pages does not support environment variables at runtime because it's a static file host. Therefore, you **must inject the API secret at build time**.

**Solution:**  
Make sure that the API secret is **available during the build step** in GitHub Actions.

- **Check the build logs** from your GitHub Actions run. If the secret is not correctly injected, you will see `undefined` or errors in the logs. If the logs indicate that the secret was not available, it likely means that the secret was not passed correctly or the environment variable was not injected during the Webpack build.

To troubleshoot, you can add a **temporary debug step** in your GitHub Actions workflow to print environment variables:

```yaml
- name: Debug Environment Variables
  run: printenv | grep REACT_APP_API_KEY
```

This will show if `REACT_APP_API_KEY` is actually available during the build.

---

### 4. **Verify That the API Key is Used in Your Code**

**Problem:**  
The API key may not be correctly used in the code or it could be missing from the build output.

**Solution:**  
Ensure that you are correctly accessing the API key in your React app using `process.env.REACT_APP_API_KEY`.

For example, in your React component:

```javascript
export const buildApiUrl = (parameters) => {
  const apiKey = process.env.REACT_APP_API_KEY; // Access the API key

  if (!apiKey) {
    throw new Error("API key is missing! Make sure REACT_APP_API_KEY is set.");
  }

  let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  for (const key in parameters) {
    apiUrl += `&${key}=${parameters[key]}`;
  }

  return apiUrl;
};
```

---

### 5. **Test the Build Locally with a `.env` File**

**Problem:**  
If everything works locally but fails in production, there could be a discrepancy between your local and production environment setups.

**Solution:**  
Test the build locally to ensure that your API key is being correctly injected.

1. Create a `.env` file in the root of your project for local development:

   ```
   REACT_APP_API_KEY=your-local-api-key
   ```

2. Run the build locally:

   ```bash
   npm run build
   ```

3. Inspect the `dist/` folder to check if the environment variable is being injected correctly (you can search the `bundle.js` file for the injected API key to ensure it's present).

4. Serve the built files locally to simulate GitHub Pages:

   ```bash
   npx serve -s dist
   ```

---

### **Summary**

To fix the issue with the API key not being injected into the bundle for GitHub Pages:

1. **Check that the secret is correctly set up** in GitHub Actions.
2. **Ensure `DefinePlugin` in Webpack** is configured to inject the API key at build time.
3. **Debug your GitHub Actions workflow** to verify that the secret is available during the build process.
4. **Test the build locally** with a `.env` file to confirm that the environment variables are being injected properly.

By following these steps, you should be able to resolve the issue of the API key not being injected into the bundle when deploying to GitHub Pages. Let me know if this helps or if you need further clarification!

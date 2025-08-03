# Static Website Deployment Guide

This project is configured to build as a static website that can be deployed to any static hosting provider.

## Project Structure

```
├── src/                    # Source code
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Main application component
│   ├── components/        # React components
│   └── styles/            # CSS styles
├── dist/                  # Build output (generated)
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

## Build Process

The project uses Vite to build a static website with the following configuration:

- **Base URL**: `./` (relative paths for assets)
- **Output Directory**: `dist/`
- **Assets Directory**: `dist/assets/`
- **Source Directory**: `src/`

## Quick Start

1. **Build the static files:**
   ```bash
   npm run build
   ```

2. **Preview locally:**
   ```bash
   npm run preview
   ```

3. **Deploy the `dist/` directory** to your hosting provider

## Deployment Options

### GitHub Pages (Recommended)

1. **Build and copy files to root:**
   ```bash
   npm run deploy:github-pages
   ```

2. **Commit and push the build files:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository Settings
   - Scroll to "Pages" section
   - Set source to "Deploy from a branch"
   - Choose `main` branch
   - Set folder to `/ (root)`
   - Save

4. **Your site will be available at:** `https://yourusername.github.io/your-repo-name/`

### Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Vercel

1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

### AWS S3 + CloudFront

1. Build: `npm run build`
2. Upload contents of `dist/` to S3 bucket
3. Configure CloudFront distribution
4. Set up custom domain (optional)

### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize Firebase: `firebase init hosting`
3. Set public directory: `dist`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## File Structure After Build

```
dist/
├── index.html          # Main HTML file
└── assets/
    ├── index-[hash].js # Bundled JavaScript
    └── index-[hash].css # Bundled CSS
```

## Important Notes

- All asset paths are relative (`base: './'`), making it compatible with any subdirectory deployment
- The build process optimizes and minifies all assets
- Source maps are disabled for production builds
- Small assets (< 4KB) are inlined as base64 for better performance
- Source code is organized in the `src/` directory for better project structure
- For GitHub Pages, use `npm run deploy:github-pages` to copy files to root

## Troubleshooting

If you encounter issues with asset loading:
1. Ensure your hosting provider serves the files correctly
2. Check that the `dist/` directory is uploaded completely
3. Verify that your hosting provider supports the file types (HTML, JS, CSS)
4. For subdirectory deployments, ensure the base URL is configured correctly
5. For GitHub Pages, make sure the build files are committed to the repository 
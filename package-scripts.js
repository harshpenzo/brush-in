const scripts = {
  "build:analyze": "ANALYZE=true npm run build",
  "preview:analyze": "npm run build:analyze && npx vite preview"
};

module.exports = scripts;
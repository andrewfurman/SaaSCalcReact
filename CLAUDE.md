# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React application built with Vite bundler on Replit. It uses TypeScript support and includes Hot Module Reloading (HMR) for development.

## Development Commands

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

## Architecture

- **Entry Point**: `src/index.jsx` - Main React rendering entry point
- **Main Component**: `src/App.jsx` - Root application component
- **Build Tool**: Vite with React plugin configured in `vite.config.js`
- **Development Server**: Configured to run on host `0.0.0.0` for Replit compatibility

## Key Configuration

- **Vite Config**: `vite.config.js` - Includes React plugin and server configuration for Replit
- **TypeScript**: `tsconfig.json` - TypeScript configuration present (files can be renamed from `.jsx` to `.tsx`)
- **Package Type**: ES modules (`"type": "module"` in package.json)

## File Structure

- `src/` - Source code directory
- `public/` - Static assets
- `index.html` - Main HTML template
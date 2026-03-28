# Moodify

Mood-based music discovery app with Spotify-inspired UI.

## Project Structure

- client/: Frontend (Next.js + Tailwind)
- server/: Backend (Node.js + Express)

## Setup Instructions

### Prerequisites
- Node.js installed
- YouTube Data API Key (See below)

### 1. Backend Setup

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Open `.env` file.
   - Replace `YOUR_YOUTUBE_API_KEY_HERE` with your actual YouTube Data API Key.
   - (Optional) Change `PORT` if needed (default 5000).

4. Run the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the frontend:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running the Application

To run the full application locally, follow these steps:

### Option 1: Running in Separate Terminals (Recommended)

**Terminal 1 - Start the Backend Server:**
```bash
cd server
npm run dev
```
The backend will start on http://localhost:5000

**Terminal 2 - Start the Frontend Application:**
```bash
cd client
npm run dev
```
The frontend will start on http://localhost:3000

**Open your browser** and navigate to http://localhost:3000

### Option 2: Running from Root Directory

If you prefer, you can run both from the root directory in separate terminal windows:

**Terminal 1:**
```bash
cd server && npm run dev
```

**Terminal 2:**
```bash
cd client && npm run dev
```

### Troubleshooting

- **Port 3000 already in use**: The frontend will automatically use an available port (e.g., 3001). Check the terminal output for the correct URL.
- **Port 5000 already in use**: Change the `PORT` variable in `server/.env` to an available port.
- **YouTube API not working**: Verify your API key is correctly set in `server/.env`.

## Logic

1. **User Input**: User enters text (e.g., "I feel sad").
2. **Backend Analysis**: Server detects the mood ("sad") and maps it to a search query ("sad songs playlist emotional").
3. **YouTube Search**: Server queries YouTube Data API.
4. **Display**: Frontend displays the results.
5. **Playback**: Click on a song to play it.

## API Keys

**YouTube Data API Key**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project and enable "YouTube Data API v3".
3. Create an API Key.
4. Paste it into the `server/.env` file.

# RAG Chatbot - React + FastAPI

A modern RAG (Retrieval-Augmented Generation) chatbot with React frontend and FastAPI backend. Upload PDF documents and chat with them using Google Gemini AI and Pinecone vector database.

**Live Demo**: 
- Frontend: `[Your Vercel URL]`
- Backend API: `[Your Render URL]`

## 🎨 Design

Premium Notion-inspired UI with:
- Warm cream color palette (#FAF9F6, #8B7355)
- Inter font family
- Smooth animations and micro-interactions
- Responsive design

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- Python 3.9+
- API keys: Google AI (Gemini), Pinecone, LangSmith (optional)

### Setup

1. **Clone and install**
```bash
git clone <your-repo-url>
cd ChatBot-main

# Backend
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

2. **Configure environment variables**

Backend `.env`:
```env
GOOGLE_API_KEY=your_google_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=rag-chatbot-index
PINECONE_CLOUD=aws
PINECONE_REGION=us-east-1
LANGSMITH_API_KEY=your_langsmith_key
LANGSMITH_TRACING=true
LANGSMITH_PROJECT=rag-chatbot
```

Frontend `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
```

3. **Run locally**

Terminal 1 - Backend:
```bash
uvicorn main:app --reload
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Visit: http://localhost:5173

## 🚀 Deployment

### Deploy Backend to Render

1. **Push to GitHub** (if not already)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Create Render Web Service**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will auto-detect `render.yaml` configuration

3. **Set Environment Variables** in Render Dashboard:
   - `GOOGLE_API_KEY` - Your Google AI API key
   - `PINECONE_API_KEY` - Your Pinecone API key
   - `LANGSMITH_API_KEY` - Your LangSmith key (optional)

4. **Deploy**
   - Render will automatically build and deploy
   - Copy your Render URL (e.g., `https://your-app.onrender.com`)

### Deploy Frontend to Vercel

1. **Update Frontend API URL**

Create `frontend/.env.production`:
```env
VITE_API_URL=https://your-app.onrender.com
```

2. **Deploy to Vercel**

Option A - Vercel CLI:
```bash
cd frontend
npm install -g vercel
vercel
```

Option B - Vercel Dashboard:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Set Root Directory to `frontend`
   - Add environment variable:
     - Name: `VITE_API_URL`
     - Value: `https://your-app.onrender.com`
   - Click "Deploy"

3. **Update CORS**

After deployment, update `main.py` CORS settings:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-app.vercel.app",
        "http://localhost:5173"  # Keep for local dev
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Commit and push to redeploy backend.

## 📁 Project Structure

```
ChatBot/
├── frontend/              # React + Vite
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── services/     # API client
│   │   ├── App.jsx
│   │   └── index.css     # Design system
│   ├── vercel.json       # Vercel config
│   └── package.json
├── main.py               # FastAPI backend
├── rag_service.py        # RAG logic
├── render.yaml           # Render config
└── requirements.txt
```

## 🛠️ Technology Stack

**Frontend:**
- React 18 + Vite
- Axios
- React Icons
- Custom CSS (Notion-inspired)

**Backend:**
- FastAPI
- LangChain
- Google Gemini (LLM)
- Pinecone (Vector DB)
- LangSmith (Observability)

## 📝 Usage

1. **Upload PDF**: Drag and drop or click to upload PDF documents
2. **Wait for Processing**: System will chunk and index the document
3. **Ask Questions**: Type questions about your document
4. **View Sources**: Expand source citations to see relevant chunks

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_API_KEY` | Google AI API key for Gemini | Yes |
| `PINECONE_API_KEY` | Pinecone API key | Yes |
| `PINECONE_INDEX_NAME` | Pinecone index name | Yes |
| `PINECONE_CLOUD` | Cloud provider (aws) | Yes |
| `PINECONE_REGION` | Region (us-east-1) | Yes |
| `LANGSMITH_API_KEY` | LangSmith API key | No |
| `VITE_API_URL` | Backend API URL | Yes |

## 📜 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- UI inspired by [Notion](https://www.notion.so/)
- Powered by [Google Gemini](https://ai.google.dev/)
- Vector storage by [Pinecone](https://www.pinecone.io/)
- Built with [LangChain](https://www.langchain.com/)

#!/usr/bin/env python3
"""
Simple HTTP server for testing your website locally
"""
import http.server
import socketserver
import os
import webbrowser

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(__file__), **kwargs)

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"\n🌐 Server running at: http://localhost:{PORT}")
        print("📁 Serving files from:", os.getcwd())
        print("\n📱 Open in browser:")
        print(f"   http://localhost:{PORT}/index.html")
        print("\n🛑 Press Ctrl+C to stop the server\n")
        
        # Open browser automatically
        webbrowser.open(f'http://localhost:{PORT}/index.html')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped")

if __name__ == "__main__":
    main()

package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", handleSPA)
	log.Println("the server is listening to port 5173")
	log.Fatal(http.ListenAndServe(":5173", nil))
}

// Embed the build directory from the frontend.
//
//go:embed build/*
var BuildFs embed.FS

// Get the subtree of the embedded files with `build` directory as a root.
func BuildHTTPFS() http.FileSystem {
	build, err := fs.Sub(BuildFs, "build")
	if err != nil {
		log.Fatal(err)
	}
	return http.FS(build)
}

func handleSPA(w http.ResponseWriter, r *http.Request) {
	http.FileServer(BuildHTTPFS()).ServeHTTP(w, r)
}

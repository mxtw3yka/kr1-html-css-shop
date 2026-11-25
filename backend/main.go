package main

import (
	_ "embed"
	"encoding/json"
	"log"
	"net/http"
	"os"
)

//go:embed data/products.json
var productsJSON []byte

func main() {
	var products []struct {
		ID string `json:"id"`
	}
	if err := json.Unmarshal(productsJSON, &products); err != nil {
		log.Fatalf("data/products.json содержит неверный JSON: %v", err)
	}
	if len(products) == 0 {
		log.Fatal("data/products.json: каталог товаров пуст")
	}
	seen := make(map[string]bool, len(products))
	for _, product := range products {
		if product.ID == "" || seen[product.ID] {
			log.Fatalf("data/products.json: пустой или повторяющийся id %q", product.ID)
		}
		seen[product.ID] = true
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/api/products", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet && r.Method != http.MethodHead {
			w.Header().Set("Allow", "GET, HEAD")
			http.Error(w, "метод не поддерживается", http.StatusMethodNotAllowed)
			return
		}
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		if _, err := w.Write(productsJSON); err != nil {
			log.Printf("Не удалось отправить товары: %v", err)
		}
	})
	mux.Handle("/", http.FileServer(http.Dir("../dist")))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Сервер http://localhost:%s", port)
	log.Fatal(http.ListenAndServe(":"+port, mux))
}
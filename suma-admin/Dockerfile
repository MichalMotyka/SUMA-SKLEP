# Używamy oficjalnego obrazu Node.js jako bazowego obrazu
FROM node:14 as build

# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy pliki package.json i package-lock.json do katalogu roboczego
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy pozostałe pliki do katalogu roboczego
COPY . .

# Budujemy aplikację Angular
RUN npm run build

# Drugi etap budowy, używamy oficjalnego obrazu nginx jako obrazu docelowego
FROM nginx:latest

# Kopiujemy pliki z etapu budowy "build" do katalogu, gdzie Nginx będzie szukać plików do serwowania
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80, na którym działa Nginx
EXPOSE 80

# Komenda uruchamiająca serwer Nginx
CMD ["nginx", "-g", "daemon off;"]

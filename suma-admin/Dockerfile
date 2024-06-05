# Używamy oficjalnego obrazu Node.js jako bazowego obrazu
FROM node:14 as build

# Ustawiamy katalog roboczy
WORKDIR /usr/local/app

# Kopiujemy pliki package.json i package-lock.json do katalogu roboczego
COPY ./ /usr/local/app/

# Instalujemy zależności
RUN npm install

# Budujemy aplikację Angular
RUN npm run build

# Drugi etap budowy, używamy oficjalnego obrazu nginx jako obrazu docelowego
FROM nginx:latest

# Kopiujemy pliki z etapu budowy "build" do katalogu, gdzie Nginx będzie szukać plików do serwowania
COPY --from=build /usr/local/app/dist/suma-admin /usr/share/nginx/html

RUN sed -i -e 's/80/4200/g' /etc/nginx/conf.d/default.conf

# Expose port 80, na którym działa Nginx
EXPOSE 4200

# Komenda uruchamiająca serwer Nginx
CMD ["nginx", "-g", "daemon off;"]

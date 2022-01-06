# Fibonacci Calculator

[![Build Status](https://app.travis-ci.com/github/adamtestowy/pawlowskizad1?branch=main)](https://app.travis-ci.com/github/adamtestowy/pawlowskizad1)

## Development

Opis techniczny uslug:
Jako strona domowa pierwsza wyswietla sie kalkulator Fibonacciego. Kolejno podstrona Home prowadzi do strony glownej (2 informacje) oraz podstrona Other Page (do opisu technicznego uslugi). 
- Struktura 6-cio kontenerowa:
- Routing na bazie nginx (axios),
- Nginx restartuje zawsze – restart always 
- klauzula depends on:  czekaj az uslugi wymienione sie uruchomia.
- Obrazy w .dev w wersji latest. Na produkcje juz konkretne z dockerHub-a
Redis: Przechowuje wspolczynniki k I wyliczone wartosci w postaci: klucz-wartosc
Worker: Czeka na wprowadzenie nowej wartosci wsp. K. Pobiera kazda kolejna wartosc wsp K. Wylicza wartosc ciagu I przekazuje do bazy Redis.
Postgres: Przechowa liste z wspolczynnikami ciagu Fibonacciego.

### Build with Docker Compose

	$ docker compose -f dockercompose.dev.yml up –build
	
### Access Client

http://localhost:3050

Port z 3050 mozna zmienic na inny np. 3060 w pliku: docker-compose.dev.yml w sekcji nginx ports.

## Production

Punkty extra:
Schemat wdrozenia na AWS/Travis/DockerHub:
Koncepcja jest nastepujaca: 
1) Wrzucamy nasz kod na Github
2) Moje konto w Travis jest powiazane z git-em, wiec Travis automatycznie pobierze repozytorium
3) Zadaniem Travisa jest zbudowanie obrazu (docker build) na podstawie Dockerfile.dev z katalogu /client z tagiem: piotrpawlowski77/pawlowskizad1:test
4) Kolejno tworzony jest kontener (docker run) wraz z ustawiona zmienna srodowiskowa CI=true I uruchamiane sa testy aplikacji (App.test.js)
5) Nastepnie budowane sa obrazy produkcyjne dla: client/nginx/server/worker, logowanie do dockerHub za pomoca zdefiniowanych zmiennych srodowiskowych w Travis (DOCKER_ID IDOCKER_PASSWORD) I kolejno poloeceniem docker push wrzucane sa 4 obrazy do konta na dockerHub.
6) Plik Dockerrun.aws.json zawiera sekcje {} w ktorek kazda z nich to osobne kontenery o podanych nazwach (name) I iname (obrazy z dockerhub) I inne ustawienia.

Niestety nie bylem w stanie uruchomic triggera na Travis, poniewaz na moim koncie w travis skonczyl sie miesiecznny dostep (informacja na czerwono). 



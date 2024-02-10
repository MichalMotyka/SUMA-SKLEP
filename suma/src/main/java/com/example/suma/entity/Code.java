package com.example.suma.entity;

public enum Code {
    SUCCESS("Operacja zakończona sukcesem"),
    PERMIT("Przyznano dostep"),
    A1("Podany uzytkownik o danej nazwie nie istnieje lub nie aktywował konta"),
    A2("Podane dane są nieprawidłowe"),
    A3("Wskazany token jest pusty lub nie ważny"),
    A4("Użytkownik o podanym mailu lub nazwie juz istnieje"),
    A5("Użytkownik nie istnieje"),
    C1("Przekazane dane kategorii są nieprawidłowe"),
    C2("Kategoria o wskazanej nazwie już istnieje"),
    C3("Wskazana nadkategoria nie istnieje"),
    C4("Nie można zmienić kategorii na podkategorie lub jej usunąć, jeśli sama posiada już przypisane do siebie podkategorie. Proszę odpiąć te podkategorie przed dokonaniem zmiany."),
    P1("Produkt nie może mieć więcej niż 6 parametrów opisowych"),
    P2("Produkt o wskazanej nazwie już istnieje"),
    E1("Błąd danych");

    public final String label;
    private Code(String label){
        this.label = label;
    }
}

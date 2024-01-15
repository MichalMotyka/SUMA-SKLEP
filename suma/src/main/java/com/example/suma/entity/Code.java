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
    C4("Nie można zmienić kategorie na podkategorie jeśli sama posiada już przypisane do siebie podkategorie. Proszę odpiąć podkategorie"),
    E1("Błąd danych");

    public final String label;
    private Code(String label){
        this.label = label;
    }
}

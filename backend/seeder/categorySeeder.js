const CategorySeeder = [
  {
    name: "Komputery",
    description:
      "Sprzęt zachwyca nowoczesnym, iście gamingowym designem. Najlepsze komputery dostępnt na rynku dla młodych graczy!",
    image: "/img/komputery.jpg",
    attributes: [
      { key: "RAM", value: ["8 GB", "16 GB", "32 GB"] },
      { key: "Kolor obudowy", value: ["niebieski", "czerwony", "zielony", "czarny"] },
      { key: "Dysk SSD", value: ["128 GB", "250 GB", "500 GB", "1 TB"] },
      { key: "Dysk HDD", value: ["1 TB", "2 TB", "4 TB"] },
      { key: "Karta graficzna", value: ["NVIDIA GeForce RTX 3060 Ti", "NVIDIA GeForce GTX 1660 Super", "Intel Arc A750"] },
      { key: "Procesor", value: ["Intel Core i5-11400F", "Intel Core i5-12400F", "Intel Core i5-13400F"] },
      { key: "System operacyjny", value: ["Brak", "Windows"] },
    ],
  },
  {
    name: "Komputery/Laptopy",
    description:
      "Komputery/Laptopy - Laptopy na każdą okazję do biura do gier. W najlepszych cenach.",
    image: "/img/computer.png",
  },
  {
    name: "Komputery/Laptopy/Dell",
    description:
      "Komputery/Laptopy/Dell - Koniec z chodzeniem na kompromisy podczas grania. Pracuj wydajnie, a po godzinach zanurz się w realistycznym świecie swojej ulubionej gry dzięki laptopowi DELL",
    image: "/img/computer.png",
  },
  {
    name: "Komputery/Laptopy/Acer",
    description:
      "Komputery/Laptopy/Acer - Koniec z chodzeniem na kompromisy podczas grania. Pracuj wydajnie, a po godzinach zanurz się w realistycznym świecie swojej ulubionej gry dzięki laptopowi Acer",
    image: "/img/computer.png",
  },
  {
    name: "Tablety",
    description:
      "Tablety - Najlepsze tablety w konkurencyjnychh cenach",
    image: "/img/tablets.jpg",
    attributes: [
      { key: "Wyświetlacz", value: ["10.5 cala, 1920 x 1200px, TFT", "10.61 cala, 2000 x 1200px, IPS", "10.5 cala, 1920 x 1200px, TFT"] },
      { key: "Kolor", value: ["niebieski", "czerwony", "zielony", "czarny", "grafitowy", "gwiezdna szarość", "szary"] },
      { key: "Funkcje ekranu", value: "Dotykowy" },
      { key: "Pamięć wbudowana", value: ["64 GB", "32 GB", "128 GB", "256 GB"] },
      { key: "RAM", value: ["2 GB", "4 GB", "8 GB"] },
      { key: "Procesor", value: ["UNISOC T618, 8-rdzeniowy", "MediaTek Helio G99, 8-rdzeniowy", "Apple A13 Bionic"] },
      { key: "Pojemność akumulatora", value: "7040 mAh" },
      { key: "System operacyjny", value: ["Android 11", "Android 12", "iPadOS 15"] },
    ],
  },
  {
    name: "Monitory",
    description:
      "Monitory - Najlepsze moniotry w konkurencyjnych cenachh",
    image: "/img/monitors-category.png",
    attributes: [
      { key: "Ekran", value: ["24.5 cala, 1920 x 1080px, IPS", "27 cala, 2560 x 1440px, IPS", "27 cala, 1920 x 1080px, IPS"] },
      { key: "Częstotliwość odświeżania obrazu", value: ["60 Hz", "144 Hz", "165 Hz", "170 Hz", "280 Hz"] },
      { key: "Czas reakcji matrycy", value: ["1 ms"] },
      { key: "Złącza", value: ["HDMI", "DisplayPort ", "Wyjście słuchawkowe "] },
    ],
  },
  {
    name: "Gry",
    description:
      "Gry - Najtańsze gry na PC",
    image: "/img/games.jpg",
    attributes: [
      { key: "Rodzaj gry", value: ["FPS", "RPG", "Zręcznościowe", "Przygodowe", "Battle Royale", "Symulatory"] },
      { key: "Platforma", value: ["PlayStation 5", "PlayStation 4", "PC", "Xbox One"] },
    ],
  },
  {
    name: "Drukarki",
    description:
      "Drukarki - Najlepsze drukarki",
    image: "/img/printers1.jpg",
  },
  {
    name: "Oprogramowanie",
    description:
      "Oprogramowanie - Najlepsze oprogramowanie",
    image: "/img/software.jpg",
  },
  {
    name: "Aparaty",
    description:
      "Aparaty - najelpsze aparaty",
    image: "/img/cameras.jpg",
  },
  {
    name: "Książki",
    description:
      "Książki - Najelpsze poweiści",
    image: "/img/books.png",
    attributes: [{ key: "genre", value: ["movie", "comedy", "thriller"] }],
  },
  {
    name: "Słuchawki",
    description:
      "Słuchawki - Najlepsze słuchawki",
    image: "/img/sluchawki.jpg",
  },
  {
    name: "Meble",
    description:
      "Meble - Nowoczesne meble",
    image: "/img/meble.jpg",
    attributes: [
      { key: "Fotele", value: ["Fotele uszaki", "Fotele z funkcją spania", "Fotele gamingowe", "Fotele biurowe", "Fotele wypoczynkowe"] },
      { key: "Łóżka", value: ["Łóżka tapicerowane", "Łóżka kontynentalne", "Łóżka z pojemnikiem", "Łóżka drewniane", "Łóżka metalowe"] },
      { key: "Krzesła", value: ["Krzesła drewniane", "Krzesła tapicerowane", "Krzesła na płozach", "Hokery"] },
      { key: "Stoły", value: ["Stoły okrągłe", "Stoły rozkładane", "Stoły prostokątne", "Stoły loftowe"] },
    ],
  },
]

module.exports = CategorySeeder
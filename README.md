<div align="center">

# r.network – Darkex Case

AI destekli kripto alım-satım paneli. Next.js 15 App Router, Tailwind CSS 4, Zustand, Shadcn UI, TradingView ve Binance WebSocket akışı ile gerçek zamanlı deneyim.

</div>

## İçindekiler

- [Genel Bakış](#genel-bakış)
- [Teknoloji Yığını](#teknoloji-yığını)
- [Kurulum & Çalıştırma](#kurulum--çalıştırma)
- [Proje Yapısı](#proje-yapısı)
- [Uygulama Akışı & Sayfalar](#uygulama-akışı--sayfalar)
- [Durum Yönetimi (Zustand)](#durum-yönetimi-zustand)
- [Binance WebSocket Hooku](#binance-websocket-hooku)
- [Bileşen Rehberi](#bileşen-rehberi)
- [Server Actions](#server-actions)
- [Middleware](#middleware)
- [JSON Server & API](#json-server--api)
- [Yardımcı Dosyalar & Tipler](#yardımcı-dosyalar--tipler)
- [Stil Sistemi & UI Katmanı](#stil-sistemi--ui-katmanı)
- [Bildirimler & Kullanıcı Deneyimi](#bildirimler--kullanıcı-deneyimi)
- [Geliştirme Notları](#geliştirme-notları)
- [İleri Çalışmalar](#ileri-çalışmalar)

## Genel Bakış

Bu repo, gerçek zamanlı veri akışı ile çalışan bir kripto ticaret arayüzünün uçtan uca demosudur. Uygulama, kullanıcı girişini `json-server` üzerinden doğrular, kimlik doğrulamayı `auth_token` çerezi ile yönetir, Binance'in WebSocket kanalından canlı fiyat bilgisi çeker ve TradingView grafiği ile zenginleştirilmiş bir pazar ekranı sunar.

## Teknoloji Yığını

- **Next.js 15 (App Router & Server Actions)** – SSR, RSC ve yönlendirme kontrolü
- **TypeScript** – Uçtan uca tip güvenliği
- **Tailwind CSS 4 + tw-animate-css** – Tasarım sistemi ve tematik animasyonlar
- **Shadcn UI + Radix primitive'leri** – Yeniden kullanılabilir arayüz bileşenleri
- **Zustand** – Hafif ve modüler global durum yönetimi
- **TradingView Advanced Chart widget** – Gelişmiş grafık bileşeni
- **Binance WebSocket** – Gerçek zamanlı piyasa verileri
- **json-server** – Gelişim ortamı için sahte REST API
- **Sonner** – Kullanıcı aksiyonlarına ilişkin toast bildirimleri
- **Lucide Icons** – Modern ikon seti

## Kurulum & Çalıştırma

> Minimum Node.js sürümü: **18.18+** (Next.js 15 gereksinimi)

### 1. Bağımlılıkları kurun

```bash
cd client
npm install
```

### 2. JSON Server'ı başlatın

```bash
cd ../server
npx json-server --watch db.json --port 3001
```

- `db.json` içerisindeki `users` ve `orders` endpoint'leri 3001 portundan servis edilir.

### 3. Next.js geliştirme sunucusunu çalıştırın

```bash
cd ../client
npm run dev
```

- Uygulama `http://localhost:3000` adresinde açılır.
- Giriş yapmak için örnek kullanıcı: **admin / admin123** (bkz. `server/db.json`).

### 4. Opsiyonel: Lint

```bash
npm run lint
```

### 5. Üretim Build'i

```bash
npm run build
```

- Turbopack ile üretim derlemesi alınır; tüm sayfalar ve middleware optimize edilir.

## Proje Yapısı

```
client/
├─ app/                 # App Router sayfaları, layout, loading & not-found
├─ actions/             # Server Actions (auth & trade)
├─ components/          # UI, dashboard, markets, shared ve skeleton bileşenleri
├─ hooks/               # Özel React hook'ları (Binance WebSocket)
├─ lib/                 # Zustand store, util fonksiyonları, sabitler
├─ types/               # TypeScript tip tanımları
├─ middleware.ts        # Yönlendirme koruması
└─ ...

server/
└─ db.json              # json-server ile kullanılan sahte API verisi
```

## Uygulama Akışı & Sayfalar

- **`app/layout.tsx`**: Global header, `Toaster` ve viewport yüksekliği hesaplaması. Hanken Grotesk fontu, koyu tema.
- **`app/page.tsx`**: Landing ekranı – kullanıcıyı girişe yönlendiren hero bölümü.
- **`app/login/page.tsx`**: `LoginForm` bileşenini sunar; server action ile kimlik doğrulama.
- **`app/dashboard/page.tsx`**: Hızlı piyasa takibi; `MarketList`, `TokenList`, `BinanceStreamDisplay` ve TradingView grafiği.
- **`app/markets/page.tsx`**: Ana işlem ekranı. Desktop ve mobil için ayrık layout, `Suspense` ile server bileşenleri (`OrderListServer`, `TradeFormServer`).
- **`app/markets/loading.tsx`**: Shadcn skeleton bileşenleri ile loading iskeleti.
- **`app/not-found.tsx`**: 404 ekranı.

Kullanıcı giriş yapmadan `/dashboard` ve `/markets` sayfalarına gitmeye çalıştığında `middleware.ts` devreye girer ve `/` sayfasına yönlendirir. Giriş yaptıktan sonra `/` veya `/login` sayfasına dönmek `middleware` tarafından engellenir.

## Durum Yönetimi (Zustand)

`lib/store.ts` altında üç ayrı slice bulunmaktadır:

| Store           | Alanlar                        | Aksiyonlar                                                                       | Amaç                                                              |
| --------------- | ------------------------------ | -------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `useTokenStore` | `selectedSymbol`, `tokenPrice` | `setSelectedSymbol(symbol)`, `setTokenPrice(price)`                              | Seçili market çiftini ve throttled Binance fiyatını korur.        |
| `useUserStore`  | `userBalance.usdt`             | `decreaseUserBalance(currency, amount)`, `increaseUserBalance(currency, amount)` | Demo bakiyeyi yönetir; emir sonrasında bakiye güncellenir.        |
| `useOrderStore` | `orders`                       | `setOrders(list)`, `addOrder(order)`, `removeOrder(id)`                          | Açık emir listesini yerel olarak saklar ve UI'ı anında günceller. |

Bu slice'lar, form bileşenleri (`BuyOrderForm`), canlı veri akışı (`useBinanceStream`) ve listeleme bileşenleri (`OrderList`) tarafından paylaşılarak arayüzün tek kaynaktan güncel kalması sağlanır.

## Binance WebSocket Hooku

`hooks/useBinanceStream.ts` Binance `wss://stream.binance.com:9443/ws/{symbol}@trade` endpoint'ine bağlanır.

- `useRef` ile **WebSocket** bağlantısı yeniden kullanılabilir, gereksiz yeniden oluşturma engellenir.
- `currentSymbolRef` ve `isConnectingRef` ile eşzamanlı bağlantı problemleri çözülür.
- Her 3 saniyede bir (`THROTTLE_TIME`) `setTokenPrice` çağrılır; böylece `BuyOrderForm` ve `TradingViewWidget` senkron kalır.
- `trade`, `isLoading`, `isConnected`, `isError`, `error` state'leri ile bileşenler durum farkındalığına sahiptir.
- Symbol değişiminde önceki WebSocket kontrollü şekilde kapatılır (memory leak önlenir).

Hook, hem `BinanceStreamDisplay` hem de `LiveTradeData` bileşenleri tarafından paylaşılır ve Zustand üzerinden seçili sembol ile entegre olur.

## Bileşen Rehberi

### Layout & Navigasyon

- **`components/shared/Header`**: Sunucu bileşeni; çerezlerden `auth_token` okur, `Navbar` ve `Sidebar`'a `hasToken` geçer.
- **`components/header/Navbar`**: Masaüstünde `/markets` ve `/dashboard` linkleri, aktif rota vurgusu.
- **`components/header/Sidebar`**: Mobil menü için Shadcn `Sheet`; rota değişince kapanır. Giriş durumuna göre linkler değişir.
- **`components/header/UserDropdown`**: Çıkış işlemi `logout` server action ile yapılır, `sonner` toast gösterir.

### Dashboard (Hızlı Bakış)

- **`TokenList`**: Sabit `symbols` listesini (`lib/constants.ts`) kullanarak sembol seçimini yönetir.
- **`BinanceStreamDisplay`**: `useBinanceStream`'den gelen veriyi gösterir, fiyat yönünü renklendirir, skeleton fallback içerir.
- **`TradingViewWidget`**: Seçili sembole göre TradingView Advanced Chart script'ini yeniden yükler; cleanup ile hafızayı temizler.

### Markets (İşlem Ekranı)

- **`MarketList`**: Navbar altı market switcher, mobil ve desktop görünümleri.
- **`LiveTradeData`**: `useBinanceStream` verilerini formatlayarak canlı fiyat, miktar ve işlem kimliği sunar.
- **`BuyOrderForm`**: Limit/market sekmeleri, yüzde butonları, bakiye kontrolleri, `buyOrder` server action'ı ile emir oluşturma, Zustand üzerinden bakiye ve emir listesi güncelleme.
- **`MobileTradeSheet`**: Mobil cihazlarda alt taraftan açılan form; Shadcn `Sheet` kullanır.
- **`OrderList`**: `orders` durumunu gösterir, iptal butonu ile `cancelOrder` aksiyonunu tetikler, başarı/başarısızlık toast'ları.
- **`OrderListServer`**: Sunucu bileşeni; `getOrders` aksiyonunu çağırıp sonuçları client bileşene aktarır.
- **`TradeFormServer`**: Çerezi okuyarak kullanıcı ID'sini tespit eder, masaüstünde `BuyOrderForm`, mobilde `MobileTradeSheet` render eder.
- **`components/ui/resizable`**: `react-resizable-panels` sarmalayıcısı; markets sayfasında grafik ve emir listesini dikeyde yeniden boyutlandırır.

### Yetkilendirme

- **`LoginForm`**: Client bileşeni; `useActionState(login)` ile form gönderim durumları, ikonlu arayüz, hatalar için kırmızı uyarmalar.

### Skeleton & Loading

- **`components/skeletons/*`**: Binance kartı, canlı veri, emir listesi ve TradingView grafiği için Shadcn tabanlı iskeletler. `app/markets/loading.tsx` bu bileşenleri kullanır.

### Ortak UI

- **`components/ui/*`**: Shadcn CLI (`npx shadcn@latest add ...`) ile eklenen primitive'ler (button, card, tabs, sheet, dropdown, skeleton vb.).

## Server Actions

Tümü `use server` direktifi ile App Router'da tanımlıdır.

| Dosya                      | Fonksiyon                             | Açıklama                                                                                                        |
| -------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `actions/auth-actions.ts`  | `login(state, formData)`              | `json-server` üzerinden kullanıcı doğrular, `auth_token` çerezi yazar, başarılı ise `/dashboard`'a yönlendirir. |
|                            | `logout()`                            | Çerezi siler ve `/`'e yönlendirir.                                                                              |
| `actions/trade-actions.ts` | `getOrders()`                         | `orders` endpoint'inden emirleri çeker, hata durumunda `success: false`.                                        |
|                            | `buyOrder({ userId, amount, price })` | Yeni UUID oluşturur, JSON server'a POST eder, sonucu döner.                                                     |
|                            | `cancelOrder(orderId)`                | Mevcut emri siler, sonuçtaki tutarı client tarafında bakiye iadesi için kullanılır.                             |

## Middleware

`middleware.ts` yönlendirme korumasını sağlar:

- Çerezde `auth_token` yoksa ve istek `/dashboard`'a ise `/`'e yönlendirir.
- Çerez varsa `/` veya `/login` isteklerini `/dashboard`'a yönlendirir.
- `matcher` ile statik dosyalar, `markets` alt rotası ve Next.js dahili yollar hariç tutulur.

Bu sayede kaynağı korumak için ekstra client-side logic yazmaya gerek kalmaz.

## JSON Server & API

`server/db.json` sahte backend'i temsil eder:

- **`users`**: `id`, `username`, `password` alanlarına sahip iki örnek kullanıcı. `login` aksiyonu bu endpoint'i query string ile filtreler.
- **`orders`**: Kullanıcıya bağlı açık emirler. `buyOrder` yeni emir ekler, `cancelOrder` `DELETE` çağrısı yapar, client tarafı Zustand ile eşler.

Varsayılan port `3001`'dir; Next.js uygulaması CORS problemi yaşamadan axios ile erişir.

## Yardımcı Dosyalar & Tipler

- **`lib/constants.ts`**: Şu an `btcusdt` ve `ethusdt` için sembol listesi; yeni market eklemek için burası genişletilir.
- **`types/auth.types.ts`**: Form state ve kullanıcı modeli.
- **`types/trade.types.ts`**: Binance WebSocket payload'u, emir tipi ve `BuyOrderPayload` tanımları.

## Stil Sistemi & UI Katmanı

- **`app/globals.css`**: Tailwind CSS 4 `@import` sözdizimi, tema değişkenleri, koyu tema varsayılanı, scrollbar gizleme yardımcı sınıfları.
- Shadcn bileşenleri (button, card, sheet, tabs, dropdown, badge, skeleton, resizable) özel tasarımlarla özelleştirilmiştir.

## Bildirimler & Kullanıcı Deneyimi

- **Sonner Toaster** (`Toaster` bileşeni layout'ta):
  - Başarılı alış/iptal işlemlerinde yeşil toast.
  - Hata durumlarında kırmızı toast.
- **Lucide-react ikonları**: `Fingerprint`, `Lock`, `User`, `TrendingUp`, `Menu` gibi ikonlarla UI zenginleştirilir.
- **Responsive tasarım**: Markets sayfasında masaüstü ve mobil için farklı bileşen yerleşimleri, mobilde sabit trade butonu.

## Geliştirme Notları

- Dev ve build script'leri Turbopack ile çalışır (`next dev --turbopack`).
- Henüz test altyapısı eklenmedi; lint script'i kullanılabilir.
- Lint (`npm run lint`) ve üretim build'i (`npm run build`) uyarısız şekilde tamamlanır.

## İleri Çalışmalar

- Emir geçmişi ve gerçek kullanıcı bakiyesi için kalıcı backend entegrasyonu.
- WebSocket bağlantısının hata durumunda otomatik yeniden bağlanması için retry stratejileri.
- Çoklu TradingView layout'ları (derinlik tablosu, emir defteri) ve farklı gösterge kombinasyonları.
- Mobil deneyimi güçlendirmek için gesture tabanlı etkileşimler.

#  關於我｜個人履歷網站專案

這是一個設計簡潔、響應式且具備動畫互動效果的個人履歷網站，使用原生 HTML/CSS/JavaScript 開發，適合作為前端練習展示或求職作品集頁。

---

##  功能亮點

###  設計風格與排版

- **卡片式版面（Card Layout）**：
  - 使用 `.card` 類別統一風格，具備陰影、圓角、懸停浮起動畫
- **Masonry 風格排版**（寬螢幕時）：
  - 使用 CSS `column-count` 建構交錯式卡片排列
- **側邊導覽選單（Side Fixed Menu）**：
  - 導覽固定於右側，滑動時淡入
  - 點擊項目會平滑跳轉至對應區塊，並補償固定 header 高度

---

###  技術細節

#### HTML
- 採用語意化標籤：`<section>`、`<header>`、`<nav>`、`<ul>` 等
- 結構清晰分區，利於維護與後續整合資料（如 GitHub 連結）

#### CSS
- **字體與圖示**：
  - 引入 Google Fonts、Font Awesome、Material Symbols
- **響應式設計（RWD）**：
  - 使用 `@media` 調整 `.intro-card` 排列、側邊選單與 goTop 按鈕顯示方式
  - 使用 `clamp()`、`vw` 單位與百分比，控制字體大小與版面縮放
- **動畫與過場效果**：
  - Animate.css 的 `fadeInUp` 套用於 `.side-fixed-menu`
  - 自製動畫 `#welcome` 使用 SVG + keyframe 動畫模擬文字描邊、線條展開
  - 滑鼠懸停時卡片浮起 (`transform + box-shadow`)
- **排版技巧**：
  - 使用 `flexbox` 建構介紹卡片
  - 使用 `column-count` 與 `break-inside: avoid` 實作卡片流動排版

#### JavaScript
- **動畫控制**
  - `load` 時控制 `#welcome` 淡出、主內容 `#main-content` 淡入
  - `#top-bar` 根據捲動控制透明度變化
- **平滑捲動（含 header 高度補償）**
  - 使用 `requestAnimationFrame` 自訂 `smoothScrollTo()`，控制滾動速率與補償偏移
- **回到頂部按鈕**
  - jQuery 控制按鈕顯示與滾動動畫、滑鼠互動旋轉動畫

---

##  響應式設計（Responsive）

| 裝置 | 表現 |
|------|------|
| 桌機 | 卡片交錯排列、側邊導覽與回頂按鈕顯示 |
| 平板 | 導覽選單縮小，文字自動調整大小 |
| 手機 | 側邊選單隱藏、卡片垂直排列、自動文字縮放 |

---

##  使用技術

- HTML5 / CSS3 / JavaScript (ES6)
- Animate.css
- Swiper.js（輪播插件）
- jQuery（goTop 動畫控制）
- Google Fonts、Font Awesome、Material Icons

---

##  注意事項

- 請確認 `0605_2.css` 已正確引入
- 建議搭配本地開發環境或 Live Server 觀察動畫效果

---

##  作者資訊

> 陳重光 Gary Chen  
> 喜歡挑戰與創新，擁有前後端基礎並熱衷實作練習  
> GitHub: [nsngary](https://github.com/nsngary)

---

##  預覽畫面（可加入網站連結或截圖）

![畫面預覽](https://youtu.be/i1N-Re5_Jj0)
![畫面預覽](<iframe width="560" height="315" src="https://www.youtube.com/embed/i1N-Re5_Jj0?si=xGTS6gMt-PWh4Wgw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>)
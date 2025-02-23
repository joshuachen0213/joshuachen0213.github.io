---
layout:     post
title:      "2024 年秋季課程心得"
author: "Joshua"
catalog: true
header-img: "img/home-bg.jpg"
header-mask: 0.4
tags:
  - Course Review
---

# 2024 年秋季修課心得

### 計算機結構(CA)

- 學分：3 學分
- 授課教師：楊佳玲
- 學期成績：A+
- 上課內容：

  &emsp;&emsp;這門課的上課內容涵蓋以下主題：

  1. **簡介**：學習如何評估不同 CPU 設計的效能，了解各種評測方法與指標。
   
  2. **指令集架構(Instruction Set Architecture)**：探討不同指令集的優缺點，例如複雜指令集與精簡指令集的差異。此外，課堂中將介紹一種特殊的指令集——RISC-V，並透過數次作業實作 RISC-V assembly 程式設計。
   
  3. **資料流與資料路徑(Data Path)**：學習如何設計一個單一週期 CPU，支援部分 RISC-V 指令的執行。
   
  4. **Pipeline**：利用 pipeline 技術優化單一週期 CPU，將指令拆解成多個步驟並行處理。同時，學習如何解決 pipeline 引發的危障(hazard)，這些挑戰讓 CPU 設計更具複雜性。
   
  5. **Linker 與 Loader**：探討編譯器如何將高階程式碼轉譯為 assembly 指令，理解程式執行的底層過程。
   
  6. **快取(Cache)**：學習 CPU 快取的結構，了解快取如何提升記憶體存取效能。
   
  7. **階層式記憶體架構(Hierarchical Memory Architecture)**：分析快取與記憶體設計對 CPU 效能的影響，探索不同階層的記憶體如何協同運作。
   
  8. **Roofline Model**：探討算術強度(Arithmetic Intensity)與效能的關係，並學習如何應用此模型分析程式效能瓶頸。

  &emsp;&emsp;這門課的評分方式如下：

  1. **小考(10%)**

     - **期中考前**：小考在第二、三節課進行，採分組形式。小組共同討論並完成該週的題目（約五題），以組別成績計算分數。
     - **期中考後**：第二節課為分組討論課，需完成兩至三題題目；第三節課則進行個人小考，題目與討論課內容相似。

  2. **作業(20%)**

     課程包含五次程式作業：
     - **前兩次**：以 RISC-V 程式設計為主，專注於基本指令的實作與練習。
     - **後三次**：以 Verilog 程式設計為主，分三個階段逐步實作出一個具備 branch predictor 和 pipeline 架構的完整 CPU。

  3. **期中考(35%)與期末考(35%)**

     兩次考試分別覆蓋前後半學期的內容，佔比最高。

  此外，本課程的等第線劃分方式可能與學校標準有所不同。 

- 心得：

  &emsp;&emsp;這門課的部分內容與我修過的**計算機概論**有所重疊。在計算機概論中，我們已經學習了一個非常簡單的 CPU 架構，而關於記憶體階層(Memory Hierarchy)的設計，部分概念也曾在**作業系統(OS)**課程中略有提及。因此，這門課對我而言，不僅是一次複習，更是在此基礎上深化了相關的知識與概念。

  &emsp;&emsp;雖然這門課的內容並非我的主要興趣所在，但它幫助我理解了早期學者如何設計電腦的過程，讓我對計算機結構的發展有了更全面的認識。


### 計算機網路(CN)

- 學分：3 學分
- 授課教師：周承復
- 學期成績：A+
- 上課內容：

  &emsp;&emsp;這門課主要帶領我們了解網路的運作原理，包括現代網路的分層架構，並由上而下深入學習應用層、傳輸層及網路層。具體內容如下：

  1. **應用層**
     - 介紹常見的協定如 HTTP、SMTP、DNS 等。
     - 在後續的網路層部分會進一步討論 DHCP 的相關應用。

  2. **傳輸層**
     - 探討 UDP 與 TCP 的運作方式，重點放在 TCP。
     - 初期學習如何設計可靠傳輸協定(Reliable Data Transfer Protocol)，並學會使用有限狀態機(Finite State Machine, FSM)描述協定設計。
     - 討論 Go-Back-N 和 Selective Repeat 等協定。
     - 最後解析 TCP 的可靠傳輸機制與壅塞控制策略。

  3. **網路層**
     - 了解 Router 的內部運作與封包轉發機制。
     - 深入學習 IP 協定及 NAT(Network Address Translation)。
     - 探討路由演算法(Routing Algorithm)的原理與實現。

  以下為這門課的評分方式
  1. **期中考(20%)與期末考(25%)**：題目多數來自課本習題與考古題。

  2. **作業(20%)**：共 4 次手寫作業，主要內容亦以課本習題為主。

  3. **期末專案(35%)**：使用 C++ 實作一個聊天室，學習並練習 socket programming 和部分系統程式設計的概念。

  4. **演講出席加分(5%)**：本學期安排兩場演講，參與者可獲得額外加分。

  此外，這門課的最終成績評定採用學校的等第標準。

- 心得：

  &emsp;&emsp;在 2024 年的寒假，為了準備修習**網路管理與系統管理(NASA)**這門課，我曾經觀看清華大學黃能富教授的**計算機網路概論**[課程](https://www.youtube.com/playlist?list=PLS0SUwlYe8cxktXNovos9xleroaWyb-z5)的前幾章節。因此，對於網路的分層式架構，我在當時就已經有了一些基礎的認識。不過，黃教授的課程採用了從下而上的直觀教學方式，而這學期的**計算機網路**則採用了從上而下的學習順序，讓我得以補齊以前較不熟悉的概念，例如 TCP 的壅塞控制是如何運作等。

  &emsp;&emsp;這門課不僅幫助我複習了過去在 OCW 或 NASA 中學過的知識，還讓我在一些實作技巧上獲益良多。尤其是這學期最重要的收穫之一，就是學會了如何撰寫 socket 程式。在這門課的學習過程中，我終於掌握了 socket programming 的基本概念及其如何應用，我相信這對於未來相關課程與實務應用都有幫助。


### 專題研究

- 學分：2 學分
- 授課教師：施吉昇
- 學期成績：A+
- 上課內容：

  &emsp;&emsp;這門課的內容因不同實驗室而異。我所參加的實驗室並沒有硬性規定必須完成特定任務，主要是參加每週的會議，觀察學長姐的研究方向並尋求協助的機會，或學習他們正在研究的內容。此外，也可以主動詢問學長姐有什麼值得閱讀或學習的資源。每週的小組會議上需要報告自己的進度。

  &emsp;&emsp;這學期，我主要學習了以下內容：  
  - 一個新的程式語言：Rust。
  - 瞭解 Zenoh（一個 NDN 的實作與產品）的一部分運作原理。

  在這學期中，我將把所學和所見整理成筆記，並在小組會議時進行簡要分享。

- 心得：

  &emsp;&emsp;這學期的前半段主要是在摸索階段。除了學習新的程式語言 Rust 和一些新的概念外，我對於如何理解 Zenoh 這個應用程式感到困惑，更不清楚該如何快速進入狀況。

  &emsp;&emsp;到了學期中後期，我開始投入更多心力，對於 Zenoh 部份的功能和運作有了稍微的了解。然而，我仍覺得自己學到的東西不多。大部分時間都花在閱讀程式碼上，缺乏實際練習和研究的機會，這讓我覺得有些可惜。


### 系統專題研究 &mdash; 物聯網中介軟體設計(IOT)

- 學分：3 學分
- 授課教師：施吉昇
- 學期成績：A+
- 上課內容：

  &emsp;&emsp;這門課的核心在於探討現代自駕車技術的實現方式，重點在於理解自駕車的構成元件及其功能之間的協作過程。例如：

  - **運動控制元件**：負責改變車輛的運動狀態。

  - **感知模組**：蒐集車輛狀態與環境資料，進行精確定位。

  - **行為規劃模組**：根據感知數據進行路徑規劃，並計算控制指令傳達給運動控制元件。

  &emsp;&emsp;課程主要聚焦於**感知**與**規劃**這兩大主題，同時也探討各模組之間的通訊與協作過程，特別是自駕車內部的通訊問題。整體內容分為以下幾個大主題：

  1. **通訊技術**：探討自駕車內部與外部的通訊機制，確保訊息傳輸的可靠性與即時性。

  2. **機率機器人學**：涉及機器人決策與推論的數學基礎，學習機率如何應用於自駕車的導航與環境理解。

  3. **定位與地圖建構**：使用 LiDAR（或其他 range finder）或影像數據進行精確定位，探討如何生成與更新周遭環境地圖，並學習 SLAM (Simultaneous Localization and Mapping) 等相關技術。

  4. **行為規劃**：包括路線規劃、移動規劃、以及軌跡規劃等不同層級的規劃任務。

  &emsp;&emsp;課程內容深入講解機器人學與定位技術，結合理論與實作，幫助學生對自駕車的實現原理有初步的理解。而這門課的評分方式為：

  1. **作業(40%)**：透過實機操作或軟體模擬，讓學生親自體驗自駕車技術的應用與實現方式。

  2. **期中考(30%)**：在第 10 週進行，涵蓋通訊技術與機率機器人學的相關內容。

  3. **期末報告(30%)**：完成一個影像定位模組的實作，並設計自己的方法，以超越 OpenCV 分割方法的效能。

  此外，由於期中考成績普遍不佳，老師最後全體調分 10 分。課程的最終成績依照學校的等第標準評定。

- 心得：

  &emsp;&emsp;這門課本來是我最期待的課程之一，特別是因為自駕車技術一直是我非常感興趣的領域。然而，不知道是因為上課的節奏較慢，還是前期花了較多時間在背景介紹，導致我後來上課時常常分心，做自己的事。但整體而言，這門課還是讓我學到不少關於自駕車的核心概念，尤其是感知、規劃與控制等方面，這些內容都非常有趣。  

  &emsp;&emsp;在修課的過程中，我們組還發生了一個令人印象深刻的小意外。在一次關於車輛控制的作業中，由於我們的正常程式設計無法運作，為了測試是否能讓車子運行，我們嘗試直接設置一個固定的 PWM 值，結果導致車輛暴衝並撞壞了 LiDAR。這次意外讓我感到非常愧疚，但同時也學到了很多重要的經驗。  

  &emsp;&emsp;首先，我深刻體會到開發與測試自駕車並不像課堂或作業看起來那麼簡單。測試階段應更加謹慎，尤其是在進行硬體測試之前，應多進行軟體模擬，並充分考慮各種可能的情境。此外，這次經驗也提醒我，面對技術挑戰時應該更具責任心，避免因一時的簡化而忽視潛在的風險。  

  &emsp;&emsp;雖然這次經歷帶來了一些遺憾，但也讓我對自駕車開發的現實與挑戰有了更深的理解。我認為這是一次非常寶貴的學習經驗，也激勵我在未來的學習與實作中更加細心與負責。  


### 平行程式設計(PP)

- 學分：3 學分
- 授課教師：李濬屹
- 學期成績：A+
- 上課內容：

  &emsp;&emsp;這門課程的主題涵蓋了平行程式設計的核心知識與實務操作，主要包括以下幾個部分：

  1. **平行化計算機結構**：涵蓋 Superscalar、multi-core、SIMD 等主題，能夠學習計算機結構的相關知識，幫助全面理解平行程式設計的基礎。

  2. **`pthread` 與 OpenMP**：適用於多核心(multi-core)的平行程式設計，特別是透過 OpenMP 的 `pragma` 實作，編譯器可以將程式轉換成平行版本。

  3. **MPI (Open MPI)**：適用於多節點(multi-node)的平行程式設計，藉由程式庫處理節點間的通訊問題，簡化程式開發。

  4. **GPU 程式設計（CUDA 與 HIP）**：提供練習 CUDA/HIP 的機會，能更深入理解 GPU 平行計算的概念與實作方法。

  5. **效能評估**：透過學習 Roofline 模型，了解算術強度與效能之間的關係，進行平行程式效能的分析與評估。

  而這門課的評分方式為：

  1. **Lab(10%)**：Lab 主要用於環境配置與基本練習，題目相對簡單，便於熟悉平行程式設計的基礎操作。

  2. **作業(40%)**：包含五次實作作業，需將程式平行化，並撰寫報告回答相關問題。
   
  3. **期中考(15%)與期末考(15%)**：考試範圍包含期中或期末前的所有課程內容，期中考於第 7 週，期末考於第 15 週進行。

  4. **期末專案(20%)**：實作一個與平行程式設計相關的專案，分數會根據組員人數進行調整。
   
  5. **NVIDIA Lab 加分(1%)**：NVIDIA 有提供兩個關於 CUDA C++ 與 Python 的線上課程，完成一個加 0.5 分學期成績。

  不清楚是否會依照學校的標準給等第。

- 心得：

  &emsp;&emsp;這門課對我而言是這學期最具挑戰性的課程，但同時也讓我學到不少實作相關的知識。其中，我認為最值得的部分是**GPU 程式設計**，特別是關於 GPU 層級式的程式設計模型（例如 thread、warp、block、以及 grid 等概念）。這些內容不僅加深了我對 GPU 運作原理的理解，也讓我對未來可能的應用有了更清晰的認識。

  &emsp;&emsp;然而，課程中有些主題與其他課程的內容有所重疊，例如：

  - **計算機結構**：課程中關於支援平行化程式的硬體結構設計（如 multi-core 和 SIMD）部分，在計算機結構課程中也曾花少部分時間提及。

  - **`pthread` 與 OpenMP**：這些內容在「系統程式設計(SP)」或「作業系統(OS)」課程中都有提到，學起來對我來說並不算陌生。

  - **Open MPI**：雖然這是我第一次接觸，但學習起來相對容易，並沒有太大的困難。

  &emsp;&emsp;對我來說，真正全新的部分就是 GPU programming，它不僅是這門課最有趣的部分，也是對未來最實用的技能之一。我很高興能在這門課程中接觸並學習到這項技術。


### 羽球初級

- 學分：1 學分
- 授課教師：李坤培
- 學期成績：A+
- 上課內容：

  &emsp;&emsp;這門課的內容主要包括學習以下幾項技巧：高遠球、發球、平抽球、網邊短球、挑球、切球、以及殺球等。而評分方式主要依據出席率、課堂態度、高遠球考試及發球考試等因素。不過，老師並未詳細說明給分細節。

- 心得：

  &emsp;&emsp;這門羽球課的上課經驗，可能是因為隊友們比較隨興，與桌球課中那種認真專注的氛圍有所不同。這樣的環境讓我對這門課的興趣沒有那麼高，打羽球時也多是為了應付考試，而不是出於對運動的熱愛。相較於桌球，我並沒有感覺到那麼多運動的樂趣，整體而言，這門課對我來說比較像是一項必須完成的任務，而不是一場愉快的運動體驗。
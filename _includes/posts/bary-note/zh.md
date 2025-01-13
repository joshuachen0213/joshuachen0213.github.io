### 重心座標簡介
--------------

&emsp;&emsp;這份[筆記](/docs/barycentric.pdf)介紹了一個簡單但功能強大的數學工具，常用於數學奧林匹亞競賽中 &mdash;&mdash; **重心座標(barycentric coordinates)**。重心座標是一種齊次座標，也就是說，$[a : b : c]$ 和 $[ka : kb : kc]$（只要 $k \neq 0$）表示的是相同的點。

&emsp;&emsp;重心座標是以一個參考三角形為基礎定義的。假設 $\triangle ABC$ 是一個固定的三角形，則對於任意一點 $P$，其重心座標定義為 \\[ P = \left[\frac{[\triangle PBC]}{[\triangle ABC]}, \frac{[\triangle PCA]}{[\triangle BCA]}, \frac{[\triangle PAB]}{[\triangle CAB]}\right], \\] 其中，$[\triangle XYZ]$ 表示 $\triangle XYZ$ 的有向面積。

&emsp;&emsp;利用重心座標，可以推導出許多幾何性質簡潔的方程式，例如直線的方程式、垂直條件的判斷、圓的方程式等。完整的內容詳見附上的 PDF 文件，但此份筆記以中文撰寫。

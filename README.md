# 採用課題

## 課題 1 (コーディング)

ソースコードの格納先は下記の通りです。

### 課題の対象となるコード

* /src/Song.js
* /src/ShuffleEngine.js

### テストコード

* /src/Song.test.js
* /src/ShuffleEngine.test.js

## 課題 2 (シャッフルの工夫)

#### 1. シャッフルした結果が最初に渡された曲順と同一だったらやり直す

根拠: 例えばアルバムに収録された楽曲のリストだった場合、そのままの順序で再生されるとシャッフルされた印象が全くないため

#### 2. 1巡目の1曲目が、セットした曲の1番目の曲だったらやり直す
根拠: 1と同様に、アルバムに収録された楽曲のリストだった場合、最初に1番目の曲が流れると、次の曲が始まるまでシャッフルされた印象が持てず、シャッフルし直そうかと思わせてしまう可能性があるため

#### 3. n巡目の最後の曲とn+1巡目の曲が同一だったらやり直す

根拠: リスナが同じ曲を連続で聴くことになってしまうため

#### 4. セットされた曲数が2曲の場合は、そのどちらかの曲を最初にして交互に再生し、セットされた曲数が1曲の場合はリピート再生する

根拠: セットされた曲が2曲以下の場合はシャッフルするのに十分な曲数ではないが、エラーを返すのではなく曲を再生することがリスナにとって最優先事項であると推測したため


## 課題 3 (説明資料)

本ページの右上のリンクよりご参照いただけます。

* /docs/Song.html
* /docs/ShuffleEngine.html